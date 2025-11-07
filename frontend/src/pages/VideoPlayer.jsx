import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

const API = "http://127.0.0.1:8000";


export default function VideoPlayer() {
    //get id from router path
    const { id } = useParams();

    // variable to set video metadata we get from api
    const [meta, setMeta] = useState(null)

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

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
            <h1>Video: {id}</h1>

            <ul>
                <li><strong>FPS:</strong> {meta.fps}</li>
                <li><strong>Frame count:</strong> {meta.frame_count}</li>
                <li><strong>Duration (s):</strong> {meta.duration_seconds.toFixed(2)}</li>
            </ul>

            {meta._links && (
                <>
                    <h3>Links</h3>
                    <pre style={{ background: "#f7f7f7", padding: 12, borderRadius: 8 }}>
                        {JSON.stringify(meta._links, null, 2)}
                    </pre>
                </>
            )}
        </div>
    );
}
