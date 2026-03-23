import React, { useState } from "react";
import axios from "axios";

function App() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const search = async () => {
    if (!query.trim()) return;

    try {
      setLoading(true);
      const res = await axios.get(
        `https://intelligent-code-search-engine.onrender.com/search?q=${query}`,
      );
      setResults(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{ fontFamily: "Arial", textAlign: "center", marginTop: "100px" }}
    >
      <h1 style={{ fontSize: "40px" }}>🔍 Code Search Engine</h1>

      {/* Search Box */}
      <div style={{ marginTop: "30px" }}>
        <input
          type="text"
          placeholder="Search code..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && search()}
          style={{
            width: "400px",
            padding: "12px",
            borderRadius: "20px",
            border: "1px solid #ccc",
            outline: "none",
          }}
        />

        <button
          onClick={search}
          style={{
            marginLeft: "10px",
            padding: "12px 20px",
            borderRadius: "20px",
            border: "none",
            background: "#4285F4",
            color: "white",
            cursor: "pointer",
          }}
        >
          Search
        </button>
      </div>

      {/* Loading */}
      {loading && <p style={{ marginTop: "20px" }}>Loading...</p>}

      {/* No Results */}
      {!loading && results.length === 0 && query && (
        <p style={{ marginTop: "20px", color: "gray" }}>No results found</p>
      )}

      {/* Results */}
      <div
        style={{
          marginTop: "40px",
          textAlign: "left",
          width: "60%",
          margin: "40px auto",
        }}
      >
        {results.map((item, index) => (
          <div
            key={index}
            style={{
              padding: "15px",
              marginBottom: "20px",
              borderRadius: "10px",
              boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
              position: "relative",
            }}
          >
            <h2 style={{ color: "#1a0dab" }}>{item.title}</h2>

            <p>
              <b>Language:</b> {item.language}
            </p>

            {/* Copy Button */}
            <button
              onClick={() => {
                navigator.clipboard.writeText(item.code);
                alert("Code copied!");
              }}
              style={{
                position: "absolute",
                right: "15px",
                top: "15px",
                padding: "5px 10px",
                cursor: "pointer",
                borderRadius: "5px",
                border: "none",
                background: "#28a745",
                color: "white",
              }}
            >
              Copy
            </button>

            <pre
              style={{
                background: "#f6f8fa",
                padding: "10px",
                overflowX: "auto",
              }}
            >
              {item.code}
            </pre>
          </div>
        ))}
      </div>

      {/* Footer */}
      <p style={{ marginTop: "50px", color: "gray" }}>Built by Vipul 🚀</p>
    </div>
  );
}

export default App;
