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
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const twoDaysInMilliseconds = 2 * 24 * 60 * 60 * 1000;

    const checkCache = () => {
      const cachedData = localStorage.getItem("cachedProjects");
      if (cachedData) {
        const { data, timestamp } = JSON.parse(cachedData);
        if (Date.now() - timestamp < twoDaysInMilliseconds) {
          setProjects(data);
          return true;
        }
      }
      return false; 
    };

    const fetchData = async () => {
      try {
        const response = await axios.post("/api/randomProducts");
        const rawOutput = response.data.output.trim(); 

        // Extract JSON part using regex
        const jsonMatch = rawOutput.match(/```json\s*([\s\S]*?)\s*```/);
        const cleanOutput = jsonMatch ? jsonMatch[1] : rawOutput;
        const parsedProjects = JSON.parse(cleanOutput);

        setProjects(parsedProjects);

        // Cache the data in localStorage
        const cache = {
          data: parsedProjects,
          timestamp: Date.now(),
        };
        localStorage.setItem("cachedProjects", JSON.stringify(cache));
      } catch (error) {
        console.error("Error fetching or parsing data:", error);
      }
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
  );
}
