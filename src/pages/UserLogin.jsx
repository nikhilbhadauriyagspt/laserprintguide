import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

import Mail from "lucide-react/dist/esm/icons/mail";
import Lock from "lucide-react/dist/esm/icons/lock";
import Eye from "lucide-react/dist/esm/icons/eye";
import EyeOff from "lucide-react/dist/esm/icons/eye-off";
import Loader2 from "lucide-react/dist/esm/icons/loader-2";
import ArrowRight from "lucide-react/dist/esm/icons/arrow-right";
import ShieldCheck from "lucide-react/dist/esm/icons/shield-check";
import CheckCircle2 from "lucide-react/dist/esm/icons/check-circle-2";
import Users from "lucide-react/dist/esm/icons/users";

import API_BASE_URL from "../config";
import SEO from "@/components/SEO";

export default function UserLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    const payload = {
      type: "user",
      identifier: email.trim(),
      email: email.trim(),
      password: password,
    };

    try {
      const response = await fetch(`${API_BASE_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (data.status === "success") {
        const userData = data.data || data.user || data;

        localStorage.setItem("user", JSON.stringify(userData));
        window.dispatchEvent(new Event("storage"));

        navigate("/profile");
      } else {
        setError(
          data.message ||
            "Authentication failed. Please check your credentials."
        );
      }
    } catch {
      setError("Could not connect to the authentication server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#f7f8fb] px-4 py-16 md:px-8 lg:px-10 lg:py-24">
      <SEO title="Sign In | Laser Print Guide" />

      <div className="mx-auto grid max-w-[1250px] grid-cols-1 overflow-hidden bg-white shadow-[0_25px_80px_rgba(15,23,42,0.08)] lg:grid-cols-[520px_minmax(0,1fr)]">
        {/* LEFT */}
        <div className="relative flex flex-col justify-between overflow-hidden bg-slate-950 px-8 py-14 md:px-12 lg:px-14">
          <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-blue-700/20 blur-3xl" />
          <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-blue-400/10 blur-3xl" />

          <div className="relative z-10">
            <span className="text-[13px] font-semibold uppercase tracking-[0.18em] text-blue-300">
              Welcome Back
            </span>

            <h1 className="mt-5 text-[32px] font-semibold leading-[1.05] tracking-tight text-white md:text-[40px]">
              Sign In To
              
              Continue.
            </h1>

            <p className="mt-6 max-w-[360px] text-[16px] leading-8 text-slate-400">
              Sign in to your account to manage orders and explore our latest
              printer collection.
            </p>

            <div className="mt-14 space-y-5">
              <Feature icon={ShieldCheck} text="Secure Authentication" />
              <Feature icon={CheckCircle2} text="Track Your Orders" />
              <Feature icon={Users} text="Manage Profile" />
            </div>
          </div>

          <div className="relative z-10 mt-14 border-t border-white/10 pt-6">
            <p className="text-[13px] leading-7 text-slate-500">
              Fast login access with secure authentication and smooth account
              management.
            </p>
          </div>
        </div>

        {/* RIGHT */}
        <div className="bg-white px-6 py-14 sm:px-10 lg:px-14">
          <div className="mx-auto max-w-[620px]">
            <div className="mb-10">
              <span className="text-[13px] font-semibold uppercase tracking-[0.18em] text-blue-700">
                Account Login
              </span>

              <h2 className="mt-3 text-[34px] font-semibold tracking-tight text-slate-950 md:text-[46px]">
                Sign In
              </h2>

              <p className="mt-4 text-[15px] leading-7 text-slate-600">
                Please enter your credentials below to continue accessing your
                account.
              </p>
            </div>

            <AnimatePresence mode="wait">
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  className="mb-6 flex items-center gap-3 border border-red-100 bg-red-50 px-5 py-4 text-[14px] font-medium text-red-600"
                >
                  <div className="h-2 w-2 rounded-full bg-red-500" />
                  {error}
                </motion.div>
              )}
            </AnimatePresence>

            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <label className="mb-2 block text-[12px] font-semibold uppercase tracking-[0.16em] text-slate-500">
                  Email Address
                </label>

                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                    <Mail size={18} />
                  </div>

                  <input
                    required
                    type="email"
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="h-14 w-full border border-slate-200 bg-[#f8fafc] pl-12 pr-4 text-[14px] font-medium text-slate-900 outline-none transition focus:border-blue-700 focus:bg-white"
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-[12px] font-semibold uppercase tracking-[0.16em] text-slate-500">
                  Password
                </label>

                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                    <Lock size={18} />
                  </div>

                  <input
                    required
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="h-14 w-full border border-slate-200 bg-[#f8fafc] pl-12 pr-12 text-[14px] font-medium text-slate-900 outline-none transition focus:border-blue-700 focus:bg-white"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 transition hover:text-slate-900"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <button
                disabled={loading}
                className="flex h-15 w-full items-center justify-center gap-3 bg-slate-950 px-8 text-[14px] font-medium text-white transition hover:bg-blue-700 disabled:opacity-70"
              >
                {loading ? (
                  <>
                    <Loader2 className="animate-spin" size={19} />
                    Processing...
                  </>
                ) : (
                  <>
                    Sign In
                    <ArrowRight size={18} />
                  </>
                )}
              </button>
            </form>

            <div className="mt-10 border-t border-slate-100 pt-6 text-center">
              <p className="text-[14px] font-medium text-slate-500">
                New to Laser Print Guide?
                <Link
                  to="/signup"
                  className="ml-2 font-semibold text-blue-700 hover:underline"
                >
                  Create an Account
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Feature({ icon: Icon, text }) {
  return (
    <div className="flex items-center gap-4">
      <div className="flex h-12 w-12 items-center justify-center bg-white/10 text-blue-300">
        <Icon size={22} />
      </div>

      <span className="text-[15px] font-medium text-white">{text}</span>
    </div>
  );
}