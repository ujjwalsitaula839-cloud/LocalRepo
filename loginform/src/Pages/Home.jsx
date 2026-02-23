import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getTasks, createTask, updateTask, deleteTask } from "../api/auth";
import "./Home.css";

function Home() {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    // New task form state
    const [newTitle, setNewTitle] = useState("");
    const [newDesc, setNewDesc] = useState("");
    const [adding, setAdding] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem("token");
        const stored = localStorage.getItem("user");
        if (!token || !stored) {
            navigate("/");
            return;
        }
        setUser(JSON.parse(stored));
        getTasks()
            .then(setTasks)
            .catch(() => setError("Couldn't load tasks. Make sure the backend is running."))
            .finally(() => setLoading(false));
    }, [navigate]);

    const today = new Date().toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
    });

    const completedCount = tasks.filter((t) => t.completed).length;
    const pendingCount = tasks.length - completedCount;

    const handleAdd = async (e) => {
        e.preventDefault();
        if (!newTitle.trim()) return;
        setAdding(true);
        try {
            const task = await createTask({ title: newTitle.trim(), description: newDesc.trim() || null });
            setTasks((prev) => [task, ...prev]);
            setNewTitle("");
            setNewDesc("");
        } catch {
            setError("Failed to add task.");
        } finally {
            setAdding(false);
        }
    };

    const toggleComplete = async (task) => {
        try {
            const updated = await updateTask(task.id, { completed: !task.completed });
            setTasks((prev) => prev.map((t) => (t.id === updated.id ? updated : t)));
        } catch {
            setError("Couldn't update task.");
        }
    };

    const handleDelete = async (id) => {
        try {
            await deleteTask(id);
            setTasks((prev) => prev.filter((t) => t.id !== id));
        } catch {
            setError("Couldn't delete task.");
        }
    };

    if (loading) {
        return (
            <div className="home-loading">
                <div className="spinner" />
            </div>
        );
    }

    return (
        <div className="home-page">
            {/* Header */}
            <div className="home-header">
                <div>
                    <h1 className="home-greeting">Welcome back, {user?.name} 👋</h1>
                    <p className="home-date">{today}</p>
                </div>
            </div>

            {/* Stats */}
            <div className="stats-row">
                <div className="stat-card">
                    <span className="stat-number">{tasks.length}</span>
                    <span className="stat-label">Total Tasks</span>
                </div>
                <div className="stat-card stat-done">
                    <span className="stat-number">{completedCount}</span>
                    <span className="stat-label">Completed</span>
                </div>
                <div className="stat-card stat-pending">
                    <span className="stat-number">{pendingCount}</span>
                    <span className="stat-label">Pending</span>
                </div>
            </div>

            {error && <div className="home-error">⚠ {error}</div>}

            {/* Add Task Form */}
            <div className="add-task-card">
                <h2 className="section-title">Add a Task</h2>
                <form className="add-task-form" onSubmit={handleAdd}>
                    <input
                        type="text"
                        placeholder="Task title"
                        value={newTitle}
                        onChange={(e) => setNewTitle(e.target.value)}
                        className="task-input"
                        required
                    />
                    <input
                        type="text"
                        placeholder="Description (optional)"
                        value={newDesc}
                        onChange={(e) => setNewDesc(e.target.value)}
                        className="task-input"
                    />
                    <button type="submit" className="btn-primary" disabled={adding}>
                        {adding ? "Adding…" : "+ Add Task"}
                    </button>
                </form>
            </div>

            {/* Task List */}
            <div className="task-section">
                <h2 className="section-title">Your Tasks</h2>
                {tasks.length === 0 ? (
                    <p className="empty-msg">No tasks yet. Add one above!</p>
                ) : (
                    <ul className="task-list">
                        {tasks.map((task) => (
                            <li key={task.id} className={`task-card ${task.completed ? "task-done" : ""}`}>
                                <div className="task-left">
                                    <input
                                        type="checkbox"
                                        checked={task.completed}
                                        onChange={() => toggleComplete(task)}
                                        className="task-checkbox"
                                    />
                                    <div className="task-text">
                                        <span className="task-title">{task.title}</span>
                                        {task.description && (
                                            <span className="task-desc">{task.description}</span>
                                        )}
                                    </div>
                                </div>
                                <button
                                    className="btn-delete"
                                    onClick={() => handleDelete(task.id)}
                                    title="Delete task"
                                >
                                    ✕
                                </button>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
}

export default Home;
