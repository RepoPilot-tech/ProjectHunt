"use client"
import axios from "axios";
import React, { createContext, useState, ReactNode } from "react";

type Space = {
    spaceName: string;
    spaceIcon: string;
  };

  type DataContextType = {
    data: Space[];
    addData: ({spaceName, spaceIcon}:Space) => void;
  };


export const DataContext = createContext<DataContextType | undefined>(undefined);

type DataProviderProps = {
  children: ReactNode;
};

export const DataProvider: React.FC<DataProviderProps> = ({ children }) => {
  const [data, setData] = useState<Space[]>([]); 

  const addData = async ({spaceName, spaceIcon}:Space) => {
        try {
          const res = await axios.post("/api/space/addSpace", {spaceName, spaceIcon});
          const newSpaces = await fetchSpaces();
          setData(newSpaces);
        } catch (error) {
          console.error("Error occurred while saving or deleting space", error);
        }
      }

      const fetchSpaces = async () => {
        try {
          const res = await axios.get("/api/space/fetchSpaces");
          console.log("context spaces fetch", res.data);
          return res.data;
        } catch (error) {
          console.error("Error fetching spaces", error);
          return [];
        }
      };

  return (
    <DataContext.Provider value={{ data, addData }}>
    {children}
  </DataContext.Provider>
  );
};
