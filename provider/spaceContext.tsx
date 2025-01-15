"use client"
import axios from "axios";
import React, { createContext, useState, ReactNode } from "react";

type Space = {
    name: string;
    icon: string;
  };

  type DataContextType = {
    data: Space[];
    addData: (newSpace: Space) => void;
  };


export const DataContext = createContext<DataContextType | undefined>(undefined);

type DataProviderProps = {
  children: ReactNode;
};

// Provider Component
export const DataProvider: React.FC<DataProviderProps> = ({ children }) => {
  const [data, setData] = useState<string[]>([]); 

  const addData = async (newSpace: Space) => {
        console.log("Adding space...")
        console.log("from context", newSpace)
        try {
            const res = await axios.post("/api/space", newSpace);
          console.log('Server Response:', res.data);
          setData((prevData) => [...prevData, newSpace]);
        } catch (error) {
          console.error("Error occurred while saving or deleting space", error);
        }
      }

  return (
    <DataContext.Provider value={{ data, addData }}>
    {children}
  </DataContext.Provider>
  );
};
