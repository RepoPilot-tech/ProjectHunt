"use client";
import axios from "axios";
import { XIcon, RotateCcw } from "lucide-react";
import React, { useEffect, useState } from "react";

import Loader from "../projectHunt/PopOverLoader";
import Mansorygrid from "../ui/mansory-grid";

// Global cache object (Persists even when component unmounts)
const spaceCache = {};

const SpacesDialog = ({ spaceName, spaceIdd, setPopOver, popOver }) => {
  const [spaceData, setSpacesData] = useState([]);
  const [loading, setLoading] = useState(false);

  console.log("Space id is this:", spaceIdd);
  console.log("Space Name is this:", spaceName);

  const fetchData = async (forceRefresh = false) => {
    // If data is already cached and no force refresh, use cached data
    if (spaceCache[spaceIdd] && !forceRefresh) {
      console.log("Using cached data for:", spaceName);
      setSpacesData(spaceCache[spaceIdd]);
      return;
    }

    setLoading(true);
    try {
      console.log("Fetching data...", spaceIdd);
      const res = await axios.get(`/api/space/spaceProjects?id=${spaceIdd}`);
      const projects = Array.isArray(res.data)
        ? res.data.map((item) => item.project)
        : [];
      console.log("Fetched projects for", spaceName, projects);

      // Cache the fetched data globally
      spaceCache[spaceIdd] = projects;
      setSpacesData(projects);
    } catch (error) {
      console.error("Error while fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (spaceIdd) {
      fetchData();
    }
  }, [spaceIdd]);

  return (
    <div className="size-full pt-8 pb-2 text-3xl flex flex-col gap-4 overflow-y-scroll text-white">
      <div className="px-8 flex justify-between items-center">
        <div>{spaceName}</div>

        <div className="flex gap-2">
          {/* Refresh Button */}
          <div
            onClick={() => fetchData(true)} // Force refresh
            className="p-2 cursor-pointer rounded-full flex items-center justify-center hover:bg-gray-800"
          >
            <RotateCcw size={24} />
          </div>

          {/* Close Button */}
          <div
            onClick={() => setPopOver(!popOver)}
            className="p-2 cursor-pointer rounded-full hover:bg-gray-800"
          >
            <XIcon size={24} />
          </div>
        </div>
      </div>

      {loading ? (
        <div className="text-[2vw] text-white font-semibold flex flex-col size-full items-center justify-center">
          <Loader />
          <h3 className="text-[2vw] opacity-20">Fetching Your Projects...</h3>
        </div>
      ) : spaceData.length > 0 ? (
        <div className="w-full h-fit overflow-y-scroll columns-2xs px-6">
          {spaceData.map((project, i) => (
            <div key={i} className="w-[25vw] mt-4 relative">
              <Mansorygrid
                name={project.name}
                website={project.websiteLink}
                builder={project.creatorName}
              />
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col size-full items-center justify-center">
          <img
            src="https://app.100xdevs.com/NoBookmark.svg"
            alt="No Bookmark image"
            className="w-[50vw] h-[50vh]"
          />
          <h1 className="text-lg text-center">
            Well.. You haven&apos;t saved anything in this space🌌 yet.... <br />
            💡When you find something you want to save for later, Click the ✅
            icon and it will appear here.
          </h1>
        </div>
      )}
    </div>
  );
};

export default SpacesDialog;
