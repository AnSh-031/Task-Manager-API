import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Signup() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");
  const navigate = useNavigate();

  async function handleSignup() {
    try {
      await axios.post("http://localhost:3000/api/v1/auth/signup", {
        username,
        password,
        role
      });
      alert("Signed up successfully!");
      navigate("/login");
    } catch(err) {
      alert(err.response?.data?.error || "Something went wrong");
    }
  }

  return (
    <div>
      <h2>Signup</h2>
      <input placeholder="Username" onChange={e => setUsername(e.target.value)} />
      <br />
      <input placeholder="Password" type="password" onChange={e => setPassword(e.target.value)} />
      <br />
      <select onChange={e => setRole(e.target.value)}>
        <option value="user">User</option>
        <option value="admin">Admin</option>
      </select>
      <br />
      <button onClick={handleSignup}>Signup</button>
      <p>Already have an account? <a href="/login">Login</a></p>
    </div>
  );
}

export default Signup;