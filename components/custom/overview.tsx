"use client"
import axios from 'axios';
import { Suspense, useEffect, useState } from 'react';

import { InfiniteCarousel } from "../projectHunt/InfiniteCarousel";
import { CardSkeleton } from "../ui/CardSkeleton";

interface Card {
  id: Number,
  title: String,
  description: String
}

export const Overview = () => {
  const [projects, setProjects] = useState([])

  useEffect(() => {

    const fetchData = async () => {
      try {
        const response = await axios.post("/api/randomProducts");
        const rawOutput = response.data.output; 

        const cleanOutput = rawOutput.replace(/```/g, "");
        const parsedProjects = JSON.parse(cleanOutput);
        const cache = {
          data: parsedProjects,
          timestamp: Date.now(),
        };
        localStorage.setItem("cachedProjects", JSON.stringify(cache));
        setProjects(parsedProjects);
        // console.log("Parsed Projects:", parsedProjects);
      } catch (error) {
        console.error("Error fetching or parsing data:", error);
      }
    };
    
    const checkCache = () => {
      const cachedData = localStorage.getItem("cachedProjects");
      const twoDaysInMilliseconds = 2 * 24 * 60 * 60 * 1000;

      if (cachedData) {
        const { data, timestamp } = JSON.parse(cachedData);
        const now = Date.now();

        if (now - timestamp < twoDaysInMilliseconds) {
          // console.log("Using Cached Projects:", data);
          setProjects(data);
          return true;
        }
      }
      return false; 
    };

    if (!checkCache()) {
      fetchData();
    }
  }, []);

  return (
    <Suspense fallback={<SkeletonCarousel />}>
        <InfiniteCarousel cards={projects} />
      </Suspense>  
  );
};

function SkeletonCarousel() {
  return (
    <div className="w-full flex flex-col gap-4">
      <div className="flex gap-4">
        {[...Array(5)].map((_, i) => (
          <CardSkeleton key={`skeleton-1-${i}`} />
        ))}
      </div>
      <div className="flex gap-4">
        {[...Array(5)].map((_, i) => (
          <CardSkeleton key={`skeleton-2-${i}`} />
        ))}
      </div>
    </div>
  )
}