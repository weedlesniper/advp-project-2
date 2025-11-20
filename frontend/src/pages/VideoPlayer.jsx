import { useEffect, useState, useRef, useCallback } from "react";
import { useParams, Link } from "react-router-dom";
import useShortcuts from "../hooks/useShortcuts";


const API = "http://127.0.0.1:8000";

const STORAGE_KEY = "ocr_shortcuts_v1";

const DEFAULT_SHORTCUTS = {
    playPause: "space",
    pauseOcr: "ctrl+o",
    scrubForward: "shift+right",
    scrubBackward: "shift+left",
    toggleList: "ctrl+h",
    copyToClipboard: "ctrl + shift + c",
};

function loadShortcuts() {
    try {
        const saved = localStorage.getItem(STORAGE_KEY);
        return saved
            ? { ...DEFAULT_SHORTCUTS, ...JSON.parse(saved) }
            : DEFAULT_SHORTCUTS;
    } catch {
        return DEFAULT_SHORTCUTS;
    }
}

export default function VideoPlayer() {
    const { id } = useParams();
    const url = `${API}/video/${encodeURIComponent(id)}/file`;

    const [meta, setMeta] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const videoRef = useRef(null);
    const [pausedAtTime, setPausedAtTime] = useState(0);

    const [ocrResult, setOCRResult] = useState("");
    const [ocrError, setOcrError] = useState("");
    const [ocrLoading, setOcrLoading] = useState(false);
    const [copyLabel, setCopyLabel] = useState("Copy OCR to clipboard");

    //actual shortcut values
    const [shortcuts] = useState(loadShortcuts);
    //show state of shortcut component
    const [showShortcuts, setShowShortcuts] = useState(true);

    const toggleShortcuts = useCallback(() => {
        setShowShortcuts(prev => !prev);
    }, []);

    const togglePause = useCallback(() => {
        const video = videoRef.current;
        if (!video) return;
        if (video.paused || video.ended) {
            video.play();
        } else {
            video.pause();
        }
    }, []);

    const handleCopyOcr = useCallback(async () => {
        if (!ocrResult) return;

        const pausedDisplay = pausedAtTime != null
            ? `  ${Math.round(pausedAtTime)}s`
            : "";

        if (navigator.clipboard && navigator.clipboard.writeText) {
            try {
                await navigator.clipboard.writeText(ocrResult);
                setCopyLabel(`Text copied from ${pausedDisplay}`);
            } catch (err) {
                setOcrError("Failed to copy OCR text to clipboard.");
            }
            return;
        }


    }, [ocrResult, pausedAtTime]);

    const handlePause = useCallback(() => {
        const t = videoRef.current?.currentTime ?? 0;
        setPausedAtTime(t);
        console.log("Video paused at:", t, "seconds");
    }, []);

    const runOcrAt = useCallback(async (videoId, t) => {
        setOcrError("");
        setOCRResult("");

        if (!videoId || t < 0) {
            setOcrError("Pause the video first to capture a timestamp.");
            return;
        }
        setOcrLoading(true);
        try {
            const response = await fetch(
                `${API}/video/${encodeURIComponent(videoId)}/frame/${Math.floor(t)}/ocr`,
                { headers: { accept: "application/json" } }
            );
            if (!response.ok) throw new Error(`HTTP ${response.status}`);
            const data = await response.json();
            setOCRResult(data.text ?? JSON.stringify(data));
        } catch (e) {
            setOcrError("OCR request failed.");
        } finally {
            setOcrLoading(false);
        }
    }, []);

    // this could potentially be reworked, thinking of the user actually interacting with the 
    // app, they would likely prefer to pause, think on something then ocr, rather than 
    // pause and ocr in one motion. 
    const handlePauseAndOCR = useCallback(async () => {
        const video = videoRef.current;
        if (!video) return;

        video.pause(); // ensure paused
        const t = video.currentTime ?? 0;
        setPausedAtTime(t);

        await runOcrAt(id, t);
    }, [id, runOcrAt]);

    const seekBy = useCallback((deltaSeconds) => {
        const video = videoRef.current;
        if (!video) return;

        const current = video.currentTime ?? 0;
        const duration = Number.isFinite(video.duration) ? video.duration : current;

        //check to see we don't go before start / past end 
        const next = Math.min(Math.max(current + deltaSeconds, 0), duration);

        video.currentTime = next;

        // If the video is currently paused, keep the pausedat display in sync
        if (video.paused) {
            setPausedAtTime(next);
        }
    }, []);

    const scrubBackward = useCallback(() => {
        seekBy(-5); // back 5 seconds
    }, [seekBy]);

    const scrubForward = useCallback(() => {
        seekBy(5); // forward 5 seconds
    }, [seekBy]);

    // Ctrl+O hotkey
    useShortcuts(shortcuts.pauseOcr, handlePauseAndOCR, [handlePauseAndOCR]);
    useShortcuts(shortcuts.playPause, togglePause, [togglePause]);
    useShortcuts(shortcuts.scrubBackward, scrubBackward, [scrubBackward]);
    useShortcuts(shortcuts.scrubForward, scrubForward, [scrubForward]);
    useShortcuts(shortcuts.toggleList, toggleShortcuts, [toggleShortcuts]);
    useShortcuts(shortcuts.copyToClipboard, handleCopyOcr, [handleCopyOcr]);

    useEffect(() => {
        let alive = true;
        setLoading(true);
        setError("");
        fetch(`${API}/video/${encodeURIComponent(id)}`)
            .then((r) => {
                if (!r.ok) throw new Error(`HTTP ${r.status}`);
                return r.json();
            })
            .then((data) => {
                if (alive) setMeta(data);
            })
            .catch(() => {
                if (alive) setError("Could not load video metadata.");
            })
            .finally(() => {
                if (alive) setLoading(false);
            });
        return () => {
            alive = false;
        };
    }, [id]);

    if (loading) return <p>Loading…</p>;
    if (error) return <p style={{ color: "red" }}>{error}</p>;
    if (!meta) return null;

    return (
        <div>
            <h1 className="page-heading">Video Title: {id}</h1>
            <div className="main-container">
                <div>
                    <div className="player-video">
                        <video
                            ref={videoRef}
                            src={url}
                            controls
                            onPause={handlePause} // still updates the paused at line regardless of which was video was paused
                        />
                    </div>
                    <div
                        className="shortcut-panel"
                        role="region"
                        aria-labelledby="shortcut-heading"
                    >
                        <div className="shortcut-panel-header">
                            <button
                                type="button"
                                className="shortcut-toggle"
                                onClick={() => setShowShortcuts(prev => !prev)}
                                aria-expanded={showShortcuts}
                                aria-controls="shortcut-list"
                            >
                                {showShortcuts ? "Hide shortcuts " : "Show shortcuts "}
                                {(shortcuts.toggleList).toUpperCase()}
                            </button>
                        </div>

                        {showShortcuts && (
                            <ul id="shortcut-list" className="shortcut-list">
                                <li>
                                    <kbd>{(shortcuts.playPause).toUpperCase()}</kbd> Play / pause
                                </li>
                                <li>
                                    <kbd>{(shortcuts.pauseOcr).toUpperCase()}</kbd> Pause + OCR
                                </li>
                                <li>
                                    <kbd>{(shortcuts.scrubBackward).toUpperCase()}</kbd> Scrub Backwards 5s
                                </li>
                                <li>
                                    <kbd>{(shortcuts.scrubForward).toUpperCase()}</kbd> Scrub Forwards 5s
                                </li>
                                <li>
                                    <kbd>{(shortcuts.copyToClipboard).toUpperCase()}</kbd> Copy OCR Result to Clipboard
                                </li>
                            </ul>
                        )}
                    </div>

                </div>
                <div className="player-text">
                    <h2>OCR Results</h2>

                    {pausedAtTime != null && <p>Paused at {Math.round(pausedAtTime)}s</p>}

                    <div>
                        <button className="primary-button" onClick={handlePauseAndOCR} disabled={ocrLoading}>
                            {ocrLoading ? "Running OCR…" : "Pause + OCR"}
                        </button>
                        {/* https://developer.mozilla.org/en-US/docs/Web/API/Clipboard_API */}
                        <button
                            className="primary-button"
                            onClick={handleCopyOcr}
                            disabled={!ocrResult}
                        >
                            {copyLabel}
                        </button>
                    </div>


                    {ocrError && <p style={{ color: "red" }}>{ocrError}</p>}
                    {ocrResult && <pre>{ocrResult}</pre>}
                </div>
            </div>
        </div>
    );
}
