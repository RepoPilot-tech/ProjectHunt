"use client";

import { motion, useAnimationControls } from "framer-motion";
import { ArrowRight, CornerDownRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";

import { Badge } from "../ui/badge";
import Cardd from "../ui/cardd";
import ImageFetch from "../ui/ImageFetch";

interface Card {
  id: number;
  ToolName: string;
  description: string;
  CreatorName: string;
  WebsiteLink: string;
}

interface InfiniteCarouselProps {
  cards: Card[];
}

export function InfiniteCarousel({ cards }: InfiniteCarouselProps) {
  const row1Controls = useAnimationControls();
  const row2Controls = useAnimationControls();
  const [isPaused, setIsPaused] = useState(false);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const baseVelocity = 30;

  // Splitting cards into two rows
  const row1Cards = cards.slice(0, Math.ceil(cards.length / 2));
  const row2Cards = cards.slice(Math.ceil(cards.length / 2));

  // Duplicating cards for smooth scrolling
  const duplicatedRow1Cards = [...row1Cards, ...row1Cards, ...row1Cards];
  const duplicatedRow2Cards = [...row2Cards, ...row2Cards, ...row2Cards];

  useEffect(() => {
    if (!isPaused) {
      row1Controls.start({
        x: [0, -100 * row1Cards.length],
        transition: {
          x: {
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "loop",
            duration: baseVelocity,
            ease: "linear",
          },
        },
      });
      row2Controls.start({
        x: [-100 * row2Cards.length, 0],
        transition: {
          x: {
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "loop",
            duration: baseVelocity,
            ease: "linear",
          },
        },
      });
    } else {
      row1Controls.stop();
      row2Controls.stop();
    }
  }, [isPaused, row1Controls, row2Controls, row1Cards.length, row2Cards.length]);

  const handleMouseEnter = () => {
    setIsPaused(true);
  };

  const handleMouseLeave = (event: React.MouseEvent<HTMLDivElement>) => {
    const container = containerRef.current;
    if (container) {
      const { top, bottom } = container.getBoundingClientRect();
      if (event.clientY < top || event.clientY > bottom) {
        setIsPaused(false);
      }
    }
  };

  return (
    <div
      ref={containerRef}
      className="w-full mt-8 p-3 flex flex-col items-center justify-center overflow-hidden"
      onMouseLeave={handleMouseLeave}
    >
      {/* First Row */}
      <motion.div className="flex gap-4 mb-4" animate={row1Controls} onMouseEnter={handleMouseEnter}>
        {duplicatedRow1Cards.map((card, idx) => (
          <motion.div
            key={`row1-${idx}`}
            className="min-w-[20vw] h-[13vw] p-4 rounded-lg relative border dark:bg-[#18181B] dark:text-white flex flex-col justify-between cursor-pointer overflow-hidden"
            onHoverStart={() => setHoveredCard(idx)}
            onHoverEnd={() => setHoveredCard(null)}
            animate={{
              scale: hoveredCard === idx ? 1.05 : 1,
              zIndex: hoveredCard === idx ? 10 : 0,
            }}
            transition={{
              scale: {
                duration: 0.2,
                ease: "easeInOut",
              },
            }}
          >
            <div className="flex flex-col">
          <h1 className="text-xl font-sans font-semibold">{card.ToolName}</h1>
          <div className="flex gap-1 items-center">
          <CornerDownRight size={20} />
          <Badge className="max-w-[14vw] !rounded-md mt-1 flex flex-wrap text-xs bg-indigo-700 text-white hover:bg-indigo-600">{card.CreatorName}</Badge>
          </div>
          </div>
            {hoveredCard === idx && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.2 }}
                className=""
              >
                <Link href={card.WebsiteLink} target="_blank" className="flex gap-1 hover:gap-3 duration-200 ease-in-out items-center">Try Now <ArrowRight size={20} /></Link>
              </motion.div>
            )}
            <div className="rounded-tl-md overflow-hidden z-30 absolute hover:shadow-lg bottom-0 right-0">
                    <ImageFetch imageLink={card.WebsiteLink} />
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Second Row */}
      <motion.div className="flex gap-4" animate={row2Controls} onMouseEnter={handleMouseEnter}>
        {duplicatedRow2Cards.map((card, idx) => (
          <motion.div
            key={`row2-${idx}`}
            className="min-w-[20vw] h-[13vw] p-4 rounded-lg relative border dark:bg-[#18181B] dark:text-white  flex flex-col justify-between cursor-pointer overflow-hidden"
            onHoverStart={() => setHoveredCard(idx + duplicatedRow1Cards.length)}
            onHoverEnd={() => setHoveredCard(null)}
            animate={{
              scale: hoveredCard === idx + duplicatedRow1Cards.length ? 1.05 : 1,
              zIndex: hoveredCard === idx + duplicatedRow1Cards.length ? 10 : 0,
            }}
            transition={{
              scale: {
                duration: 0.2,
                ease: "easeInOut",
              },
            }}
          >
            <div className="flex flex-col">
          <h1 className="text-xl font-sans font-semibold">{card.ToolName}</h1>
          <div className="flex gap-1 items-center">
          <CornerDownRight size={20} />
          <Badge className="max-w-[14vw] !rounded-md mt-1 flex flex-wrap text-xs bg-indigo-700 text-white hover:bg-indigo-600">{card.CreatorName}</Badge>
          </div>
          </div>
            {hoveredCard === idx + duplicatedRow1Cards.length && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.2 }}
                className=""
              >
                <Link href={card.WebsiteLink} target="_blank" className="flex gap-1 hover:gap-3 duration-200 ease-in-out items-center">Try Now <ArrowRight size={20} /></Link>
              </motion.div>
            )}
            <div className="rounded-tl-md overflow-hidden z-30 absolute hover:shadow-lg bottom-0 right-0">
                    <ImageFetch imageLink={card.WebsiteLink} />
            </div>
          </motion.div>
        ))} 
      </motion.div>
    </div>
  );
}
