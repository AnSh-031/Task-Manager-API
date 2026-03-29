import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function handleLogin() {
    try {
      const res = await axios.post("http://localhost:3000/api/v1/auth/signin", {
        username,
        password
      });
      localStorage.setItem("token", res.data.token);
      alert("Logged in successfully!");
      window.location.href = "/dashboard";
    } catch(err) {
      alert(err.response?.data?.error || "Something went wrong");
    }
  }

  return (
    <div>
      <h2>Login</h2>
      <input placeholder="Username" onChange={e => setUsername(e.target.value)} />
      <br />
      <input placeholder="Password" type="password" onChange={e => setPassword(e.target.value)} />
      <br />
      <button onClick={handleLogin}>Login</button>
      <p>Don't have an account? <a href="/signup">Signup</a></p>
    </div>
  );
}

export default Login;