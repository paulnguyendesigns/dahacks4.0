import Upload from "./Upload.jsx";
import Header from "./Header.jsx";
import "/Users/paulnguyen/Desktop/dahacks4.0/frontend/src/index.css";

function App() {
  return (
    <div style={{ textAlign: "center", minHeight: "100vh" }}>
      <Header />
      <h1 className="main-title">Season Color Finder</h1>
      <Upload />
    </div>
  );
}

export default App;
