"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";

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
        <DialogContent className="sm:max-w-2xl max-w-lg mx-auto p-0 overflow-hidden">
          <DialogTitle className="sr-only">Promotional Offer</DialogTitle>
          <div className="w-full h-[40vh] sm:h-[68vh] relative overflow-hidden rounded-lg">
            <Image
              src="/images/science-box-popup.webp"
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
