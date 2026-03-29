import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();

  function getHeaders() {
    const token = localStorage.getItem("token");
    console.log("sending token:", token);
    return { Authorization: `Bearer ${token}` };
  }

  async function getTasks() {
    try {
      const res = await axios.get("http://localhost:3000/api/v1/tasks", { headers: getHeaders() });
      setTasks(res.data.Tasks);
    } catch(err) {
      console.log(err.response);
      alert(err.response?.data?.error || "Something went wrong");
    }
  }

  async function createTask() {
    try {
      await axios.post("http://localhost:3000/api/v1/tasks", { title, description }, { headers: getHeaders() });
      alert("Task created!");
      getTasks();
    } catch(err) {
      console.log(err.response);
      alert(err.response?.data?.error || "Something went wrong");
    }
  }

  async function deleteTask(id) {
    try {
      await axios.delete(`http://localhost:3000/api/v1/tasks/${id}`, { headers: getHeaders() });
      alert("Task deleted!");
      getTasks();
    } catch(err) {
      console.log(err.response);
      alert(err.response?.data?.message || "Something went wrong");
    }
  }

  async function updateTask(id) {
    const newTitle = prompt("Enter new title:");
    const newStatus = prompt("Enter status (pending/completed):");
    try {
      await axios.put(`http://localhost:3000/api/v1/tasks/${id}`,
        { title: newTitle, status: newStatus },
        { headers: getHeaders() }
      );
      alert("Task updated!");
      getTasks();
    } catch(err) {
      console.log(err.response);
      alert(err.response?.data?.message || "Something went wrong");
    }
  }

  function handleLogout() {
    localStorage.removeItem("token");
    navigate("/login");
  }

  useEffect(() => {
    getTasks();
  }, []);

  return (
    <div>
      <h2>Dashboard</h2>
      <button onClick={handleLogout}>Logout</button>

      <h3>Create Task</h3>
      <input placeholder="Title" onChange={e => setTitle(e.target.value)} />
      <br />
      <input placeholder="Description" onChange={e => setDescription(e.target.value)} />
      <br />
      <button onClick={createTask}>Add Task</button>

      <h3>Your Tasks</h3>
      {tasks.length === 0 && <p>No tasks yet</p>}
      {tasks.map(task => (
        <div key={task._id}>
          <p>Title: {task.title}</p>
          <p>Description: {task.description}</p>
          <p>Status: {task.status}</p>
          <button onClick={() => updateTask(task._id)}>Update</button>
          <button onClick={() => deleteTask(task._id)}>Delete</button>
          <hr />
        </div>
      ))}
    </div>
  );
}

export default Dashboard;