import { useState } from "react";

export default function Upload() {
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState("");
  const [analysis, setAnalysis] = useState(null);

  const handleAnalyze = async () => {
    if (!file) {
      setStatus("Please choose a photo first.");
      return;
    }

    setStatus("Uploading and analyzing...");
    setAnalysis(null);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("http://localhost:3001/analyze", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || `Server error (${res.status})`);
      }

      const data = await res.json();
      setAnalysis(data.analysis);
      setStatus("");
    } catch (err) {
      console.error(err);
      setStatus("Error: " + err.message);
    }
  };

  return (
    <div style={{ maxWidth: 600, margin: "2rem auto", background: "#020617", border: "1px solid #1f2937", borderRadius: 16, padding: 16 }}>
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setFile(e.target.files[0])}
        style={{ marginBottom: "1rem" }}
      />
      <br />
      <button onClick={handleAnalyze}>Analyze</button>
      <p style={{ fontSize: 12, color: "#9ca3af" }}>{status}</p>

      {analysis && (
        <div style={{ marginTop: "16px" }}>
          <h2>{analysis.season}</h2>
          <p style={{ fontSize: 12, color: "#9ca3af" }}>
            Confidence: {(analysis.confidence * 100).toFixed(0)}%
          </p>
          <p style={{ fontSize: 12 }}>
            Skin: <code>{analysis.base_skin_hex}</code> | Hair: <code>{analysis.hair_hex}</code> | Eyes: <code>{analysis.eye_hex}</code>
          </p>

          <div style={{ display: "flex", flexWrap: "wrap" }}>
            {analysis.palette.map((c) => (
              <div key={c.hex} style={{ border: "1px solid #1f2937", borderRadius: 10, width: 90, margin: 4, fontSize: 11 }}>
                <div style={{ height: 30, background: c.hex }}></div>
                <div style={{ padding: 4 }}>
                  <div>{c.name}</div>
                  <div style={{ fontFamily: "monospace" }}>{c.hex}</div>
                </div>
              </div>
            ))}
          </div>

          {analysis.notes && analysis.notes.length > 0 && (
            <ul style={{ fontSize: 12 }}>
              {analysis.notes.map((n, i) => (
                <li key={i}>{n}</li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
