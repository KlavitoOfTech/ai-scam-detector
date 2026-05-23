import { useState } from "react";
import "./App.css";

function App() {

  const [message, setMessage] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [remainingTrials, setRemainingTrials] = useState(3);

  const analyzeMessage = async () => {

    if (!message) {
      alert("Please enter a message");
      return;
    }

    try {

      setLoading(true);
      setResult("");

      const response = await fetch("http://127.0.0.1:5000/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message }),
      });

      const data = await response.json();

      if (response.status === 403) {
        alert(data.message);
        return;
      }

      setResult(data.result);

    } catch (error) {

      console.error(error);
      alert("Server error");

    } finally {

      setLoading(false);

    }
  };

  return (
    <div className="container">

      <div className="card">

        <h1>🛡 Spam Detector AI</h1>

        <p className="subtitle">
          Detect suspicious spam and scam messages instantly.
        </p>

        <textarea
          placeholder="Paste suspicious message here..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />

        <button onClick={analyzeMessage} disabled={loading}>
          {loading ? "Scanning..." : "Analyze"}
        </button>

        {result && (
          <div className="result">

            {result === "spam" ? (
              <h2 className="spam">🚨 Spam Detected</h2>
            ) : (
              <h2 className="safe">✅ Safe Message</h2>
            )}

            <p>Free scans left: {remainingTrials}</p>

          </div>
        )}

      </div>

    </div>
  );
}

export default App;