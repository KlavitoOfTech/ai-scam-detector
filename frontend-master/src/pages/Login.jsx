import { useState } from "react";

function Login() {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

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

        localStorage.setItem(
          "token",
          data.token
        );

        alert("Login successful");

        window.location.href =
          "/dashboard";

      } else {

        alert(data.message);

      }

    } catch (error) {

      console.error(error);

      alert("Login failed");

    }

  };

  return (

    <div className="container">

      <div className="card">

        <h1>🛡 TrustScan</h1>

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) =>
            setUsername(e.target.value)
          }
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
        />

        <button onClick={handleLogin}>
          Login
        </button>

        <p>
          Don't have an account?{" "}

          <span
            className="toggle"
            onClick={() =>
              window.location.href =
              "/signup"
            }
          >
            Signup
          </span>

        </p>

      </div>

    </div>

  );

}

export default Login;