"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { XIcon } from "lucide-react";

export const PromotionalModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const shown = sessionStorage.getItem("promoModalShown");
    if (!shown) {
      // eslint-disable-next-line
      setIsOpen(true);
    }
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    if (typeof window !== "undefined") {
      sessionStorage.setItem("promoModalShown", "true");
    }
  };

  return (
    <div className="px-4">
      <Dialog
        open={isOpen}
        onOpenChange={(open) => (open ? setIsOpen(true) : handleClose())}
      >
        <DialogContent
          showCloseButton={false}
          className="sm:max-w-2xl max-w-lg mx-auto p-0"
        >
          <DialogTitle className="sr-only">Promotional Offer</DialogTitle>

          <DialogClose asChild>
            <button
              type="button"
              className="absolute -top-5 -right-5 z-50 flex cursor-pointer h-10 w-10 items-center justify-center rounded-full border-2 border-red-500 bg-red-500 text-white shadow-lg shadow-red-500/30 transition-colors hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400"
              aria-label="Close promotional modal"
            >
              <XIcon className="w-5 h-5" aria-hidden="true" />
            </button>
          </DialogClose>

          <div className="w-full h-[40vh] sm:h-[60vh] relative overflow-hidden rounded-lg">
            <Image
              src="/images/popup.jpg"
              alt="Promotional Ad"
              fill
              className=""
            />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
