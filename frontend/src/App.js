import React, { useState } from "react";
import axios from "axios";

function App() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const search = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/search?q=${query}`);
      setResults(res.data);
    } catch (err) {
      console.error(err);
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
            }}
          >
            <h2 style={{ color: "#1a0dab" }}>{item.title}</h2>
            <p>
              <b>Language:</b> {item.language}
            </p>
            <pre style={{ background: "#f6f8fa", padding: "10px" }}>
              {item.code}
            </pre>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
