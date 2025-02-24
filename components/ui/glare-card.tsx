"use client"
import { cn } from "@/lib/utils";
import { useRef, useState } from "react";
import {motion} from 'framer-motion'

export const GlareCard = ({name, icon, num, onClick}) => {
  const [boxColor] = useState(() => {
    const colors = [
      "cyan",
      "purple",
      "sky",
      "stone",
      "teal",
      "slate",
      "indigo",
      "violet"
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  });
  return (
    // bg-linear-to-r from-gray-800 via-blue-700 to-gray-900
    <motion.div 
  onClick={onClick} 
  className={`relative w-full text-black bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-sky-300 to-sky-100 rounded-[2.5rem] p-4 transition-transform duration-400 ease-in-out hover:cursor-pointer hover:scale-[0.97] active:scale-[0.9]`}>
      <div className="flex flex-col justify-between gap-20 h-full transition-transform duration-400 ease-in-out hover:scale-[0.96]">
        <div className="flex justify-between">
          <span className="font-bold">{icon}</span>
          <p className="font-semibold capitalize">{name}</p>
        </div>
        <div className="flex justify-between items-end">
          <p className="font-semibold">Space</p>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height={32}
            viewBox="0 -960 960 960"
            width={32}
            className="transition-transform hover:cursor-grab duration-400 ease-in-out hover:scale-105"
          >
            <path d="M226-160q-28 0-47-19t-19-47q0-28 19-47t47-19q28 0 47 19t19 47q0 28-19 47t-47 19Zm254 0q-28 0-47-19t-19-47q0-28 19-47t47-19q28 0 47 19t19 47q0 28-19 47t-47 19Zm254 0q-28 0-47-19t-19-47q0-28 19-47t47-19q28 0 47 19t19 47q0 28-19 47t-47 19ZM226-414q-28 0-47-19t-19-47q0-28 19-47t47-19q28 0 47 19t19 47q0 28-19 47t-47 19Zm254 0q-28 0-47-19t-19-47q0-28 19-47t47-19q28 0 47 19t19 47q0 28-19 47t-47 19Zm254 0q-28 0-47-19t-19-47q0-28 19-47t47-19q28 0 47 19t19 47q0 28-19 47t-47 19ZM226-668q-28 0-47-19t-19-47q0-28 19-47t47-19q28 0 47 19t19 47q0 28-19 47t-47 19Zm254 0q-28 0-47-19t-19-47q0-28 19-47t47-19q28 0 47 19t19 47q0 28-19 47t-47 19Zm254 0q-28 0-47-19t-19-47q0-28 19-47t47-19q28 0 47 19t19 47q0 28-19 47t-47 19Z" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-0 grid place-items-center pointer-events-none">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height={48}
          viewBox="0 -960 960 960"
          width={48}
          className="w-16 h-16 transition-transform duration-400 ease-in-out hover:scale-105"
        >
          <path d="m393-165 279-335H492l36-286-253 366h154l-36 255Zm-73 85 40-280H160l360-520h80l-40 320h240L400-80h-80Zm153-395Z" />
        </svg>
      </div>
    </motion.div>
  );
};
