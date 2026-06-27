"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Search, ShoppingCart } from "lucide-react";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import { RootState } from "@/store";
import { addToCart } from "@/store/features/cart/slice";
import { useLazySearchProductsQuery } from "@/store/features/product/api";
import { setSearchQuery } from "@/store/features/product/slice";
import { WorkspaceProduct } from "@/store/features/product/type";

export const DesktopSearch = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const savedQuery = useSelector((state: RootState) => state.product.searchQuery);
  const [query, setQuery] = useState(savedQuery);
  const [debouncedQuery, setDebouncedQuery] = useState(savedQuery);
  const [triggerSearch, { data, isFetching, isError, reset }] = useLazySearchProductsQuery();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Typewriter effect state
  const [placeholder, setPlaceholder] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const words = [
      "বইয়ের নাম দিয়ে খুঁজুন...",
      "লেখকের নাম দিয়ে খুঁজুন...",
      "পাবলিকেশন দিয়ে খুঁজুন...",
    ];
    const currentWord = words[wordIndex % words.length];

    const typingSpeed = isDeleting ? 30 : 60;
    let timer: ReturnType<typeof setTimeout>;

    if (!isDeleting && placeholder === currentWord) {
      timer = setTimeout(() => setIsDeleting(true), 1000);
    } else if (isDeleting && placeholder === "") {
      timer = setTimeout(() => {
        setIsDeleting(false);
        setWordIndex((prev) => prev + 1);
      }, 0);
    } else {
      timer = setTimeout(() => {
        setPlaceholder(
          isDeleting
            ? currentWord.substring(0, placeholder.length - 1)
            : currentWord.substring(0, placeholder.length + 1)
        );
      }, typingSpeed);
    }

    return () => clearTimeout(timer);
  }, [placeholder, isDeleting, wordIndex]);

  useEffect(() => {
    const timer = setTimeout(() => {
      const trimmedQuery = query.trim();
      setDebouncedQuery(trimmedQuery);
      dispatch(setSearchQuery(trimmedQuery));
    }, 500);

    return () => clearTimeout(timer);
  }, [dispatch, query]);

  useEffect(() => {
    if (debouncedQuery.length >= 2) {
      triggerSearch({ q: debouncedQuery, limit: 8 });
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  }, [debouncedQuery, triggerSearch]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const results = data?.data?.items ?? [];

  const handleAddToCart = (product: WorkspaceProduct) => {
    const isAlreadyInCart = cartItems.some((item) => item._id === product._id);

    if (isAlreadyInCart) {
      toast.info("এই বইটি ইতোমধ্যেই কার্টে আছে!", {
        position: "bottom-right",
        style: {
          background: "#3B82F6",
          color: "#fff",
          fontWeight: "bold",
        },
      });
      return;
    }

    dispatch(
      addToCart({
        _id: product._id,
        product: {
          title: product.product.title,
          author: product.product.author,
        },
        photo: product.photo || "/images/samplebook.jpg",
        pricing: product.pricing,
      })
    );

    toast.success(`${product.product.title} কার্টে যোগ হয়েছে!`, {
      position: "bottom-right",
      style: {
        background: "#2e7d32",
        color: "#fff",
        fontWeight: "bold",
      },
    });
  };

  return (
    <div className="relative w-full max-w-[250px] xl:max-w-[300px]" ref={dropdownRef}>
      <div className="flex items-center border border-gray-300 rounded-md px-4 py-2 bg-gray-50 focus-within:bg-white focus-within:ring-2 focus-within:ring-[#006680] transition-all">
        <Search size={20} className="text-gray-500 mr-2" color="#333333" />
        <input
          type="text"
          placeholder={placeholder}
          className="w-full outline-none text-sm bg-transparent text-slate-800 placeholder:text-gray-400"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            if (e.target.value.length >= 2) setIsOpen(true);
          }}
          onFocus={() => {
            if (query.length >= 2) setIsOpen(true);
          }}
        />
      </div>

      {/* Results Dropdown */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-md shadow-lg max-h-[60vh] overflow-y-auto z-50">
          {debouncedQuery.length >= 2 && isFetching && (
            <div className="p-4 text-center text-sm text-gray-500">
              খোঁজা হচ্ছে...
            </div>
          )}

          {debouncedQuery.length >= 2 && isError && (
            <div className="p-4 text-center text-sm text-red-500">
              সার্চ করতে সমস্যা হয়েছে
            </div>
          )}

          {debouncedQuery.length >= 2 && !isFetching && results.map((item) => (
            <div
              key={item._id}
              className="flex items-center border-b-[0.5px] justify-between gap-3 p-2 hover:bg-slate-50 border-gray-200 last:border-0"
            >
              <Link
                href={`/book/${item._id}`}
                className="flex min-w-0 flex-1 items-center gap-3"
                onClick={() => setIsOpen(false)}
              >
                <div className="relative h-14 w-10 shrink-0">
                  <Image
                    src={item.photo || "/images/samplebook.jpg"}
                    alt={item.product.title}
                    fill
                    className="object-cover rounded shadow-sm"
                  />
                </div>

                <div className="flex min-w-0 flex-col">
                  <span className="truncate text-sm font-semibold text-slate-800">
                    {item.product.title}
                  </span>
                  <span className="mt-0.5 text-xs text-slate-500">
                    {item.product.author || "Unknown Author"}
                  </span>
                  <span className="mt-1 text-sm font-bold text-orange-600">
                    {item.pricing.currency || "৳"}
                    {item.pricing.discountPrice ?? item.pricing.originalPrice}
                  </span>
                </div>
              </Link>

              <button
                type="button"
                className="bg-[#006680] cursor-pointer hover:bg-[#004d61] text-white px-2 py-1.5 text-xs font-medium rounded-md shadow-sm"
                onClick={() => handleAddToCart(item)}
              >
                <div className="flex items-center gap-1">
                  <ShoppingCart size={14} /> Add
                </div>
              </button>
            </div>
          ))}

          {debouncedQuery.length >= 2 && !isFetching && results.length === 0 && !isError && (
            <div className="p-4 text-center text-sm text-gray-500">
              <div className="w-fit mx-auto mb-2">
                <Image src={'/images/no-search-found.png'} alt="No Result" width={60} height={60} className="opacity-50"></Image>
              </div>
              <strong>দুঃখিত, কোনো ফলাফল পাওয়া যায়নি।</strong>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
