"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { X } from "lucide-react";

const images = ["/images/support_image1.jpg", "/images/support_image2.jpg"];

const WhatsAppButton = () => {
  const [showMessage, setShowMessage] = useState(true);
  const [currentImage, setCurrentImage] = useState<string>(images[0]);

  useEffect(() => {
    let prevIndex = -1;

    const getRandomIndex = () => {
      let newIndex;
      do {
        newIndex = Math.floor(Math.random() * images.length);
      } while (newIndex === prevIndex);

      prevIndex = newIndex;
      return newIndex;
    };

    const timeout = setTimeout(() => {
      setCurrentImage(images[getRandomIndex()]);
    }, 0);

    const interval = setInterval(() => {
      setCurrentImage(images[getRandomIndex()]);
    }, 60000);

    return () => {
      clearTimeout(timeout);
      clearInterval(interval);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [images]);

  // 🔹 Message show/hide logic
  useEffect(() => {
    // 👉 Show immediately on load
    setShowMessage(true);

    const hideInitial = setTimeout(() => {
      setShowMessage(false);
    }, 60000); // 1 min

    // 👉 তারপর প্রতি 5 মিনিট পর show
    const interval = setInterval(() => {
      setShowMessage(true);

      // 👉 1 মিনিট পরে hide
      setTimeout(() => {
        setShowMessage(false);
      }, 60000);
    }, 300000); // 5 min

    return () => {
      clearTimeout(hideInitial);
      clearInterval(interval);
    };
  }, []);

  const phoneNumber = "8801675940305";
  const message = encodeURIComponent(
    "Hello, I need help regarding your service.",
  );

  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;

  return (
    <div className="fixed bottom-6 right-4 flex items-end gap-3 z-50">
      {/* Message Bubble */}
      {showMessage && (
        <div className="relative bg-white text-gray-500 text-sm px-4 py-3 rounded-xl shadow-lg max-w-55">
          <button
            onClick={() => setShowMessage(false)}
            className="absolute -top-2 -left-2 bg-white rounded-full shadow p-1 hover:bg-gray-100"
          >
            <X size={14} />
          </button>
          স্যার, কিভাবে সহযোগিতা করতে পারি?
        </div>
      )}

      {/* Avatar + WhatsApp Link */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="relative"
      >
        <Image
          src={currentImage}
          alt="Support Agent"
          width={46}
          height={46}
          className="rounded-full object-cover shadow-lg"
        />

        {/* Online Indicator */}
        <span className="absolute bottom-9 right-0 flex h-3 w-3">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-500 opacity-75"></span>
          <span className="relative inline-flex h-3 w-3 rounded-full bg-green-500"></span>
        </span>
      </a>
    </div>
  );
};

export default WhatsAppButton;
