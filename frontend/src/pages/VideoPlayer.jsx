import { useEffect, useState } from "react";
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
            <div>
                <video src={`${API}/video/${id}/file`} controls width="800" />
            </div>
        </div>
    );
}
