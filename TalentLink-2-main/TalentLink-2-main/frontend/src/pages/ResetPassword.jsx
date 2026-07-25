import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import api from "../api/axios";
import { toast } from "react-toastify";

export default function ResetPassword() {
  const email = new URLSearchParams(useLocation().search).get("email");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const navigate = useNavigate();

  const resetPassword = async (e) => {
    e.preventDefault();
    if (password !== confirm) return toast.error("Passwords don't match");

    try {
      await api.post("/auth/reset-password", { email, password });
      toast.success("Password changed! Login now.");
      navigate("/login");
    } catch (err) {
      toast.error(err.response?.data?.error || "Reset failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0B1220] px-4">
      <div className="max-w-md w-full bg-[#121B2E] p-8 rounded-xl border border-[#233044]">

        <h1 className="text-2xl font-bold text-white text-center mb-6">Reset Password</h1>

        <form onSubmit={resetPassword} className="space-y-5">
          <input
            type="password"
            placeholder="New Password"
            className="w-full bg-[#0D1525] border border-gray-700 text-white px-4 py-2 rounded-lg"
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Confirm Password"
            className="w-full bg-[#0D1525] border border-gray-700 text-white px-4 py-2 rounded-lg"
            onChange={(e) => setConfirm(e.target.value)}
            required
          />

          <button className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg">
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
}
