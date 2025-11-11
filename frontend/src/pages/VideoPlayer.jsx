import { useEffect, useState, useRef } from "react";
import { useParams, Link } from "react-router-dom";

const API = "http://127.0.0.1:8000";


export default function VideoPlayer() {
    //get id from router path
    const { id } = useParams();
    const url = `${API}/video/${encodeURIComponent(id)}/file`;

    // variable to set video metadata we get from api
    const [meta, setMeta] = useState(null)

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const videoRef = useRef(null);
    const [pausedAtTime, setPausedAtTime] = useState(0);

    //ocr result loading variables
    const [ocrResult, setOCRResult] = useState("");
    const [ocrError, setOcrError] = useState("");
    const [ocrLoading, setOcrLoading] = useState(false);


    const handlePause = () => {
        const t = videoRef.current?.currentTime ?? 0;
        setPausedAtTime(t);
        console.log('Video paused at:', t, 'seconds');
    };

    const handleRequestOCR = async () => {
        setOcrError("");
        setOCRResult("");
        const t = Math.floor(videoRef.current?.currentTime ?? pausedAtTime ?? 0);
        if (!id || t < 0) {
            setOcrError("Pause the video first to capture a timestamp.");
            return;
        }
        setOcrLoading(true);
        try {
            const res = await fetch(
                `${API}/video/${encodeURIComponent(id)}/frame/${t}/ocr`,
                { headers: { accept: "application/json" } }
            );
            if (!res.ok) throw new Error(`HTTP ${res.status}`);
            const data = await res.json();
            setOCRResult(data.text ?? JSON.stringify(data));
        } catch (e) {
            setOcrError("OCR request failed.");
        } finally {
            setOcrLoading(false);
        }
    };

    useEffect(() => {
        let alive = true;
        setLoading(true);
        setError("");

        fetch(`${API}/video/${encodeURIComponent(id)}`)
            .then(response => {
                if (!response.ok) throw new Error(`HTTP ${response.status}`);
                return response.json();
            })
            .then(data => { if (alive) setMeta(data); })
            .catch(() => { if (alive) setError("Could not load video metadata."); })
            .finally(() => { if (alive) setLoading(false); });
        return () => { alive = false };

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
                        src={`${API}/video/${id}/file`}
                        controls
                        onPause={handlePause}
                    />
                </div>
                <div className="player-text">
                    <h2>OCR Results</h2>

                    {pausedAtTime != null && <p>Paused at {Math.floor(pausedAtTime)}s</p>}

                    <button onClick={handleRequestOCR} disabled={ocrLoading || pausedAtTime == null}>
                        {ocrLoading ? "Running OCR…" : "Run OCR at paused time"}
                    </button>

                    {ocrError && <p style={{ color: "red" }}>{ocrError}</p>}
                    {ocrResult && <pre>{ocrResult}</pre>}

                </div>
            </div>


        </div>
    );
}

