import React, { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { resetPassword } from "../api/auth";
import "./ResetPassword.css";

function ResetPassword() {
    const [params] = useSearchParams();
    const navigate = useNavigate();
    const token = params.get("token") || "";

    const [newPassword, setNewPassword] = useState("");
    const [confirm, setConfirm] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [done, setDone] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        if (!newPassword || !confirm) {
            setError("Please fill in both fields.");
            return;
        }
        if (newPassword.length < 6) {
            setError("Password must be at least 6 characters.");
            return;
        }
        if (newPassword !== confirm) {
            setError("Passwords don't match.");
            return;
        }

        setLoading(true);
        try {
            await resetPassword({ token, new_password: newPassword });
            setDone(true);
        } catch (err) {
            const detail = err?.response?.data?.detail;
            setError(detail || "Link expired or invalid. Please request a new one.");
        } finally {
            setLoading(false);
        }
    };

    if (!token) {
        return (
            <div className="rp-page">
                <div className="rp-card">
                    <p className="rp-error">Invalid reset link. Please request a new one.</p>
                    <button className="rp-btn" onClick={() => navigate("/")}>Back to Login</button>
                </div>
            </div>
        );
    }

    if (done) {
        return (
            <div className="rp-page">
                <div className="rp-card">
                    <div className="rp-icon">✅</div>
                    <h1 className="rp-title">Password updated!</h1>
                    <p className="rp-sub">You can now sign in with your new password.</p>
                    <button className="rp-btn" onClick={() => navigate("/")}>Go to Login</button>
                </div>
            </div>
        );
    }

    return (
        <div className="rp-page">
            <div className="rp-card">
                <div className="rp-icon">🔑</div>
                <h1 className="rp-title">Set a new password</h1>
                <p className="rp-sub">Choose something strong.</p>

                <form onSubmit={handleSubmit} className="rp-form">
                    <input
                        type="password"
                        placeholder="New password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        className="rp-input"
                    />
                    <input
                        type="password"
                        placeholder="Confirm password"
                        value={confirm}
                        onChange={(e) => setConfirm(e.target.value)}
                        className="rp-input"
                    />
                    {error && <div className="rp-error">⚠ {error}</div>}
                    <button type="submit" className="rp-btn" disabled={loading}>
                        {loading ? "Saving…" : "Update Password"}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default ResetPassword;
