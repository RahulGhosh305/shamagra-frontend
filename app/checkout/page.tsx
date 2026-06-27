"use client";

import { useState } from "react";
import { Footer } from "@/components/custom/Footer";
import { CustomBreadcrumb } from "@/components/custom/CustomBreadcrumb";
import { X } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { ShoppingCart } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { CreateOrderRequest } from "@/types";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store";
import { useCreateOrderMutation } from "@/store/features/order/api";
import { clearCart } from "@/store/features/cart/slice";
import Image from "next/image";

const Checkout = () => {
  const router = useRouter();
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [openDialog, setOpenDialog] = useState(false);
  const [orderPayload, setOrderPayload] = useState<CreateOrderRequest | null>(null);

  const cartItems = useSelector((state: RootState) => state.cart.items);
  const user = useSelector((state: RootState) => state.auth.user);
  const dispatch = useDispatch();
  const [createOrder, { isLoading: isCreatingOrder }] =
    useCreateOrderMutation();

  const initialValues = {
    firstName: "",
    lastName: "",
    companyName: "",
    country: "",
    district: "",
    thana: "",
    streetAddress: "",
    apartment: "",
    city: "",
    state: "",
    zipCode: "",
    phone: "",
    email: "",
    orderNotes: "",
    transactionId: "",
  };

  const validationSchema = Yup.object({
    firstName: Yup.string()
      .min(2, "First name must be at least 2 characters")
      .required("First name is required"),
    lastName: Yup.string()
      .min(2, "Last name must be at least 2 characters")
      .required("Last name is required"),
    companyName: Yup.string(),
    country: Yup.string().required("Country is required"),
    district: Yup.string().required("District is required"),
    thana: Yup.string().required("Thana/Area is required"),
    streetAddress: Yup.string()
      .min(5, "Street address must be at least 5 characters")
      .required("Street address is required"),
    apartment: Yup.string(),
    city: Yup.string()
      .min(2, "City must be at least 2 characters")
      .required("City is required"),
    state: Yup.string()
      .min(2, "State must be at least 2 characters")
      .required("State is required"),
    zipCode: Yup.string()
      .matches(/^\d{4,6}$/, "ZIP code must be 4-6 digits")
      .required("ZIP code is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    orderNotes: Yup.string(),
  });

  const handleSubmit = (
    values: typeof initialValues,
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void },
  ) => {
    if (!user) {
      toast.error("Please login to place an order", {
        position: "bottom-right",
        style: {
          background: "#bb2124",
          color: "#fff",
          fontWeight: "bold",
        },
      });
      setSubmitting(false);
      return;
    }

    if (cartItems.length === 0) {
      toast.error("Your cart is empty", {
        position: "bottom-right",
        style: {
          background: "#bb2124",
          color: "#fff",
          fontWeight: "bold",
        },
      },);
      setSubmitting(false);
      return;
    }

    const payload = {
      user: {
        _id: user._id,
        firstName: user.firstName || values.firstName,
        lastName: user.lastName || values.lastName,
        email: user.email || values.email,
        phone: user.phone || values.phone,
      },
      items: cartItems.map((item: any) => ({
        productId: item._id, // Assuming cart item _id is the product ID
        productTitle: item.product?.title || "",
        productCode: item.product?.productCode || "",
        quantity: item.quantity || 1,
        unitPrice: item.pricing?.discountPrice || item.pricing?.originalPrice || 0,
        subtotal: (item.pricing?.discountPrice || item.pricing?.originalPrice || 0) * (item.quantity || 1),
      })),

      shippingAddress: {
        firstName: values.firstName,
        lastName: values.lastName,
        companyName: values.companyName || null,
        streetAddress: values.streetAddress,
        apartment: values.apartment || null,
        city: values.city,
        district: values.district,
        thana: values.thana,
        country: values.country,
        state: values.state,
        zipCode: values.zipCode,
        phone: values.phone,
        email: values.email,
      },
      pricing: {
        subtotal: cartItems.reduce((acc: number, item: any) => acc + (item.pricing?.discountPrice || item.pricing?.originalPrice || 0) * (item.quantity || 1), 0),
        shippingCharge: 100, // Matching the UI
        taxAmount: 0,
        totalAmount: cartItems.reduce((acc: number, item: any) => acc + (item.pricing?.discountPrice || item.pricing?.originalPrice || 0) * (item.quantity || 1), 0) + 100,
      },
      payment: {
        method: paymentMethod,
        status: "pending" as const,
        transactionId: paymentMethod === "mobile" ? values.transactionId : null,
      },

      orderNotes: values.orderNotes || "Please deliver between 10 AM - 5 PM",
      orderStatus: "pending" as const,
    };

    setOrderPayload(payload as CreateOrderRequest);
    setOpenDialog(true);
    setSubmitting(false);
  };

  const subtotal = cartItems.reduce(
    (acc: number, item: any) =>
      acc +
      (item.pricing?.discountPrice || item.pricing?.originalPrice || 0) *
      (item.quantity || 1),
    0,
  );
  const total = subtotal + 100; // Adding 100 Tk shipping charge

  return (
    <section className="container mx-auto p-4 bg-white text-[#1A1A1A]">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, isValid, resetForm }) => (
          <Form>
            <div className="min-h-screen pb-12">
              <div className="mb-3">
                <CustomBreadcrumb
                  items={[
                    { label: "Home", href: "/" },
                    { label: "Checkout", href: "/checkout" },
                    { label: "Confirm Order" },
                  ]}
                />
              </div>
              <div className="mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Left Side: Billing Details */}
                <div className="lg:col-span-8 bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                  <h2 className="text-2xl font-bold text-slate-800 mb-6 border-b pb-4">
                    বিলিং তথ্য
                  </h2>

                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          First Name<span className="text-red-500">*</span>
                        </label>
                        <Field
                          type="text"
                          name="firstName"
                          placeholder="First Name"
                          className="w-full p-2.5 border border-gray-300 rounded focus:ring-2 focus:ring-gray-500 focus:outline-none"
                        />
                        <ErrorMessage
                          name="firstName"
                          component="div"
                          className="text-red-500 text-sm mt-1"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Last Name<span className="text-red-500">*</span>
                        </label>
                        <Field
                          type="text"
                          name="lastName"
                          placeholder="Last Name"
                          className="w-full p-2.5 border border-gray-300 rounded focus:ring-2 focus:ring-gray-500 focus:outline-none"
                        />
                        <ErrorMessage
                          name="lastName"
                          component="div"
                          className="text-red-500 text-sm mt-1"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Company Name (optional)
                      </label>
                      <Field
                        type="text"
                        name="companyName"
                        className="w-full p-2.5 border border-gray-300 rounded focus:ring-2 focus:ring-gray-500 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Country<span className="text-red-500">*</span>
                      </label>
                      <Field
                        as="select"
                        name="country"
                        className="w-full p-2.5 border border-gray-300 rounded focus:ring-2 focus:ring-gray-500 focus:outline-none bg-white"
                      >
                        <option value="">Select A Country</option>
                        <option value="Bangladesh">Bangladesh</option>
                        <option value="USA">USA</option>
                      </Field>
                      <ErrorMessage
                        name="country"
                        component="div"
                        className="text-red-500 text-sm mt-1"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        District<span className="text-red-500">*</span>
                      </label>
                      <Field
                        type="text"
                        name="district"
                        className="w-full p-2.5 border border-gray-300 rounded focus:ring-2 focus:ring-gray-500 focus:outline-none"
                      />
                      <ErrorMessage
                        name="district"
                        component="div"
                        className="text-red-500 text-sm mt-1"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Thana/Area<span className="text-red-500">*</span>
                      </label>
                      <Field
                        type="text"
                        name="thana"
                        className="w-full p-2.5 border border-gray-300 rounded focus:ring-2 focus:ring-gray-500 focus:outline-none"
                      />
                      <ErrorMessage
                        name="thana"
                        component="div"
                        className="text-red-500 text-sm mt-1"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Street Address<span className="text-red-500">*</span>
                      </label>
                      <Field
                        type="text"
                        name="streetAddress"
                        placeholder="House number and street name"
                        className="w-full p-2.5 border border-gray-300 rounded mb-3 focus:ring-2 focus:ring-gray-500 focus:outline-none"
                      />
                      <ErrorMessage
                        name="streetAddress"
                        component="div"
                        className="text-red-500 text-sm mt-1"
                      />

                      <Field
                        type="text"
                        name="apartment"
                        placeholder="Apartment, suite, unit, etc. (optional)"
                        className="w-full p-2.5 border border-gray-300 rounded focus:ring-2 focus:ring-gray-500 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Town / City<span className="text-red-500">*</span>
                      </label>
                      <Field
                        type="text"
                        name="city"
                        className="w-full p-2.5 border border-gray-300 rounded focus:ring-2 focus:ring-gray-500 focus:outline-none"
                      />
                      <ErrorMessage
                        name="city"
                        component="div"
                        className="text-red-500 text-sm mt-1"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        State / Division
                        <span className="text-red-500">*</span>
                      </label>
                      <Field
                        type="text"
                        name="state"
                        className="w-full p-2.5 border border-gray-300 rounded focus:ring-2 focus:ring-gray-500 focus:outline-none"
                      />
                      <ErrorMessage
                        name="state"
                        component="div"
                        className="text-red-500 text-sm mt-1"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        ZIP Code<span className="text-red-500">*</span>
                      </label>
                      <Field
                        type="text"
                        name="zipCode"
                        className="w-full p-2.5 border border-gray-300 rounded focus:ring-2 focus:ring-gray-500 focus:outline-none"
                      />
                      <ErrorMessage
                        name="zipCode"
                        component="div"
                        className="text-red-500 text-sm mt-1"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Phone
                      </label>
                      <Field
                        type="tel"
                        name="phone"
                        placeholder="Phone"
                        className="w-full p-2.5 border border-gray-300 rounded focus:ring-2 focus:ring-gray-500 focus:outline-none"
                      />
                      <ErrorMessage
                        name="phone"
                        component="div"
                        className="text-red-500 text-sm mt-1"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Email Address<span className="text-red-500">*</span>
                      </label>
                      <Field
                        type="email"
                        name="email"
                        placeholder="Email"
                        className="w-full p-2.5 border border-gray-300 rounded focus:ring-2 focus:ring-gray-500 focus:outline-none"
                      />
                      <ErrorMessage
                        name="email"
                        component="div"
                        className="text-red-500 text-sm mt-1"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-500 mb-1">
                        Order notes (optional)
                      </label>
                      <Field
                        as="textarea"
                        name="orderNotes"
                        rows={4}
                        placeholder="Notes about your order, e.g. special notes for delivery."
                        className="w-full p-2.5 border border-gray-300 rounded focus:ring-2 focus:ring-gray-500 focus:outline-none"
                      />
                    </div>
                  </div>
                </div>

                {/* Right Side: Order Summary & Payment (same as your current code) */}
                <div className="lg:col-span-4 space-y-6">
                  <div className="lg:col-span-4 space-y-6">
                    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                      <h2 className="text-lg font-bold text-slate-800 mb-6">
                        Our Order
                      </h2>

                      <div className="space-y-4 text-sm">
                        <div className="flex justify-between font-medium border-b pb-2">
                          <span>Product</span>
                          <span>Subtotal</span>
                        </div>

                        {cartItems?.map((item: typeof cartItems[0]) => (
                          <div
                            key={item._id}
                            className="flex justify-between text-gray-600"
                          >
                            <span>
                              {item.product?.title} x {item.quantity || 1}
                            </span>
                            <span>
                              ৳{" "}
                              {(
                                (item.pricing?.discountPrice ||
                                  item.pricing?.originalPrice ||
                                  0) * (item.quantity || 1)
                              ).toFixed(2)}
                            </span>
                          </div>
                        ))}

                        <div className="border-t pt-4 space-y-2">
                          <p className="font-semibold mb-2">Shipping</p>
                          <div className="space-y-2">
                            <label className="flex items-center justify-between cursor-pointer">
                              <span className="flex items-center">
                                Free Shipping
                              </span>
                              <span>৳ 0.00</span>
                            </label>
                            <label className="flex items-center justify-between cursor-pointer">
                              <span className="flex items-center">Local</span>
                              <span>৳ 15.00</span>
                            </label>
                            <label className="flex items-center justify-between cursor-pointer">
                              <span className="flex items-center">
                                Flat Rate
                              </span>
                              <span>৳ 10.00</span>
                            </label>
                          </div>
                        </div>

                        <div className="flex justify-between text-lg font-bold border-t pt-4 text-slate-800">
                          <span>Total</span>
                          <span className="text-orange-500">
                            ৳ {total.toFixed(2)}
                          </span>
                        </div>
                      </div>

                      {/* Payment Methods */}
                      <div className="mt-8 space-y-4">
                        <label className={`flex items-center justify-between px-3 py-2 border rounded cursor-pointer hover:bg-gray-50 transition-colors ${paymentMethod === "cod" ? "border-orange-200 bg-orange-50/30" : "border-gray-200"}`}>
                          <div className="flex items-center gap-3">
                            <Image src="/images/cod.svg" alt="Cash On Delivery" width={35} height={30}></Image>
                            <span className={`font-semibold ${paymentMethod === "cod" ? "text-orange-700" : "text-gray-700"}`}>
                              Cash On Delivery
                            </span>
                          </div>
                          <input
                            type="radio"
                            name="payment"
                            value="cod"
                            checked={paymentMethod === "cod"}
                            onChange={() => setPaymentMethod("cod")}
                            className="w-4 h-4 accent-orange-600 text-orange-600 focus:ring-orange-500"
                          />
                        </label>

                        <label className={`flex items-center justify-between px-3 py-2 border rounded cursor-pointer hover:bg-gray-50 transition-colors ${paymentMethod === "mobile" ? "border-orange-200 bg-orange-50/30" : "border-gray-200"}`}>
                          <div className="flex items-center gap-2">
                            <Image src="/images/mobile-banking.webp" alt="Mobile Banking" width={40} height={30}></Image>
                            <span className={`font-semibold ${paymentMethod === "mobile" ? "text-orange-700" : "text-gray-700"}`}>
                              Mobile Banking (Bkash, Nagad, Rocket)
                            </span>
                          </div>
                          <input
                            type="radio"
                            name="payment"
                            value="mobile"
                            checked={paymentMethod === "mobile"}
                            onChange={() => setPaymentMethod("mobile")}
                            className="w-4 h-4 accent-orange-600 text-orange-600 focus:ring-orange-500"
                          />
                        </label>

                        {paymentMethod === "mobile" && (
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Transaction ID
                              <span className="text-red-500">*</span>
                            </label>

                            <Field
                              type="text"
                              name="transactionId"
                              placeholder="Enter Transaction ID"
                              className="w-full p-2.5 border border-gray-300 rounded focus:ring-2 focus:ring-gray-500 focus:outline-none"
                            />

                            <ErrorMessage
                              name="transactionId"
                              component="div"
                              className="text-red-500 text-sm mt-1"
                            />
                          </div>
                        )}

                        <div className="p-3 border rounded bg-gray-50">
                          <label className="flex items-center justify-between font-semibold text-gray-700 cursor-pointer">
                            <div className="flex items-center gap-3">
                              <Image src="/images/online-payment.svg" alt="Direct Bank Transfer" width={35} height={30}></Image>
                              <span className={`font-semibold ${paymentMethod === "bank" ? "text-orange-700" : "text-gray-700"}`}>
                                Direct Bank Transfer
                              </span>
                            </div>
                            <input
                              type="radio"
                              name="payment"
                              disabled
                              className="w-4 h-4"
                            />
                          </label>
                          <p className="text-xs text-gray-500 mt-2 leading-relaxed">
                            Make your payment directly into our bank account.
                            Please use your Order ID as the payment reference.
                          </p>
                        </div>
                        <p className="text-xs text-gray-500 mt-2 leading-relaxed">
                          With Bank System on Proccess.
                          <span className="text-red-500">*</span>
                        </p>
                        <button
                          type="submit"
                          className="w-full flex items-center justify-center gap-2 mt-10 bg-[#006680] hover:bg-[#004d61] text-white py-4 rounded-xl font-bold text-lg cursor-pointer shadow-xl hover:-translate-y-1 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                          disabled={isSubmitting}
                        >
                          <ShoppingCart className="h-6 w-6" />
                          {isSubmitting
                            ? "Validating..."
                            : "অর্ডার নিশ্চিত করুন"}
                        </button>
                      </div>

                      {isValid && (
                        <AlertDialog
                          open={isValid ? openDialog : false}
                          onOpenChange={setOpenDialog}
                        >
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle className="flex gap-2 items-center">
                                <ShoppingCart className="h-5 w-5 border-gray-50" />
                                আপনার অর্ডারটি যাচাই করে নিন
                              </AlertDialogTitle>
                              <AlertDialogDescription asChild>
                                <div className="mt-4 text-left w-full">
                                  <div className="max-h-[40vh] overflow-y-auto pr-2 space-y-3">
                                    {cartItems.map((item: typeof cartItems[0]) => (
                                      <div
                                        key={item._id}
                                        className="flex justify-between text-sm text-slate-600 border-b border-slate-100 last:border-0 pb-2"
                                      >
                                        <span className="flex gap-2">
                                          {item.product?.title}{" "}
                                          <X size={16} />
                                          <span className="text-sm">
                                            {item.quantity || 1}
                                          </span>
                                        </span>
                                        <span className="font-medium text-slate-800">
                                          ৳{" "}
                                          {(
                                            (item.pricing?.discountPrice ||
                                              item.pricing?.originalPrice ||
                                              0) * (item.quantity || 1)
                                          ).toFixed(2)}
                                        </span>
                                      </div>
                                    ))}
                                  </div>
                                  <div className="flex justify-between items-center mt-4 pt-4 border-t border-slate-200">
                                    <span className="font-bold text-slate-800">
                                      Total Payable:
                                    </span>
                                    <span className="font-bold text-lg text-orange-500">
                                      ৳ {total.toFixed(2)}
                                    </span>
                                  </div>
                                </div>
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel className="cursor-pointer">Cancel</AlertDialogCancel>
                              <AlertDialogAction
                                className="bg-[#006680]! hover:bg-[#004d61]! text-white cursor-pointer"
                                disabled={isCreatingOrder}
                                onClick={async () => {
                                  if (!orderPayload) return;
                                  try {
                                    const orderResData: any = await createOrder(orderPayload).unwrap();

                                    dispatch(clearCart());
                                    setOpenDialog(false);
                                    resetForm();
                                    toast.success("অর্ডার সফল হয়েছে!", {
                                      position: "bottom-right",
                                      style: {
                                        background: "#2e7d32",
                                        color: "#fff",
                                        fontWeight: "bold",
                                      },
                                    });

                                    // Generate Payslip using Native Browser Print to support Bengali and modern CSS
                                    try {
                                      const printContent = `
                                        <html>
                                          <head>
                                            <title>Invoice - Boichitryo</title>
                                            <style>
                                              @import url('https://fonts.googleapis.com/css2?family=Hind+Siliguri:wght@400;600;700&display=swap');
                                              @media print { @page { margin: 0; } body { margin: 1cm auto; } } body { font-family: 'Hind Siliguri', sans-serif; padding: 40px; color: #333; max-width: 800px; margin: auto; }
                                              .header { text-align: center; border-bottom: 2px solid #006680; padding-bottom: 20px; margin-bottom: 20px; }
                                              .header h1 { color: #006680; margin: 0; font-size: 28px; }
                                              .header p { margin: 5px 0 0; color: #666; }
                                              .info { display: flex; justify-content: space-between; margin-bottom: 30px; font-size: 15px; }
                                              .info p { margin: 5px 0; }
                                              table { width: 100%; border-collapse: collapse; margin-top: 20px; font-size: 15px; }
                                              th, td { border: 1px solid #ddd; padding: 12px; }
                                              th { background: #006680; color: white; text-align: left; }
                                              .text-center { text-align: center; }
                                              .text-right { text-align: right; }
                                              tfoot tr { background: #f4f4f4; font-weight: bold; }
                                            </style>
                                          </head>
                                          <body>
                                            <div class="header" style="position: relative;">
                                              <h1>Invoice - Boichitryo</h1><div style="position: absolute; top: 0; right: 0; font-size: 14px; color: #666; font-weight: bold; text-align: right;">${new Date().toLocaleString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' })}</div>
                                              <p>অর্ডার ইনভয়েস / Order Invoice</p>
                                            </div>
                                            
                                            <div class="info">
                                              <div>
                                                <p><strong>কাস্টমার:</strong> ${orderPayload.shippingAddress.firstName} ${orderPayload.shippingAddress.lastName}</p>
                                                <p><strong>ফোন:</strong> ${orderPayload.shippingAddress.phone}</p>
                                              </div>
                                              <div class="text-right">
                                                <p><strong>অর্ডার আইডি:</strong> #${orderResData?.data?.orderNumber || 'N/A'}</p>
                                                
                                                <p><strong>পেমেন্ট:</strong> ${orderPayload.payment.method === 'cod' ? 'ক্যাশ অন ডেলিভারি' : 'মোবাইল ব্যাংকিং'}</p>
                                              </div>
                                            </div>
                                            
                                            <table>
                                              <thead>
                                                <tr>
                                                  <th>বইয়ের নাম</th>
                                                  <th class="text-center">পরিমাণ</th>
                                                  <th class="text-right">মূল্য</th>
                                                </tr>
                                              </thead>
                                              <tbody>
                                                ${cartItems.map((item: any) => `
                                                  <tr>
                                                    <td>${item.product?.title || "Book"}</td>
                                                    <td class="text-center">${item.quantity || 1}</td>
                                                    <td class="text-right">৳ ${((item.pricing?.discountPrice || item.pricing?.originalPrice || 0) * (item.quantity || 1))}</td>
                                                  </tr>
                                                `).join('')}
                                              </tbody>
                                              <tfoot>
                                                <tr>
                                                  <td colspan="2" class="text-right">সর্বমোট:</td>
                                                  <td class="text-right">৳ ${total.toFixed(2)}</td>
                                                </tr>
                                              </tfoot>
                                            </table>
                                            
                                            <div style="margin-top: 50px; text-align: center; color: #666; font-size: 14px;">
                                              <p>আমাদের সাথে থাকার জন্য ধন্যবাদ!</p>
                                            </div>
                                          </body>
                                        </html>
                                      `;

                                      const iframe = document.createElement('iframe');
                                      iframe.style.display = 'none';
                                      document.body.appendChild(iframe);
                                      const iframeDoc = iframe.contentWindow?.document;

                                      if (iframeDoc) {
                                        iframeDoc.write(printContent);
                                        iframeDoc.close();
                                        // Wait for fonts to load before printing
                                        iframe.onload = () => {
                                          iframe.contentWindow?.focus();
                                          iframe.contentWindow?.print();
                                          setTimeout(() => {
                                            if (document.body.contains(iframe)) {
                                              document.body.removeChild(iframe);
                                            }
                                          }, 2000); // Remove iframe after printing
                                        };
                                      }
                                    } catch (printError) {
                                      console.error("Failed to generate print invoice", printError);
                                    }

                                    router.push("/");
                                  } catch (error) {
                                    let errorMessage = "Order failed";
                                    if (error && typeof error === "object" && "data" in error) {
                                      const errorData = (error as Record<string, unknown>).data;
                                      if (errorData && typeof errorData === "object" && "message" in errorData) {
                                        errorMessage = String((errorData as Record<string, unknown>).message);
                                      }
                                    }
                                    toast.error(
                                      errorMessage,
                                      {
                                        position: "bottom-right",
                                        style: {
                                          background: "#bb2124",
                                          color: "#fff",
                                          fontWeight: "bold",
                                        },
                                      },
                                    );
                                  }
                                }}
                              >
                                {isCreatingOrder
                                  ? "Processing..."
                                  : "অর্ডার সম্পন্ন করুন"}
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Form>
        )}
      </Formik>
      <Footer />
    </section>
  );
};

export default Checkout;
