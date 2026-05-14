import React, { useState } from "react";
import { AnimatePresence } from "framer-motion";
import SEO from "@/components/SEO";
import Mail from "lucide-react/dist/esm/icons/mail";
import CheckCircle2 from "lucide-react/dist/esm/icons/check-circle-2";
import Loader2 from "lucide-react/dist/esm/icons/loader-2";
import ChevronDown from "lucide-react/dist/esm/icons/chevron-down";
import ArrowRight from "lucide-react/dist/esm/icons/arrow-right";
import API_BASE_URL from "../config";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "General Inquiry",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);

    try {
      const response = await fetch(`${API_BASE_URL}/contacts`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.status === "success") {
        setStatus("success");
        setFormData({
          name: "",
          email: "",
          phone: "",
          subject: "General Inquiry",
          message: "",
        });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white text-slate-950">
      <SEO
        title="Contact Us | Laser Print Guide Support"
        description="Connect with our professional support team for detailed printer inquiries and order assistance. We are here to help you find the perfect printing solution."
      />

      {/* HERO */}
      <section className="bg-[#f7f8fb] px-4 py-20 md:px-8 lg:px-10">
        <div className="mx-auto max-w-[1200px] text-center">
          <span className="text-[13px] font-semibold uppercase tracking-[0.18em] text-blue-700">
            Contact
          </span>

          <h1 className="mt-4 text-[40px] font-semibold leading-[1.08] tracking-tight text-slate-950 md:text-[58px]">
            We’re Here to Help.
          </h1>

          <p className="mx-auto mt-5 max-w-[720px] text-[16px] leading-8 text-slate-600 md:text-[17px]">
            Got a question about a printer? Need help with an order? Our team is
            ready to provide the answers you need.
          </p>
        </div>
      </section>

      {/* CONTACT CONTENT */}
      <section className="px-4 py-20 md:px-8 lg:px-10">
        <div className="mx-auto grid max-w-[1400px] grid-cols-1 gap-10 lg:grid-cols-[380px_minmax(0,1fr)]">
          {/* LEFT INFO */}
          <aside className="bg-[#f7f8fb] p-8 md:p-10">
            <h2 className="text-[30px] font-semibold tracking-tight text-slate-950 md:text-[38px]">
              Get in Touch
            </h2>

            <p className="mt-4 text-[15px] leading-7 text-slate-600">
              We value clear communication and fast responses. Reach out through
              any of these channels and we'll get back to you as soon as
              possible.
            </p>

            <div className="mt-10 border-t border-slate-200 pt-8">
              <div className="flex items-start gap-4">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center bg-white text-blue-700 shadow-sm">
                  <Mail size={24} />
                </div>

                <div>
                  <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-slate-500">
                    Email Us
                  </p>

                  <a
                    href="mailto:info@laserprintguide.co"
                    className="mt-2 block text-[16px] font-semibold text-slate-950 hover:text-blue-700"
                  >
                    info@laserprintguide.co
                  </a>
                </div>
              </div>
            </div>
          </aside>

          {/* FORM */}
          <div className="border border-slate-100 bg-white p-6 shadow-[0_18px_55px_rgba(15,23,42,0.08)] md:p-10 lg:p-12">
            <div className="mb-10">
              <span className="text-[13px] font-semibold uppercase tracking-[0.18em] text-blue-700">
                Send a Message
              </span>

              <h3 className="mt-3 text-[30px] font-semibold tracking-tight text-slate-950 md:text-[40px]">
                Tell Us What You Need
              </h3>

              <p className="mt-3 text-[15px] leading-7 text-slate-600">
                Fill out the form below and our team will be in touch shortly.
              </p>
            </div>

            <AnimatePresence mode="wait">
              {status === "success" ? (
                <div className="bg-[#f7f8fb] px-6 py-16 text-center">
                  <div className="mx-auto mb-6 flex h-18 w-18 items-center justify-center rounded-full bg-blue-50 text-blue-700">
                    <CheckCircle2 size={42} />
                  </div>

                  <h4 className="text-[32px] font-semibold text-slate-950">
                    Message Sent!
                  </h4>

                  <p className="mx-auto mt-4 max-w-[520px] text-[15px] leading-7 text-slate-600">
                    Thank you for reaching out. We have received your message
                    and will respond within 24 hours.
                  </p>

                  <button
                    onClick={() => setStatus(null)}
                    className="mt-8 inline-flex h-14 items-center justify-center rounded-full bg-slate-950 px-8 text-[14px] font-medium text-white transition hover:bg-blue-700"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                    <Field label="Full Name">
                      <input
                        required
                        type="text"
                        placeholder="Your name"
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                        className="inputStyle"
                      />
                    </Field>

                    <Field label="Email Address">
                      <input
                        required
                        type="email"
                        placeholder="email@example.com"
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        className="inputStyle"
                      />
                    </Field>
                  </div>

                  <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                    <Field label="Phone (Optional)">
                      <input
                        type="tel"
                        placeholder="Your phone number"
                        value={formData.phone}
                        onChange={(e) =>
                          setFormData({ ...formData, phone: e.target.value })
                        }
                        className="inputStyle"
                      />
                    </Field>

                    <Field label="Subject">
                      <div className="relative">
                        <select
                          value={formData.subject}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              subject: e.target.value,
                            })
                          }
                          className="inputStyle appearance-none cursor-pointer"
                        >
                          <option>General Inquiry</option>
                          <option>Product Question</option>
                          <option>Order Support</option>
                          <option>Technical Help</option>
                        </select>

                        <ChevronDown
                          className="pointer-events-none absolute right-5 top-1/2 -translate-y-1/2 text-slate-500"
                          size={18}
                        />
                      </div>
                    </Field>
                  </div>

                  <Field label="Your Message">
                    <textarea
                      required
                      rows="6"
                      placeholder="How can we help you today?"
                      value={formData.message}
                      onChange={(e) =>
                        setFormData({ ...formData, message: e.target.value })
                      }
                      className="inputStyle h-auto resize-none py-4"
                    />
                  </Field>

                  <div className="pt-4">
                    <button
                      disabled={loading}
                      className="inline-flex h-14 w-full items-center justify-center gap-3 rounded-full bg-slate-950 px-8 text-[14px] font-medium text-white transition hover:bg-blue-700 disabled:opacity-70 md:w-auto"
                    >
                      {loading ? (
                        <>
                          <Loader2 size={19} className="animate-spin" />
                          Processing...
                        </>
                      ) : (
                        <>
                          Send Message <ArrowRight size={18} />
                        </>
                      )}
                    </button>

                    {status === "error" && (
                      <p className="mt-4 text-[13px] font-medium text-red-500">
                        Something went wrong. Please try again.
                      </p>
                    )}
                  </div>
                </form>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>

      <style>{`
        .inputStyle {
          width: 100%;
          height: 56px;
          background: #f8fafc;
          border: 1px solid #e2e8f0;
          padding: 0 18px;
          font-size: 14px;
          font-weight: 500;
          color: #0f172a;
          outline: none;
          transition: all .25s ease;
        }
        .inputStyle:focus {
          background: #ffffff;
          border-color: #1d4ed8;
          box-shadow: 0 0 0 4px rgba(29, 78, 216, .08);
        }
      `}</style>
    </div>
  );
}

function Field({ label, children }) {
  return (
    <div>
      <label className="mb-2 block text-[12px] font-semibold uppercase tracking-[0.16em] text-slate-500">
        {label}
      </label>
      {children}
    </div>
  );
}