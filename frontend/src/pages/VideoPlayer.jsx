import { useEffect, useState, useRef, useCallback } from "react";
import { useParams, Link } from "react-router-dom";
import useShortcuts from "../hooks/useShortcuts";


const API = "http://127.0.0.1:8000";

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

    const togglePause = useCallback(() => {
        const video = videoRef.current;
        if (!video) return;
        if (video.paused || video.ended) {
            video.play();
        } else {
            video.pause();
        }
    }, []);

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

    // Ctrl+O hotkey
    useShortcuts("ctrl+o", handlePauseAndOCR);
    useShortcuts("space", togglePause, []);

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
                <div className="player-video">
                    <video
                        ref={videoRef}
                        src={url}
                        controls
                        onPause={handlePause} // still updates the "Paused at" line when user clicks pause
                    />
                </div>
                <div className="player-text">
                    <h2>OCR Results</h2>

                    {pausedAtTime != null && <p>Paused at {Math.floor(pausedAtTime)}s</p>}

                    <button onClick={handlePauseAndOCR} disabled={ocrLoading}>
                        {ocrLoading ? "Running OCR…" : "Pause + OCR (Ctrl+O)"}
                    </button>

                    {ocrError && <p style={{ color: "red" }}>{ocrError}</p>}
                    {ocrResult && <pre>{ocrResult}</pre>}
                </div>
            </div>
        </div>
    );
}
