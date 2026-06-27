"use client";
import Image from "next/image";

const Highlight = ({ highlightsBanners }: { highlightsBanners: any }) => {
  return (
    <div>
      {highlightsBanners?.[0]?.photo && (
        <Image
          src={highlightsBanners[0].photo}
          alt={highlightsBanners[0].name || "highlights Banner"}
          fill
        />
      )}
    </div>
  );
};

export default Highlight;
