"use client";

import { Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import Image from "next/image";
import { toast } from "sonner";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store";
import { removeFromCart, addToCart, clearItemFromCart } from "@/store/features/cart/slice";
import { CartIcon } from "./CartIcon";
import { t } from "i18next";


export function CartDrawer() {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const subtotalAmount = useSelector((state: RootState) => state.cart.totalAmount);
  const totalQuantity = useSelector((state: RootState) => state.cart.totalQuantity);
  const dispatch = useDispatch();

  return (
    <Drawer direction="right">
      <DrawerTrigger asChild>
        <div className="relative hover:bg-transparent cursor-pointer">
          <ShoppingBag
            color="#333333"
            className="h-5 w-5 border-gray-50 text-gray-700"
          />
          {
            totalQuantity > 0 && (
              <span className="absolute -top-3.5 -right-3 flex h-5 w-5 items-center bg-red-500 text-white justify-center rounded-full text-[10px] font-bold">
                {totalQuantity}
              </span>
            )
          }
        </div>
      </DrawerTrigger>
      <DrawerContent className="h-full w-full sm:w-125 mt-0 rounded-none border-l custom-scrollbar">
        <DrawerHeader className="border-b border-gray-100 pb-4 text-left px-6">
          <DrawerTitle className="text-2xl font-bold flex items-center justify-between">
            {t("CART.YOUR_CART")}
            <DrawerClose asChild>
              <Button variant="ghost" size="icon" className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                <X size={20} className="text-gray-500" />
              </Button>
            </DrawerClose>
          </DrawerTitle>
          <DrawerDescription>
            {t("CART.REVIEW_ORDER")}
          </DrawerDescription>
        </DrawerHeader>

        <div className="flex-1 overflow-y-auto px-6 py-4 flex flex-col gap-6">
          {/* Cart Items List */}
          <div className="flex flex-col gap-4">
            {cartItems?.map((item) => (
              <div
                key={item._id}
                className="flex items-center gap-4 bg-white border-b pb-4 border-gray-100 group mb-2"
              >
                <div className="relative w-16 h-16 bg-gray-50 rounded-lg overflow-hidden shrink-0 border-gray-100">
                  <Image
                    src={item.photo || "/images/placeholder.png"} // fallback image
                    alt={item.product?.title || "Product Image"}
                    fill
                    className="object-contain"
                  />
                </div>
                <div className="flex flex-col grow">
                  <div className="flex justify-between items-start">
                    <h3 className="font-semibold text-md text-slate-800 line-clamp-2 pr-4 hover:text-[#006680] transition-colors cursor-pointer">
                      {item.product?.title}
                    </h3>
                    <button
                      onClick={() => {
                        dispatch(clearItemFromCart(item._id));
                        toast("এই বইটি কার্ট থেকে সরানো হয়েছে।", {
                          position: "bottom-right",
                          style: {
                            background: "#bb2124",
                            color: "#fff",
                            fontWeight: "bold",
                          },
                        })
                      }}
                      className="text-gray-300 hover:text-red-500 transition-colors p-1 rounded hover:bg-red-50"
                    >
                      <Trash2
                        size={16}
                        className="text-red-500 cursor-pointer"
                      />
                    </button>
                  </div>
                  <div className="mt-auto pt-3 flex items-center justify-between">
                    <span className="font-bold text-[#FF7A64]">
                      ৳ {(item.pricing?.discountPrice || item.pricing?.originalPrice || 0).toFixed(2)}
                    </span>
                    <div className="flex items-center border border-gray-200 rounded-xl text-sm bg-gray-50 h-8">
                      <button onClick={() => dispatch(removeFromCart(item._id))} className="px-3 h-full border-r border-gray-300 flex items-center justify-center text-gray-500 hover:text-[#006680] hover:bg-gray-100 transition-colors">
                        <Minus
                          size={14}
                          className="text-[#000205] cursor-pointer"
                        />
                      </button>
                      <span className="px-2 font-semibold text-[#000205] w-8 text-center">
                        {item.quantity}
                      </span>
                      <button onClick={() => dispatch(addToCart({ ...item, quantity: 1 }))} className="px-3 h-full border-l border-gray-300 flex items-center justify-center text-gray-500 hover:text-[#006680] hover:bg-gray-100 transition-colors">
                        <Plus
                          size={14}
                          className="text-[#000205] cursor-pointer"
                        />
                      </button>
                    </div>
                    {/* <div className="flex items-center border border-gray-200 rounded text-sm bg-gray-50 h-8">
                      <button
                        onClick={() => dispatch(removeFromCart(item._id))}
                        className="px-3 h-full flex items-center justify-center text-gray-500 hover:text-[#006680] hover:bg-gray-100 transition-colors"
                      >
                        -
                      </button>
                      <span className="px-2 font-semibold text-slate-700 w-8 text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => dispatch(addToCart({ ...item, quantity: 1 }))}
                        className="px-3 h-full flex items-center justify-center text-gray-500 hover:text-[#006680] hover:bg-gray-100 transition-colors"
                      >
                        +
                      </button>
                    </div> */}
                  </div>
                </div>
              </div>
            ))}
            {!cartItems.length && (
              <div className="flex flex-col items-center justify-center min-h-[60vh]">
                {/* <Image
                  src="/images/empty-cart.svg"
                  alt="Empty Cart"
                  width={200}
                  height={200}
                /> */}
                <CartIcon />
                <p className="text-center text-gray-500 mt-6 text-lg">
                  {t("CART.CART_IS_EMPTY")}
                </p>
              </div>
            )}
          </div>

          {/* Order Summary */}
          {cartItems.length > 0 && (
            <div className="mt-auto border border-gray-100 rounded-lg p-2 shadow-sm">
              <h3 className="font-bold text-slate-800 mb-4 pb-4 border-b border-gray-200">
                {t("CART.REVIEW_ORDER")}
              </h3>
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm text-slate-600">
                  <span>Subtotal</span>
                  <span className="font-semibold text-slate-800">
                    ৳ {subtotalAmount.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between text-sm text-slate-600">
                  <span>Shipping</span>
                  <span className="font-semibold text-green-600 text-xs bg-green-100 px-2 py-0.5 rounded">
                    100 Tk.
                  </span>
                </div>
                <div className="flex justify-between items-center border-t border-gray-200 pt-3 mt-3">
                  <span className="font-bold text-slate-800">Total</span>
                  <span className="text-xl font-bold text-[#FF7A64]">
                    ৳ {(subtotalAmount + 100).toFixed(2)}
                  </span>
                </div>
              </div>

              <div className="flex gap-2 mb-6 flex-wrap">
                <input
                  type="text"
                  placeholder="Coupon code"
                  className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#006680]"
                />
                <Button
                  variant="outline"
                  className="text-[#006680] border-[#006680] hover:bg-[#006680] hover:text-white"
                >
                  Apply
                </Button>
              </div>

              <DrawerClose asChild>
                <Link href="/checkout" className="w-full block">
                  <Button className="w-full bg-[#006680] hover:bg-[#004d61] text-white py-6 rounded-xl font-bold text-lg shadow-md hover:-translate-y-1 transition-all">
                    চেকআউট করুন
                  </Button>
                </Link>
              </DrawerClose>
            </div>
          )}
        </div>
      </DrawerContent>
    </Drawer>
  );
}
