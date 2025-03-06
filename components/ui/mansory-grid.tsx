import React, { useEffect, useState } from "react";
import { WobbleCard } from "./wobble-card";
import { ArrowRight, CornerDownRightIcon } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

const imageCache: { [key: string]: string } = {};

interface MansorygridProps {
  name: string;
  website: string;
  builder: string;
}

const Mansorygrid = ({ name, website, builder }: MansorygridProps) => {
  const [loading, setLoading] = useState(false);
  const [previewImage, setPreviewImage] = useState("");

  const [boxColor] = useState(() => {
    const colors = [
      "bg-cyan-700",
      "bg-purple-700",
      "bg-sky-600",
      "bg-stone-400",
      "bg-slate-400",
      "bg-indigo-800",
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  });

  const fetchPreviewImage = async () => {
    // Check if image is already cached
    if (imageCache[website]) {
      console.log("Using cached image for:", website);
      setPreviewImage(imageCache[website]);
      return;
    }

    setLoading(true);
    setPreviewImage("");

    try {
      console.log("Fetching new preview image for:", website);
      const response = await fetch("/api/scrapePreview", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ website }),
      });

      if (response.ok) {
        const result = await response.json();
        imageCache[website] = result.imageUrl; // Cache the image globally
        setPreviewImage(result.imageUrl);
      } else {
        console.error("Error fetching preview image");
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (website) {
      fetchPreviewImage();
    }
  }, [website]);

  return (
    <WobbleCard
      containerClassName={"w-full"}
      className={`${previewImage ? "min-h-[25vh]" : "min-h-[20vh]"} ${boxColor} flex flex-col z-[30] justify-between`}
    >
      <div className="flex flex-col w-full !h-full">
        <h2 className="max-w-80 text-left text-balance text-base md:text-xl lg:text-2xl font-semibold tracking-[-0.015em] text-white">
          {name}
        </h2>
        <div className="flex gap-1 items-center">
          <CornerDownRightIcon />
          <h4 className="text-xs px-3 py-1 bg-gray-600 hover:bg-gray-700 cursor-pointer rounded-full mt-1">
            {builder}
          </h4>
        </div>
      </div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.2 }}
      >
        <Link
          href={website}
          target="_blank"
          className="flex gap-1 text-lg z-[40] cursor-pointer hover:gap-3 duration-200 ease-in-out items-center"
        >
          Try Now <ArrowRight size={20} />
        </Link>
      </motion.div>

      {previewImage && (
        <div className="absolute -right-1 -bottom-1 rounded-t-md w-[15vw] h-[16vh] overflow-hidden">
          <img
            src={previewImage}
            alt="Website Preview"
            className="object-cover w-full h-full"
          />
        </div>
      )}
    </WobbleCard>
  );
};

export default Mansorygrid;
