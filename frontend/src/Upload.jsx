import { useState } from "react";
import "./index.css";

export default function Upload() {
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState("");
  const [analysis, setAnalysis] = useState(null);
  const [preview, setPreview] = useState(null); // <-- new state for image preview

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

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    if (selectedFile) {
      setPreview(URL.createObjectURL(selectedFile)); // <-- create preview URL
    } else {
      setPreview(null);
    }
  };

  return (
    <div className="upload-container">
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
      />

      {/* Show preview */}
      {preview && (
        <div style={{ margin: "1rem 0" }}>
          <img
            src={preview}
            alt="Preview"
            style={{ maxWidth: "100%", borderRadius: "10px" }}
          />
        </div>
      )}

      <button onClick={handleAnalyze}>Analyze</button>
      <p className="status-text">{status}</p>

      {analysis && (
        <div className="analysis-result">
          <h2>{analysis.season}</h2>
          <p className="status-text">
            Confidence: {(analysis.confidence * 100).toFixed(0)}%
          </p>
          <p>
            Skin: <code>{analysis.base_skin_hex}</code> | Hair: <code>{analysis.hair_hex}</code> | Eyes: <code>{analysis.eye_hex}</code>
          </p>

          <div className="palette-row">
            {analysis.palette.map((c) => (
              <div key={c.hex} className="swatch">
                <div className="swatch-color" style={{ background: c.hex }}></div>
                <div className="swatch-info">
                  <div>{c.name}</div>
                  <div style={{ fontFamily: "monospace" }}>{c.hex}</div>
                </div>
              </div>
            ))}
          </div>

          {analysis.notes && analysis.notes.length > 0 && (
            <ul>
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
