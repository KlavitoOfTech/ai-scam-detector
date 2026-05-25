import { useState } from "react";
import "./App.css";

function App() {

  const [isLogin, setIsLogin] = useState(true);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [message, setMessage] = useState("");
  const [result, setResult] = useState("");

  const [loading, setLoading] = useState(false);

  const [token, setToken] = useState(
    localStorage.getItem("token") || ""
  );

  // SIGNUP
  const handleSignup = async () => {

    try {

      const response = await fetch(
        "http://127.0.0.1:5000/signup",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username,
            password,
          }),
        }
      );

      const data = await response.json();

      alert(data.message);

    } catch (error) {

      console.error(error);
      alert("Signup failed");

    }
  };

  // LOGIN
  const handleLogin = async () => {

    try {

      const response = await fetch(
        "http://127.0.0.1:5000/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username,
            password,
          }),
        }
      );

      const data = await response.json();

      if (data.token) {

        localStorage.setItem("token", data.token);

        setToken(data.token);

        alert("Login successful");

      } else {

        alert(data.message);

      }

    } catch (error) {

      console.error(error);
      alert("Login failed");

    }
  };

  // ANALYZE MESSAGE
  const analyzeMessage = async () => {

    if (!message) {
      alert("Enter a message");
      return;
    }

    try {

      setLoading(true);

      const response = await fetch(
        "http://127.0.0.1:5000/predict",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            message,
          }),
        }
      );

      const data = await response.json();

      if (response.status === 403) {

        alert(data.message);
        return;

      }

      setResult(data.result);

    } catch (error) {

      console.error(error);
      alert("Prediction failed");

    } finally {

      setLoading(false);

    }
  };

  // LOGOUT
  const logout = () => {

    localStorage.removeItem("token");

    setToken("");

    setResult("");

  };

  return (
    <div className="container">

      <div className="card">

        <h1>🛡 TrustScan</h1>

        {!token ? (

          <>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            {isLogin ? (

              <>
                <button onClick={handleLogin}>
                  Login
                </button>

                <p>
                  Don't have an account?{" "}
                  <span
                    className="toggle"
                    onClick={() => setIsLogin(false)}
                  >
                    Signup
                  </span>
                </p>
              </>

            ) : (

              <>
                <button onClick={handleSignup}>
                  Signup
                </button>

                <p>
                  Already have an account?{" "}
                  <span
                    className="toggle"
                    onClick={() => setIsLogin(true)}
                  >
                    Login
                  </span>
                </p>
              </>

            )}

          </>

        ) : (

          <>
            <textarea
              placeholder="Paste suspicious message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />

            <button
              onClick={analyzeMessage}
              disabled={loading}
            >
              {loading ? "Scanning..." : "Analyze"}
            </button>

            {result && (
              <div className="result">

                {result === "spam" ? (
                  <h2 className="spam">
                    🚨 Spam Detected
                  </h2>
                ) : (
                  <h2 className="safe">
                    ✅ Safe Message
                  </h2>
                )}

              </div>
            )}

            <button
              className="logout"
              onClick={logout}
            >
              Logout
            </button>
          </>

        )}

      </div>

    </div>
  );
}

export default App;