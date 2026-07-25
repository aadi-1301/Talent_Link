import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../api/axios";

export default function VerifyOtp() {
  const query = new URLSearchParams(useLocation().search);
  const email = query.get("email");

  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleVerify = async (e) => {
    e.preventDefault();

    setLoading(true);
    try {
      const res = await api.post("/auth/verify-otp", { email, otp });
      toast.success("OTP Verified!");
      navigate(`/reset-password?email=${email}`);
    } catch (err) {
      toast.error(err.response?.data?.error || "Invalid OTP");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0B1220] px-4">
      <div className="max-w-md w-full bg-[#121B2E] p-8 rounded-xl border border-[#233044] shadow-lg">

        <h1 className="text-2xl font-bold text-white text-center mb-2">Verify OTP</h1>
        <p className="text-gray-400 text-center mb-6 text-sm">{email}</p>

        <form onSubmit={handleVerify} className="space-y-5">
          <input
            type="number"
            className="w-full bg-[#0D1525] border border-gray-700 text-white px-4 py-2 rounded-lg focus:ring-blue-600 outline-none"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            required
          />

          <button className="w-full py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold">
            {loading ? "Verifying..." : "Verify OTP"}
          </button>
        </form>
      </div>
    </div>
  );
}
