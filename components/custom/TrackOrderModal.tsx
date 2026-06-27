"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useLazyGetOrderByIdQuery } from "@/store/features/order/api";
import { OrderItem } from "@/types";
import { t } from "i18next";
import { Info, Loader2, Search } from "lucide-react";

export const TrackOrderModal = ({
  currentStep = 1,
}: {
  currentStep?: number;
}) => {
  const [open, setOpen] = useState(false);
  const [trackingNumber, setTrackingNumber] = useState("");
  const [submittedTrackingNumber, setSubmittedTrackingNumber] = useState("");
  const [triggerGetOrder, { data, isFetching, isError, reset }] =
    useLazyGetOrderByIdQuery();

  const steps = [
    { id: 0, icon: "📦", label: "Pending" },
    { id: 1, icon: "📥", label: "Confirmed" },
    { id: 2, icon: "🚚", label: "Shipped" },
    { id: 3, icon: "📍", label: "Delivered" },
  ];

  const order = data?.data;
  const statusToStep = useMemo<Record<string, number>>(
    () => ({
      pending: 0,
      confirmed: 1,
      processing: 1,
      shipped: 2,
      delivered: 3,
      cancelled: 0,
      returned: 0,
    }),
    [],
  );
  const activeStep =
    order?.orderStatus && order.orderStatus in statusToStep
      ? statusToStep[order.orderStatus]
      : currentStep;

  useEffect(() => {
    if (!open) {
      setTrackingNumber("");
      setSubmittedTrackingNumber("");
      reset();
    }
  }, [open, reset]);

  const handleTrackOrder = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trimmedTrackingNumber = trackingNumber.trim();

    if (!trimmedTrackingNumber) {
      return;
    }

    setSubmittedTrackingNumber(trimmedTrackingNumber);
    triggerGetOrder(trimmedTrackingNumber);
  };

  const orderItemsCount =
    order?.items?.reduce(
      (total: number, item: OrderItem) => total + item.quantity,
      0,
    ) ?? 0;
  const customerName = order
    ? `${order.shippingAddress.firstName} ${order.shippingAddress.lastName}`
    : "";
  const deliveryAddress = order
    ? `${order.shippingAddress.streetAddress}${order.shippingAddress.apartment
      ? `, ${order.shippingAddress.apartment}`
      : ""
    }, ${order.shippingAddress.thana}, ${order.shippingAddress.district}, ${order.shippingAddress.city
    }, ${order.shippingAddress.country} - ${order.shippingAddress.zipCode}`
    : "";
  const createdAt = order?.createdAt
    ? new Date(order.createdAt).toLocaleString("en-BD", {
      day: "2-digit",
      month: "short",
      year: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    })
    : "-";

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <span className="text-sm text-[#333333] font-medium cursor-pointer hover:text-[#006680]">
          {t("NAVBAR_TOP.TRACK_ORDER")}
        </span>
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg mx-auto p-4 overflow-hidden">
        <DialogHeader>
          <DialogTitle className="text-gray-700">
            {t("NAVBAR_TOP.TRACK_ORDER")}
          </DialogTitle>
          <DialogDescription className="sr-only">
            আপনার অর্ডারের বর্তমান অবস্থা এবং ট্র্যাকিং বিস্তারিত
          </DialogDescription>
        </DialogHeader>
        <div className="max-w-xl mx-auto overflow-hidden font-sans mt-2">
          <form onSubmit={handleTrackOrder} className="space-y-3">
            <div className="rounded-xl border border-dashed border-[#006680] p-3">
              <label
                htmlFor="tracking-number"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                {t("TRACK_ORDER_INFO.TRACKING_NUMBER")}
              </label>
              <div className="flex gap-2">
                <input
                  id="tracking-number"
                  type="text"
                  value={trackingNumber}
                  onChange={(e) => setTrackingNumber(e.target.value)}
                  placeholder="ORD_1"
                  className="h-11 flex-1 rounded-md border border-gray-300 bg-white px-3 text-sm outline-none focus:border-[#006680]"
                />
                <button
                  type="submit"
                  disabled={isFetching || trackingNumber.trim().length === 0}
                  className="inline-flex h-11 items-center justify-center rounded-md bg-[#006680] px-4 text-sm font-medium text-white disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isFetching ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Search className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>
          </form>

          {!order && !isFetching && !isError && (
            <div className="rounded-xl bg-white p-4 text-center text-sm text-gray-500">
              {t("TRACK_ORDER_INFO.TRACK_ORDER")}
            </div>
          )}

          {isError && (
            <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
              {submittedTrackingNumber
                ? `Order "${submittedTrackingNumber}" khuje paoa jayনি।`
                : "Order track korte problem hocche."}
            </div>
          )}

          {order && (
            <div className="max-w-xl mx-auto overflow-hidden font-sans mt-4">
              <div className="p-2 flex justify-between items-start gap-4">
                <div className="space-y-6 relative">
                  <div className="absolute left-1 top-3 -bottom-4 w-px border-l-2 border-dotted border-[#006680]"></div>
                  <div className="flex items-center gap-3 relative">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#006680]"></div>
                    <p className="text-sm font-semibold text-gray-700">
                      {customerName}
                    </p>
                  </div>
                  <div className="flex items-center gap-3 relative">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#006680]"></div>
                    <p className="text-sm font-semibold text-gray-700">
                      {customerName}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2 bg-[#006680] px-3 py-1 rounded-full shadow-sm border border-[#006680]">
                  <span className="text-xs font-bold text-white uppercase">
                    {order.orderStatus}
                  </span>
                </div>
              </div>

              <div className="py-6 relative">
                <div className="flex justify-between items-center relative">
                  <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-200 -translate-y-1/2"></div>
                  <div
                    className="absolute top-1/2 left-0 h-1 bg-[#006680] -translate-y-1/2 transition-all duration-500 ease-in-out"
                    style={{
                      width: `${(activeStep / (steps.length - 1)) * 100}%`,
                    }}
                  ></div>

                  {steps.map((step) => (
                    <div
                      key={step.id}
                      className={`relative z-10 w-12 h-12 rounded-full flex items-center justify-center border-4 transition-colors duration-300 ${step.id <= activeStep
                        ? "bg-[#006680] border-gray-300 text-white shadow-md"
                        : "bg-white border-gray-200 text-gray-400"
                        }`}
                    >
                      <span className="text-xl">{step.icon}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-3 gap-1 py-6 border-t border-gray-200 bg-white">
                <div>
                  <p className="text-xs text-gray-700 mb-1">Order Number</p>
                  <p className="text-xs text-gray-400 break-words">
                    {order.orderNumber}
                  </p>
                </div>
                <div className="border-l border-gray-200 pl-4">
                  <p className="text-xs text-gray-700 mb-1">Placed Time</p>
                  <p className="text-xs text-gray-400">{createdAt}</p>
                </div>
                <div className="border-l border-gray-200 pl-4">
                  <p className="text-xs text-gray-700 mb-1">Total Items</p>
                  <p className="text-xs text-gray-400">
                    {orderItemsCount} items
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 py-4 border-t border-gray-200 bg-white">
                <div>
                  <p className="text-xs text-gray-700 mb-1">Phone</p>
                  <p className="text-xs text-gray-400">
                    {order.shippingAddress.phone}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-700 mb-1">Total Amount</p>
                  <p className="text-xs text-gray-400">
                    {order.pricing.totalAmount} BDT
                  </p>
                </div>
              </div>

              <div className="p-2 mb-6 bg-red-50 rounded-lg items-center border border-red-100 flex gap-2">
                <span className="text-red-500 font-bold text-lg">
                  <Info />
                </span>
                <p className="text-[11px] leading-relaxed text-gray-700">
                  <span className="font-bold text-red-500">Tracking note,</span>{" "}
                  order status update hote kichu shomoy lagte pare.
                </p>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
