import { useState } from 'react'
import './App.css'

function App() {
  const [selected, setSelected] = useState(null);

  // static for now, will retrieve from api later. 
  const videos = [
    { id: "demo", title: "Demo Tutorial By John Coding", topic: "Binary Trees" },
    { id: "demo2", title: "Intro to OOP", topic: "Classes & Objects" },
  ];

  return (
    <>
      <h1>Select a Video from the list to begin...</h1>

      <ul>
        {videos.map(v => (
          <li key={v.id} style={{ marginBottom: 8 }}>
            <button onClick={() => setSelected(v)}>
              {v.title} — <em>{v.topic}</em>
            </button>
          </li>
        ))}
      </ul>
      {selected && (<section style={{ marginTop: 16 }}>
        <h2>Selected</h2>
        <p>
          <strong>{selected.title}</strong><br />
          Topic: {selected.topic}<br />
          ID: {selected.id}
        </p>
      </section>
      )}




    </>
  )
}

export default App
