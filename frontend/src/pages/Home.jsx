import { useEffect, useState } from "react";
import "../App.css";


export default function Home() {
    const [selected, setSelected] = useState(null);
    const [videos, setVideos] = useState([]);
    const [error, setError] = useState("");

    useEffect(() => {
        fetch("http://127.0.0.1:8000/video")
            .then((r) => r.json())
            .then((data) => setVideos(data.videos ?? []))
            .catch(() => setError("Could not load videos."));
    }, []);

    return (
        <div>
            <h1>Select a video from the list to begin...</h1>

            <ul style={{ padding: 0 }}>
                {videos.map((v) => (
                    <li key={v.id} style={{ marginBottom: 8, listStyle: "none" }}>
                        <button className="list-item" onClick={() => setSelected(v)}>
                            {v.id}
                        </button>
                    </li>
                ))}
            </ul>

            {/* not for prod, just for testing */}
            {selected && (
                <section style={{ marginTop: 16 }}>
                    <h2>Selected</h2>
                    <p>
                        <strong>{selected.title}</strong>
                        <br />
                        Video Selected: {selected.topic}
                        <br />
                        ID: {selected.id}
                    </p>
                </section>
            )}

            {error && <p style={{ color: "red" }}>{error}</p>}
        </div>
    );
}
