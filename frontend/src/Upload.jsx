import { useState } from "react";
import "./index.css";
import CelebMatches from "./CelebMatches";

export default function Upload() {
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState("");
  const [analysis, setAnalysis] = useState(null);
  const [preview, setPreview] = useState(null);

  // Map AI season outputs to SEASON_DATA keys
  const SEASON_MAP = {
    "Bright Spring": "Bright Spring",
    "True Spring": "True Spring",
    "Light Spring": "Light Spring",
    "Soft Summer": "Soft Summer",
    "True Summer": "True Summer",
    "Light Summer": "Light Summer",
    "Deep Autumn": "Deep Autumn",
    "True Autumn": "True Autumn",
    "Soft Autumn": "Soft Autumn",
    "Bright Winter": "Bright Winter",
    "True Winter": "True Winter",
    "Dark Winter": "Dark Winter",
    // Optional: fallback if AI returns short seasons like "Spring"
    "Spring": "Bright Spring",
    "Summer": "Soft Summer",
    "Autumn": "Deep Autumn",
    "Winter": "True Winter"
  };

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

      // Map AI season to our SEASON_DATA keys
      const mappedSeason = SEASON_MAP[data.analysis.season] || data.analysis.season;

      setAnalysis({
        ...data.analysis,
        season: mappedSeason
      });

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
      setPreview(URL.createObjectURL(selectedFile));
    } else {
      setPreview(null);
    }
  };

  return (
    <div className="upload-container">
      <input type="file" accept="image/*" onChange={handleFileChange} />

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

      {analysis && (
        <CelebMatches
          season={analysis.season}              // mapped season
          characteristic={analysis.characteristic}
        />
      )}
    </div>
  );
}
