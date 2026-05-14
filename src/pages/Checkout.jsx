import React, { useState, useEffect } from "react";
import { useCart } from "../context/CartContext";
import { Link, useNavigate } from "react-router-dom";

import ChevronLeft from "lucide-react/dist/esm/icons/chevron-left";
import ChevronRight from "lucide-react/dist/esm/icons/chevron-right";
import CreditCard from "lucide-react/dist/esm/icons/credit-card";
import ArrowRight from "lucide-react/dist/esm/icons/arrow-right";
import Lock from "lucide-react/dist/esm/icons/lock";
import MapPin from "lucide-react/dist/esm/icons/map-pin";
import Mail from "lucide-react/dist/esm/icons/mail";
import CheckCircle2 from "lucide-react/dist/esm/icons/check-circle-2";
import Package from "lucide-react/dist/esm/icons/package";
import Phone from "lucide-react/dist/esm/icons/phone";
import Wallet from "lucide-react/dist/esm/icons/wallet";
import ShoppingBag from "lucide-react/dist/esm/icons/shopping-bag";
import ShieldCheck from "lucide-react/dist/esm/icons/shield-check";
import Truck from "lucide-react/dist/esm/icons/truck";

import { motion, AnimatePresence } from "framer-motion";
import {
  PayPalButtons,
  PayPalScriptProvider,
} from "@paypal/react-paypal-js";

import API_BASE_URL from "../config";
import SEO from "@/components/SEO";
import { cn } from "../lib/utils";

