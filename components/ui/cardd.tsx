"use client"
// import { FollowerPointerCard } from "@/components/ui/following-pointer";
import Image from "next/image";
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { ArrowRight, CornerDownRight, RotateCw } from 'lucide-react'
import React, { useEffect, useState } from "react";
import axios from 'axios';
import image from '@/public/images/image.png';
import { Badge } from "./badge";
import Checkbox from "./checkbox";
import Link from "next/link";
import { DataContext } from "@/provider/spaceContext";
import { toast } from "sonner";
import Cookies from "js-cookie";


interface Card {
  name: String,
  creatorName: String,
  websiteLink: string,
  description?: String
}
const Cardd = ({name, creatorName, websiteLink, description}: Card) => {
  const [save, setSave] = useState(false);
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isChecked, setIsChecked] = useState(false);
  const [selectedSpaces, setSelectedSpaces] = useState<string[]>([])
  const [spacesData, setSpacesData] = React.useState([]);
    // const [loading, setLoading] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
  const context = React.useContext(DataContext);

  if(!context){
    throw new Error("DataInput must be used within a DataProvider");
  }
  const {data} = context;
  console.log("data", data);

  React.useEffect(() => {
    // console.log("calingg.....")
    try {
      async function fetchData() {
        const res = await axios.get("/api/space/fetchSpaces")
        setSpacesData(res.data.map(({id, name}) => ({id, name})));
      }
      fetchData();
    } catch (error) {
      toast.error("errro fetch spaces");
    }
  }, [])
  
  const handleSubmit = async () => {
    setLoading(true);
    setImageUrl(null);

    try {
      console.log("i am going to fetch images");
      const response = await fetch('/api/scrapePreview', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ website: websiteLink }),
      });

      if (response.ok) {
        const result = await response.json();
        setImageUrl(result.imageUrl); 
        console.log("this is image", result.imageUrl)
      } else {
        console.log('Error fetching preview');
      }
    } catch (error) {
      console.error('Error:', error);
      console.log('Error fetching preview');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const savedState = Cookies.get(`checked_${websiteLink}`);
    const savedSpaces = Cookies.get(`spaces_${websiteLink}`);
    if (savedState === "true") {
      setIsChecked(true);
    }

    if (savedSpaces) {
      setSelectedSpaces(JSON.parse(savedSpaces));
    }

    if (websiteLink) {
      handleSubmit(); 
    }
  }, [websiteLink]);


  async function SaveProject() {
    setLoading(true);
    // console.log("its happenning")
    try {
      if(isChecked == false){
        // console.log("here we are saving your project",name, creatorName, websiteLink, description, selectedSpaces)
        const res = await axios.post("/api/save", { 
        name, creatorName, websiteLink, description, selectedSpaces
      });
      // console.log('Server Response:', res.data);
      Cookies.set(`checked_${websiteLink}`, "true", { expires: 360 });
      Cookies.set(`spaces_${websiteLink}`, JSON.stringify(selectedSpaces), { expires: 360 });
      setIsChecked(true); 
      setSelectedSpaces([...selectedSpaces]);
    } else {
      const res = await axios.delete("/api/delete", {
        data: { websiteLink } 
    });
    Cookies.set(`checked_${websiteLink}`, "false", { expires: 360 });
    Cookies.remove(`spaces_${websiteLink}`);
      // console.log('Server Response:', res.data);
      setIsChecked(false)
      setSelectedSpaces([]);
    }
    } catch (error) {
      console.log("Error occurred while saving or deleting", error);
      toast.error("Project already saved in database");
    } finally {
      setLoading(false);
    }
    // console.log(isChecked);
  }

  return (
    <>
      <div className="h-52 max-w-[25vw] border relative rounded-2xl bg-gray-50 dark:bg-[#18181B] dark:text-white flex pr-0 pl-3">
        <div className="z-20 h-full flex flex-col justify-between gap-3 dark:bg-[#18181B] dark:text-white py-3 w-full">
          <div className="flex flex-col gap-1">
          <h1 className="text-xl font-sans font-semibold">{name}</h1>
          <div className="flex gap-1 items-center">
          <CornerDownRight size={20} />
          {/* {loading && "saving"} */}
          <Badge className="w-fit mt-1 bg-indigo-700 text-white hover:bg-indigo-600">By {creatorName}</Badge>
          </div>
          </div>

          <Link href={websiteLink} target="_blank" className="flex gap-1 hover:gap-3 duration-200 ease-in-out items-center">Try Now <ArrowRight size={20} /></Link>
          {/* <h1>{description}</h1> */}
        </div>
        <div className="">
        <Checkbox spaces={spacesData} isChecked={isChecked} onClick={SaveProject} loading={loading} setSelectedSpaces={setSelectedSpaces} selectedSpaces={selectedSpaces} />
        </div>
        <div className="rounded-tl-md overflow-hidden z-30 absolute w-[13vw] h-[13vh] hover:shadow-lg bottom-0 right-0">
          {imageUrl ? <img src={imageUrl} alt="Website Image" className="w-full h-full object-cover" /> : <div></div>}
        </div>
      </div>
      </>
  );
}

export default Cardd;
