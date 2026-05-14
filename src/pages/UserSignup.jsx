import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

import Mail from "lucide-react/dist/esm/icons/mail";
import Lock from "lucide-react/dist/esm/icons/lock";
import User from "lucide-react/dist/esm/icons/user";
import Eye from "lucide-react/dist/esm/icons/eye";
import EyeOff from "lucide-react/dist/esm/icons/eye-off";
import ArrowRight from "lucide-react/dist/esm/icons/arrow-right";
import Loader2 from "lucide-react/dist/esm/icons/loader-2";
import Phone from "lucide-react/dist/esm/icons/phone";
import ShieldCheck from "lucide-react/dist/esm/icons/shield-check";
import CheckCircle2 from "lucide-react/dist/esm/icons/check-circle-2";
import ShoppingBag from "lucide-react/dist/esm/icons/shopping-bag";

import API_BASE_URL from "../config";
import SEO from "@/components/SEO";

export default function UserSignup() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`${API_BASE_URL}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },

        body: JSON.stringify({
          type: "user",
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (data.status === "success") {
        localStorage.setItem("user", JSON.stringify(data.data));
        window.dispatchEvent(new Event("storage"));
        navigate("/");
      } else {
        setError(data.message || "Registration failed");
      }
    } catch {
      setError("Could not connect to server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#f7f8fb] px-4 py-16 md:px-8 lg:px-10 lg:py-24">
      <SEO title="Create Account | Laser Print Guide" />

      <div className="mx-auto grid max-w-[1250px] grid-cols-1 overflow-hidden bg-white shadow-[0_25px_80px_rgba(15,23,42,0.08)] lg:grid-cols-[520px_minmax(0,1fr)]">
        {/* LEFT */}
        <div className="relative flex flex-col justify-between overflow-hidden bg-slate-950 px-8 py-14 md:px-12 lg:px-14">
          <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-blue-700/20 blur-3xl" />
          <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-blue-400/10 blur-3xl" />

          <div className="relative z-10">
            <span className="text-[13px] font-semibold uppercase tracking-[0.18em] text-blue-300">
              Create Account
            </span>

            <h1 className="mt-5 text-[32px] font-semibold leading-[1.05] tracking-tight text-white md:text-[40px]">
              Start Your
              
              Journey.
            </h1>

            <p className="mt-6 max-w-[360px] text-[16px] leading-8 text-slate-400">
              Join Laser Print Guide today for a faster checkout experience and
              exclusive member deals.
            </p>

            <div className="mt-14 space-y-5">
              <Feature
                icon={ShieldCheck}
                text="Fast & Secure Signup"
              />

              <Feature
                icon={ShoppingBag}
                text="Exclusive Printer Deals"
              />

              <Feature
                icon={CheckCircle2}
                text="Easy Order History"
              />
            </div>
          </div>

          <div className="relative z-10 mt-14 border-t border-white/10 pt-6">
            <p className="text-[13px] leading-7 text-slate-500">
              Secure registration and smooth account access designed for a
              better shopping experience.
            </p>
          </div>
        </div>

        {/* RIGHT */}
        <div className="bg-white px-6 py-14 sm:px-10 lg:px-14">
          <div className="mx-auto max-w-[720px]">
            <div className="mb-10">
              <span className="text-[13px] font-semibold uppercase tracking-[0.18em] text-blue-700">
                Register
              </span>

              <h2 className="mt-3 text-[34px] font-semibold tracking-tight text-slate-950 md:text-[46px]">
                Create Your Account
              </h2>

              <p className="mt-4 text-[15px] leading-7 text-slate-600">
                Please fill in your details to create your account and continue
                shopping with ease.
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

            <form onSubmit={handleSignup} className="space-y-6">
              <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                <InputField
                  label="Full Name"
                  icon={User}
                  type="text"
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                />

                <InputField
                  label="Email Address"
                  icon={Mail}
                  type="email"
                  placeholder="john@example.com"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
              </div>

              <InputField
                label="Phone Number"
                icon={Phone}
                type="tel"
                placeholder="+1 (555) 000-0000"
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
              />

              <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                <PasswordField
                  label="Password"
                  value={formData.password}
                  showPassword={showPassword}
                  setShowPassword={setShowPassword}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                />

                <PasswordField
                  label="Confirm Password"
                  value={formData.confirmPassword}
                  showPassword={showPassword}
                  setShowPassword={setShowPassword}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      confirmPassword: e.target.value,
                    })
                  }
                />
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
                    Create Account
                    <ArrowRight size={18} />
                  </>
                )}
              </button>
            </form>

            <div className="mt-10 border-t border-slate-100 pt-6 text-center">
              <p className="text-[14px] font-medium text-slate-500">
                Already have an account?
                <Link
                  to="/login"
                  className="ml-2 font-semibold text-blue-700 hover:underline"
                >
                  Sign In
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

function InputField({
  label,
  icon: Icon,
  type,
  placeholder,
  value,
  onChange,
}) {
  return (
    <div>
      <label className="mb-2 block text-[12px] font-semibold uppercase tracking-[0.16em] text-slate-500">
        {label}
      </label>

      <div className="relative">
        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
          <Icon size={18} />
        </div>

        <input
          required
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className="h-14 w-full border border-slate-200 bg-[#f8fafc] pl-12 pr-4 text-[14px] font-medium text-slate-900 outline-none transition focus:border-blue-700 focus:bg-white"
        />
      </div>
    </div>
  );
}

function PasswordField({
  label,
  value,
  onChange,
  showPassword,
  setShowPassword,
}) {
  return (
    <div>
      <label className="mb-2 block text-[12px] font-semibold uppercase tracking-[0.16em] text-slate-500">
        {label}
      </label>

      <div className="relative">
        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
          <Lock size={18} />
        </div>

        <input
          required
          type={showPassword ? "text" : "password"}
          placeholder="••••••••"
          value={value}
          onChange={onChange}
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
  );
}