export default function Checkout() {
  const { cart, clearCart, cartTotal } = useCart();

  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [orderId, setOrderId] = useState(null);

  const user = JSON.parse(localStorage.getItem("user") || "null");

  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    zipCode: "",
    phone: "",
    paymentMethod: "paypal",
  });

  useEffect(() => {
    if (user) {
      setFormData((prev) => ({
        ...prev,
        email: user.email || "",
        firstName: user.name?.split(" ")[0] || "",
        lastName: user.name?.split(" ").slice(1).join(" ") || "",
        phone: user.phone || "",
      }));
    }
  }, []);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleOrderSuccess = async (paymentDetails = null) => {
    setLoading(true);

    try {
      const orderData = {
        ...formData,
        user_id: user?.id,
        total: cartTotal,
        items: cart,
        payment_details: paymentDetails,
        source: "laserprintguide.co",
      };

      const response = await fetch(`${API_BASE_URL}/orders`, {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify(orderData),
      });

      const data = await response.json();

      if (data.status === "success") {
        setOrderId(data.order_id || data.data?.order_code || data.data?.id);

        setStep(3);

        clearCart();
      } else {
        alert(data.message || "Error placing order.");
      }
    } catch {
      alert("Error placing order.");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();

    if (step === 1) {
      window.scrollTo(0, 0);
      setStep(2);
    } else if (formData.paymentMethod === "cod") {
      await handleOrderSuccess();
    }
  };

  const getImagePath = (images) => {
    try {
      const imgs = typeof images === "string" ? JSON.parse(images) : images;

      if (Array.isArray(imgs) && imgs.length > 0) {
        const img = imgs[0];

        return img.startsWith("http")
          ? img
          : `/${img.replace(/\\/g, "/")}`;
      }
    } catch (e) {}

    return "https://via.placeholder.com/100x100?text=Product";
  };

  if (cart.length === 0 && step !== 3) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f7f8fb] px-4">
        <div className="w-full max-w-[520px] bg-white p-12 text-center shadow-[0_18px_55px_rgba(15,23,42,0.06)]">
          <div className="mx-auto mb-8 flex h-24 w-24 items-center justify-center bg-blue-50 text-blue-700">
            <ShoppingBag size={40} />
          </div>

          <h2 className="text-[34px] font-semibold tracking-tight text-slate-950">
            Your Cart Is Empty
          </h2>

          <p className="mx-auto mt-4 max-w-[360px] text-[15px] leading-8 text-slate-600">
            Please add some printers or accessories before proceeding to
            checkout.
          </p>

          <Link
            to="/shop"
            className="mt-8 flex h-14 w-full items-center justify-center bg-slate-950 text-[14px] font-medium text-white transition hover:bg-blue-700"
          >
            Start Shopping
          </Link>
        </div>
      </div>
    );
  }

  if (step === 3) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f7f8fb] px-4 py-20">
        <SEO title="Order Confirmed | Laser Print Guide" />

        <div className="w-full max-w-[700px] bg-white p-12 text-center shadow-[0_18px_55px_rgba(15,23,42,0.06)]">
          <div className="mx-auto mb-8 flex h-24 w-24 items-center justify-center bg-blue-700 text-white">
            <CheckCircle2 size={42} />
          </div>

          <h1 className="text-[42px] font-semibold leading-tight tracking-tight text-slate-950">
            Order Confirmed
          </h1>

          <p className="mx-auto mt-5 max-w-[520px] text-[16px] leading-8 text-slate-600">
            Thank you for shopping with Laser Print Guide. Your order{" "}
            <span className="font-semibold text-slate-950">#{orderId}</span> is
            currently being processed.
          </p>

          <div className="mt-10 space-y-4">
            <Link
              to="/orders"
              className="flex h-14 w-full items-center justify-center gap-3 bg-slate-950 text-[14px] font-medium text-white transition hover:bg-blue-700"
            >
              Track Order
              <ArrowRight size={17} />
            </Link>

            <Link
              to="/"
              className="flex h-14 w-full items-center justify-center border border-slate-200 bg-white text-[14px] font-medium text-slate-900 transition hover:border-blue-700 hover:text-blue-700"
            >
              Return Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#f7f8fb] px-4 py-12 md:px-8 lg:px-10 lg:py-16">
      <SEO title="Secure Checkout | Laser Print Guide" />

      <div className="mx-auto max-w-[1700px]">
        {/* HEADER */}
        <div className="mb-10 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="mb-5 flex items-center gap-3 text-[12px] font-semibold uppercase tracking-[0.18em] text-slate-400">
              <Link
                to="/cart"
                className="transition hover:text-blue-700"
              >
                Cart
              </Link>

              <ChevronRight size={14} />

              <span
                className={cn(
                  step === 1 ? "text-blue-700" : "text-slate-900"
                )}
              >
                Shipping
              </span>

              <ChevronRight size={14} />

              <span
                className={cn(
                  step === 2 ? "text-blue-700" : "text-slate-400"
                )}
              >
                Payment
              </span>
            </div>

            <h1 className="text-[40px] font-semibold tracking-tight text-slate-950 md:text-[58px]">
              {step === 1 ? "Checkout" : "Payment"}
            </h1>
          </div>

          <div className="flex items-center gap-3 bg-white px-5 py-4 shadow-sm">
            <Lock size={17} className="text-blue-700" />

            <span className="text-[12px] font-semibold uppercase tracking-[0.16em] text-slate-500">
              Secure Checkout
            </span>
          </div>
        </div>

        {/* MAIN */}
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 gap-10 xl:grid-cols-[minmax(0,1fr)_430px]"
        >
          {/* LEFT */}
          <div className="bg-white p-6 shadow-[0_18px_55px_rgba(15,23,42,0.06)] md:p-10 lg:p-14">
            <AnimatePresence mode="wait">
              {step === 1 ? (
                <motion.div
                  key="shipping"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  className="space-y-10"
                >
                  {/* CONTACT */}
                  <div>
                    <div className="mb-7 flex items-center gap-4">
                      <div className="flex h-12 w-12 items-center justify-center bg-blue-50 text-blue-700">
                        <Mail size={20} />
                      </div>

                      <div>
                        <p className="text-[12px] font-semibold uppercase tracking-[0.16em] text-blue-700">
                          Contact
                        </p>

                        <h2 className="mt-1 text-[30px] font-semibold tracking-tight text-slate-950">
                          Contact Details
                        </h2>
                      </div>
                    </div>

                    <InputField
                      label="Email Address"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                    />
                  </div>

                  {/* SHIPPING */}
                  <div>
                    <div className="mb-7 flex items-center gap-4">
                      <div className="flex h-12 w-12 items-center justify-center bg-blue-50 text-blue-700">
                        <MapPin size={20} />
                      </div>

                      <div>
                        <p className="text-[12px] font-semibold uppercase tracking-[0.16em] text-blue-700">
                          Shipping
                        </p>

                        <h2 className="mt-1 text-[30px] font-semibold tracking-tight text-slate-950">
                          Shipping Address
                        </h2>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                      <InputField
                        label="First Name"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                      />

                      <InputField
                        label="Last Name"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                      />
                    </div>

                    <div className="mt-6">
                      <InputField
                        label="Street Address"
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                      />
                    </div>

                    <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
                      <InputField
                        label="City / State"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                      />

                      <InputField
                        label="ZIP / Postal Code"
                        name="zipCode"
                        value={formData.zipCode}
                        onChange={handleInputChange}
                      />
                    </div>

                    <div className="mt-6">
                      <InputField
                        label="Phone Number"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="flex h-14 w-full items-center justify-center gap-3 bg-slate-950 text-[14px] font-medium text-white transition hover:bg-blue-700"
                  >
                    Continue To Payment
                    <ArrowRight size={17} />
                  </button>
                </motion.div>
              ) : (
                <motion.div
                  key="payment"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  className="space-y-10"
                >
                  {/* PAYMENT */}
                  <div>
                    <div className="mb-7 flex items-center gap-4">
                      <div className="flex h-12 w-12 items-center justify-center bg-blue-50 text-blue-700">
                        <CreditCard size={20} />
                      </div>

                      <div>
                        <p className="text-[12px] font-semibold uppercase tracking-[0.16em] text-blue-700">
                          Payment
                        </p>

                        <h2 className="mt-1 text-[30px] font-semibold tracking-tight text-slate-950">
                          Payment Method
                        </h2>
                      </div>
                    </div>

                    <div className="space-y-4">
                      {[
                        {
                          id: "paypal",
                          label: "PayPal / Credit Card",
                          icon: CreditCard,
                        },
                        {
                          id: "cod",
                          label: "Cash on Delivery",
                          icon: Wallet,
                        },
                      ].map((method) => (
                        <button
                          type="button"
                          key={method.id}
                          onClick={() =>
                            setFormData({
                              ...formData,
                              paymentMethod: method.id,
                            })
                          }
                          className={cn(
                            "flex w-full items-center justify-between border p-6 text-left transition",
                            formData.paymentMethod === method.id
                              ? "border-blue-700 bg-blue-50"
                              : "border-slate-200 bg-white hover:border-blue-200"
                          )}
                        >
                          <div className="flex items-center gap-4">
                            <div
                              className={cn(
                                "flex h-12 w-12 items-center justify-center",
                                formData.paymentMethod === method.id
                                  ? "bg-blue-700 text-white"
                                  : "bg-slate-100 text-slate-500"
                              )}
                            >
                              <method.icon size={20} />
                            </div>

                            <div>
                              <p className="text-[16px] font-medium text-slate-950">
                                {method.label}
                              </p>
                            </div>
                          </div>

                          <div
                            className={cn(
                              "h-5 w-5 rounded-full border-2",
                              formData.paymentMethod === method.id
                                ? "border-blue-700 bg-blue-700"
                                : "border-slate-300"
                            )}
                          />
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* PAYMENT ACTION */}
                  {formData.paymentMethod === "paypal" ? (
                    <div className="border border-slate-200 bg-white p-6">
                      <PayPalScriptProvider
                        options={{
                          "client-id":
                            "Aa7mAnBKh44YCdokTrFjIP1wIB6mVVjrN8z-NZc_G2VLYJle_Xz9pMdOO7DRXx7zYT7Gh0dzbJUY9DDm",
                          currency: "USD",
                          intent: "capture",
                        }}
                      >
                        <PayPalButtons
                          style={{
                            layout: "vertical",
                            shape: "pill",
                            label: "pay",
                          }}
                          createOrder={(data, actions) => {
                            return actions.order.create({
                              purchase_units: [
                                {
                                  amount: {
                                    value: cartTotal.toString(),
                                  },
                                },
                              ],
                            });
                          }}
                          onApprove={(data, actions) => {
                            return actions.order
                              .capture()
                              .then((details) => {
                                handleOrderSuccess(details);
                              });
                          }}
                        />
                      </PayPalScriptProvider>
                    </div>
                  ) : (
                    <button
                      type="submit"
                      disabled={loading}
                      className="flex h-14 w-full items-center justify-center gap-3 bg-slate-950 text-[14px] font-medium text-white transition hover:bg-blue-700 disabled:opacity-70"
                    >
                      {loading ? "Processing..." : "Complete Order"}

                      {!loading && <CheckCircle2 size={18} />}
                    </button>
                  )}

                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="flex items-center gap-2 text-[13px] font-medium text-slate-500 transition hover:text-blue-700"
                  >
                    <ChevronLeft size={16} />
                    Back To Shipping
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* RIGHT */}
          <div className="space-y-6">
            {/* SUMMARY */}
            <div className="sticky top-28 bg-white p-8 shadow-[0_18px_55px_rgba(15,23,42,0.06)]">
              <h2 className="text-[30px] font-semibold tracking-tight text-slate-950">
                Order Summary
              </h2>

              {/* PRODUCTS */}
              <div className="mt-8 max-h-[380px] space-y-5 overflow-y-auto pr-2">
                {cart.map((item) => (
                  <div
                    key={item.id}
                    className="flex gap-4 border-b border-slate-100 pb-5"
                  >
                    <div className="flex h-[80px] w-[80px] items-center justify-center bg-[#f3f6fb] p-3">
                      <img
                        src={getImagePath(item.images)}
                        alt={item.name}
                        className="max-h-full max-w-full object-contain"
                      />
                    </div>

                    <div className="min-w-0 flex-1">
                      <h3 className="line-clamp-2 text-[14px] font-medium leading-6 text-slate-900">
                        {item.name}
                      </h3>

                      <p className="mt-2 text-[12px] font-semibold uppercase tracking-[0.16em] text-slate-400">
                        Qty: {item.quantity}
                      </p>
                    </div>

                    <p className="text-[16px] font-semibold text-slate-950">
                      ${(item.price * item.quantity).toLocaleString()}
                    </p>
                  </div>
                ))}
              </div>

              {/* TOTAL */}
              <div className="mt-8 border-t border-slate-100 pt-6">
                <div className="mb-4 flex items-center justify-between text-[14px] text-slate-500">
                  <span>Subtotal</span>

                  <span className="font-semibold text-slate-950">
                    ${(cartTotal || 0).toLocaleString()}
                  </span>
                </div>

                <div className="mb-6 flex items-center justify-between text-[14px] text-slate-500">
                  <span>Shipping</span>

                  <span className="font-semibold text-emerald-600">
                    Free
                  </span>
                </div>

                <div className="border-t border-slate-100 pt-6">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-blue-700">
                    Grand Total
                  </p>

                  <h3 className="mt-3 text-[46px] font-semibold leading-none tracking-tight text-slate-950">
                    ${(cartTotal || 0).toLocaleString()}
                  </h3>
                </div>
              </div>
            </div>

            {/* TRUST */}
            <div className="bg-slate-950 p-8 text-white">
              <div className="space-y-5">
                <div className="flex items-center gap-4">
                  <ShieldCheck size={18} className="text-blue-400" />

                  <span className="text-[12px] font-semibold uppercase tracking-[0.16em]">
                    Secure Payment
                  </span>
                </div>

                <div className="flex items-center gap-4">
                  <Truck size={18} className="text-blue-400" />

                  <span className="text-[12px] font-semibold uppercase tracking-[0.16em]">
                    Tracked Delivery
                  </span>
                </div>

                <div className="flex items-center gap-4">
                  <Package size={18} className="text-blue-400" />

                  <span className="text-[12px] font-semibold uppercase tracking-[0.16em]">
                    Genuine Products
                  </span>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

function InputField({
  label,
  name,
  type = "text",
  value,
  onChange,
}) {
  return (
    <div>
      <label className="mb-2 block text-[12px] font-semibold uppercase tracking-[0.16em] text-slate-500">
        {label}
      </label>

      <input
        required
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        className="h-14 w-full border border-slate-200 bg-white px-5 text-[14px] font-medium text-slate-900 outline-none transition focus:border-blue-700"
      />
    </div>
  );
}