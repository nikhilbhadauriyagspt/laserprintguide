import React, { useState, useEffect } from "react";
import API_BASE_URL from "../config";
import SEO from "@/components/SEO";

import Package from "lucide-react/dist/esm/icons/package";
import ArrowRight from "lucide-react/dist/esm/icons/arrow-right";
import X from "lucide-react/dist/esm/icons/x";
import ChevronRight from "lucide-react/dist/esm/icons/chevron-right";
import ShoppingBag from "lucide-react/dist/esm/icons/shopping-bag";
import Clock from "lucide-react/dist/esm/icons/clock";
import CheckCircle2 from "lucide-react/dist/esm/icons/check-circle-2";
import Truck from "lucide-react/dist/esm/icons/truck";
import HelpCircle from "lucide-react/dist/esm/icons/help-circle";
import Search from "lucide-react/dist/esm/icons/search";

import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "../lib/utils";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const [error, setError] = useState(null);

  const [selectedOrder, setSelectedOrder] = useState(null);

  const [trackEmail, setTrackEmail] = useState("");

  const [isTrackLoading, setIsTrackLoading] = useState(false);

  const user = JSON.parse(localStorage.getItem("user"));

  const handleQuickTrack = async (e) => {
    e.preventDefault();

    if (!trackEmail) return;

    setIsTrackLoading(true);
    setError(null);

    try {
      const res = await fetch(
        `${API_BASE_URL}/orders?email=${trackEmail}`
      );

      const data = await res.json();

      if (data.status === "success" && data.data.length > 0) {
        setOrders(data.data);
      } else {
        setError("No orders found for this email address.");
        setOrders([]);
      }
    } catch {
      setError("Failed to fetch orders. Please try again.");
    } finally {
      setIsTrackLoading(false);
      setLoading(false);
    }
  };

  const fetchOrders = async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(
        `${API_BASE_URL}/orders?user_id=${user?.id}`
      );

      const data = await res.json();

      if (data.status === "success") {
        setOrders(data.data);
      } else {
        setError(data.message || "No orders found.");
      }
    } catch {
      setError("Failed to fetch orders.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user?.id) fetchOrders();
    else setLoading(false);
  }, []);

  const getStatus = (status) => {
    const s = status?.toLowerCase();

    if (s === "delivered") return "Delivered";
    if (s === "processing") return "Processing";
    if (s === "shipped") return "Shipped";

    return "Pending";
  };

  const getStatusColor = (status) => {
    const s = status?.toLowerCase();

    if (s === "delivered")
      return "bg-emerald-50 text-emerald-600 border-emerald-100";

    if (s === "processing")
      return "bg-amber-50 text-amber-600 border-amber-100";

    if (s === "shipped")
      return "bg-blue-50 text-blue-700 border-blue-100";

    return "bg-slate-50 text-slate-600 border-slate-100";
  };

  const getStatusIcon = (status) => {
    const s = status?.toLowerCase();

    if (s === "delivered") return <CheckCircle2 size={13} />;

    if (s === "shipped") return <Truck size={13} />;

    return <Clock size={13} />;
  };

  return (
    <div className="min-h-screen bg-[#f7f8fb] px-4 py-12 md:px-8 lg:px-10 lg:py-16">
      <SEO title="Order History | Laser Print Guide" />

      <div className="mx-auto max-w-[1650px]">
        {/* HERO */}
        <div className="mb-10 overflow-hidden bg-slate-950 p-8 text-white md:p-12 lg:p-16">
          <div className="grid grid-cols-1 gap-12 xl:grid-cols-[1fr_420px] xl:items-end">
            <div>
              <span className="text-[13px] font-semibold uppercase tracking-[0.18em] text-blue-300">
                Order Tracking
              </span>

              <h1 className="mt-5 text-[42px] font-semibold leading-[1.05] tracking-tight md:text-[64px]">
                Track Your
                <br />
                Orders.
              </h1>

              <p className="mt-6 max-w-[720px] text-[16px] leading-8 text-slate-400">
                View your recent purchases, monitor shipment progress, and
                access order summaries anytime.
              </p>
            </div>

            {/* TRACK FORM */}
            <form
              onSubmit={handleQuickTrack}
              className="bg-white p-6 text-slate-900"
            >
              <p className="text-[12px] font-semibold uppercase tracking-[0.16em] text-blue-700">
                Quick Lookup
              </p>

              <h2 className="mt-2 text-[30px] font-semibold tracking-tight">
                Find Orders
              </h2>

              <div className="mt-6">
                <label className="mb-2 block text-[12px] font-semibold uppercase tracking-[0.16em] text-slate-500">
                  Registered Email
                </label>

                <div className="relative">
                  <input
                    required
                    type="email"
                    placeholder="email@example.com"
                    value={trackEmail}
                    onChange={(e) =>
                      setTrackEmail(e.target.value)
                    }
                    className="h-14 w-full border border-slate-200 bg-[#f8fafc] px-5 pr-14 text-[14px] font-medium outline-none transition focus:border-blue-700 focus:bg-white"
                  />

                  <button
                    disabled={isTrackLoading}
                    className="absolute right-2 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center bg-slate-950 text-white transition hover:bg-blue-700 disabled:opacity-60"
                  >
                    <Search size={18} />
                  </button>
                </div>
              </div>

              {error && (
                <div className="mt-4 border border-red-100 bg-red-50 px-4 py-3 text-[13px] font-medium text-red-600">
                  {error}
                </div>
              )}
            </form>
          </div>
        </div>

        {/* MAIN */}
        <div className="overflow-hidden bg-white shadow-[0_18px_55px_rgba(15,23,42,0.06)]">
          {/* HEADER */}
          <div className="flex flex-col gap-5 border-b border-slate-100 px-6 py-8 md:flex-row md:items-center md:justify-between md:px-10">
            <div className="flex items-center gap-5">
              <div className="flex h-14 w-14 items-center justify-center bg-blue-50 text-blue-700">
                <Package size={26} />
              </div>

              <div>
                <h2 className="text-[32px] font-semibold tracking-tight text-slate-950">
                  Order History
                </h2>

                <p className="mt-1 text-[12px] font-semibold uppercase tracking-[0.16em] text-slate-400">
                  {orders.length} Order
                  {orders.length !== 1 ? "s" : ""} Found
                </p>
              </div>
            </div>

            {orders.length > 0 && (
              <Link
                to="/shop"
                className="inline-flex h-12 items-center justify-center gap-3 bg-slate-950 px-6 text-[13px] font-medium text-white transition hover:bg-blue-700"
              >
                Shop More
                <ArrowRight size={16} />
              </Link>
            )}
          </div>

          {/* CONTENT */}
          <div className="p-6 md:p-10">
            {loading ? (
              <div className="flex min-h-[300px] items-center justify-center">
                <div className="space-y-4 text-center">
                  <div className="mx-auto h-14 w-14 animate-spin rounded-full border-2 border-slate-200 border-t-blue-700" />

                  <p className="text-[14px] font-medium text-slate-500">
                    Loading your orders...
                  </p>
                </div>
              </div>
            ) : orders.length === 0 ? (
              <div className="flex min-h-[500px] flex-col items-center justify-center text-center">
                <div className="mb-8 flex h-24 w-24 items-center justify-center bg-blue-50 text-blue-700">
                  <ShoppingBag size={40} />
                </div>

                <h2 className="text-[34px] font-semibold tracking-tight text-slate-950">
                  No Orders Found
                </h2>

                <p className="mt-4 max-w-[520px] text-[15px] leading-8 text-slate-600">
                  You haven't placed any orders yet. Start exploring our
                  premium printer collection.
                </p>

                <Link
                  to="/shop"
                  className="mt-8 flex h-14 items-center justify-center gap-3 bg-slate-950 px-8 text-[14px] font-medium text-white transition hover:bg-blue-700"
                >
                  Start Shopping
                  <ArrowRight size={17} />
                </Link>
              </div>
            ) : (
              <div className="space-y-5">
                {orders.map((order, index) => (
                  <motion.div
                    key={order.id}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.04 }}
                    className="border border-slate-100 bg-white p-6 transition hover:border-blue-100 hover:bg-[#fafcff]"
                  >
                    <div className="flex flex-col gap-8 xl:flex-row xl:items-center xl:justify-between">
                      {/* LEFT */}
                      <div className="flex flex-col gap-6 md:flex-row md:items-center">
                        <div className="flex h-[85px] w-[85px] flex-col items-center justify-center bg-[#f3f6fb]">
                          <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-400">
                            Order
                          </span>

                          <span className="mt-2 text-[22px] font-semibold leading-none text-slate-950">
                            #{order.id}
                          </span>
                        </div>

                        <div>
                          <p className="text-[12px] font-semibold uppercase tracking-[0.16em] text-slate-400">
                            Purchase Date
                          </p>

                          <h3 className="mt-2 text-[22px] font-semibold text-slate-950">
                            {new Date(
                              order.created_at
                            ).toLocaleDateString("en-US", {
                              day: "numeric",
                              month: "long",
                              year: "numeric",
                            })}
                          </h3>

                          <div
                            className={cn(
                              "mt-4 inline-flex items-center gap-2 border px-4 py-2 text-[12px] font-semibold uppercase tracking-[0.16em]",
                              getStatusColor(order.status)
                            )}
                          >
                            {getStatusIcon(order.status)}

                            {getStatus(order.status)}
                          </div>
                        </div>
                      </div>

                      {/* RIGHT */}
                      <div className="flex flex-col gap-6 border-t border-slate-100 pt-6 md:flex-row md:items-center md:justify-between md:border-0 md:pt-0 xl:min-w-[420px]">
                        <div>
                          <p className="text-[12px] font-semibold uppercase tracking-[0.16em] text-slate-400">
                            Total Amount
                          </p>

                          <h3 className="mt-2 text-[34px] font-semibold leading-none tracking-tight text-slate-950">
                            $
                            {parseFloat(
                              order.total_amount
                            ).toLocaleString()}
                          </h3>
                        </div>

                        <button
                          onClick={() =>
                            setSelectedOrder(order)
                          }
                          className="flex h-13 items-center justify-center gap-3 bg-slate-950 px-7 text-[13px] font-medium text-white transition hover:bg-blue-700"
                        >
                          View Details
                          <ChevronRight size={16} />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>

          {/* FOOTER */}
          <div className="flex flex-col gap-4 border-t border-slate-100 bg-[#fafafa] px-6 py-6 md:flex-row md:items-center md:justify-between md:px-10">
            <div className="flex items-center gap-3 text-slate-500">
              <HelpCircle size={16} />

              <span className="text-[13px] font-medium">
                Need help with an order?
              </span>
            </div>

            <Link
              to="/contact"
              className="text-[13px] font-semibold uppercase tracking-[0.16em] text-slate-950 transition hover:text-blue-700"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>

      {/* MODAL */}
      <AnimatePresence>
        {selectedOrder && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedOrder(null)}
              className="fixed inset-0 z-[500] bg-black/60 backdrop-blur-sm"
            />

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 30 }}
              className="fixed left-1/2 top-1/2 z-[510] w-[95%] max-w-[720px] -translate-x-1/2 -translate-y-1/2 overflow-hidden bg-white shadow-[0_25px_80px_rgba(15,23,42,0.18)]"
            >
              {/* TOP */}
              <div className="flex items-start justify-between border-b border-slate-100 px-8 py-8">
                <div>
                  <p className="text-[12px] font-semibold uppercase tracking-[0.16em] text-blue-700">
                    Transaction Summary
                  </p>

                  <h2 className="mt-2 text-[34px] font-semibold tracking-tight text-slate-950">
                    Order #{selectedOrder.id}
                  </h2>
                </div>

                <button
                  onClick={() => setSelectedOrder(null)}
                  className="flex h-11 w-11 items-center justify-center bg-slate-100 text-slate-500 transition hover:bg-slate-950 hover:text-white"
                >
                  <X size={19} />
                </button>
              </div>

              {/* CONTENT */}
              <div className="space-y-8 px-8 py-8">
                <div className="flex items-center justify-between bg-[#f8fafc] p-5">
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-400">
                      Order Status
                    </p>

                    <div
                      className={cn(
                        "mt-3 inline-flex items-center gap-2 border px-4 py-2 text-[12px] font-semibold uppercase tracking-[0.16em]",
                        getStatusColor(selectedOrder.status)
                      )}
                    >
                      {getStatusIcon(selectedOrder.status)}

                      {getStatus(selectedOrder.status)}
                    </div>
                  </div>

                  <div className="text-right">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-400">
                      Grand Total
                    </p>

                    <h3 className="mt-3 text-[34px] font-semibold leading-none tracking-tight text-blue-700">
                      $
                      {parseFloat(
                        selectedOrder.total_amount
                      ).toLocaleString()}
                    </h3>
                  </div>
                </div>

                {/* ITEMS */}
                <div>
                  <h3 className="mb-5 text-[12px] font-semibold uppercase tracking-[0.16em] text-slate-400">
                    Purchased Items
                  </h3>

                  <div className="space-y-4">
                    {selectedOrder.items?.map((item, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between border border-slate-100 p-5"
                      >
                        <div className="min-w-0 flex-1">
                          <h4 className="truncate text-[15px] font-medium text-slate-900">
                            {item.product_name}
                          </h4>

                          <p className="mt-2 text-[12px] font-semibold uppercase tracking-[0.16em] text-slate-400">
                            Quantity: {item.quantity}
                          </p>
                        </div>

                        <div className="pl-6 text-right">
                          <p className="text-[22px] font-semibold leading-none text-slate-950">
                            $
                            {(
                              parseFloat(item.price) *
                              item.quantity
                            ).toLocaleString()}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => setSelectedOrder(null)}
                  className="flex h-14 w-full items-center justify-center bg-slate-950 text-[14px] font-medium text-white transition hover:bg-blue-700"
                >
                  Close Summary
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}