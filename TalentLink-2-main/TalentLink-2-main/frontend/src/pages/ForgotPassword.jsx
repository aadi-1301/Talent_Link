import { useState } from "react";
import { Mail } from "lucide-react";
import api from "../api/axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSendOTP = async (e) => {
    e.preventDefault();
    if (!email) return toast.error("Enter a valid email!");

    setLoading(true);
    try {
      const res = await api.post("/auth/send-otp", { email });
      toast.success("OTP sent to your email!");
      navigate(`/verify-otp?email=${email}`);
    } catch (err) {
      toast.error(err.response?.data?.error || "Failed to send OTP");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0B1220] px-4">
      <div className="max-w-md w-full bg-[#121B2E] p-8 rounded-xl shadow-lg border border-[#233044]">
        
        <h1 className="text-2xl font-bold text-white text-center mb-2">Forgot Password?</h1>
        <p className="text-gray-400 text-center mb-6 text-sm">Enter your email to receive OTP</p>

        <form onSubmit={handleSendOTP} className="space-y-5">
          <div className="relative">
            <Mail className="absolute left-3 top-3 text-gray-400" size={19}/>
            <input
              type="email"
              className="w-full bg-[#0D1525] border border-gray-700 text-white px-10 py-2 rounded-lg focus:ring-2 ring-blue-500 outline-none"
              placeholder="Your email..."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <button 
            className="w-full py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold transition"
            disabled={loading}
          >
            {loading ? "Sending..." : "Send OTP"}
          </button>
        </form>
      </div>
    </div>
  );
}
