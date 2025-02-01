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
  const context = React.useContext(DataContext);

  if(!context){
    throw new Error("DataInput must be used within a DataProvider");
  }
  const {data} = context;
  console.log("data", data);

  React.useEffect(() => {
    console.log("calingg.....")
    try {
      async function fetchData() {
        const res = await axios.get("/api/space/fetchSpaces")
        console.log("rs from get", res.data.map(({id, name}) => ({id, name})));
        setSpacesData(res.data.map(({id, name}) => ({id, name})));
      }
      fetchData();
    } catch (error) {
      toast.error("errro fetch spaces");
    }
  }, [])
  console.log("project spaces", spacesData);

  useEffect(() => {
        async function fetchMicrolinkImage(link: string) {
          try {
            const data = await fetch(`https://api.apiflash.com/v1/urltoimage?access_key=8fa6095fa8b84108aa0865515accbb47&wait_until=page_loaded&url=${link}`)
            console.log(data);
            const imageUrl = data.url;
            setImageUrl(imageUrl);
            console.log("data now1", data.url)
          } catch (error) {
            console.error('Error fetching image:', error);
          }
        }
    
        if (websiteLink) {
            fetchMicrolinkImage(websiteLink);
          }
  }, [websiteLink]);

  async function SaveProject() {
    setLoading(true);
    console.log("its happenning")
    try {
      if(isChecked == false){
        console.log("here we are saving your project",name, creatorName, websiteLink, description, selectedSpaces)
        const res = await axios.post("/api/save", {
        name, creatorName, websiteLink, description, selectedSpaces
      });
      console.log('Server Response:', res.data);
    } else {
      const res = await axios.delete("/api/delete", {
        data: { websiteLink } 
    });
      console.log('Server Response:', res.data);
    }
      setIsChecked(!isChecked)
    } catch (error) {
      console.log("Error occurred while saving or deleting", error);
    } finally {
      setLoading(false);
    }
    console.log(isChecked);
  }

  return (
    <>
      <div className="h-52 max-w-[25vw] border relative rounded-2xl bg-gray-50 dark:bg-gray-50 dark:text-black flex pr-0 pl-3">
        <div className="z-20 h-full flex flex-col justify-between gap-3 bg-gray-50 py-3 w-full">
          <div className="flex flex-col gap-1">
          <h1 className="text-xl font-sans font-semibold">{name}</h1>
          <div className="flex gap-1 items-center">
          <CornerDownRight size={20} />
          {loading && "saving"}
          <Badge className="w-fit mt-1">By {creatorName}</Badge>
          </div>
          </div>

          <Link href={websiteLink} target="_blank" className="flex gap-1 hover:gap-3 duration-200 ease-in-out items-center">Try Now <ArrowRight size={20} /></Link>
          {/* <h1>{description}</h1> */}
        </div>
        <div className="">
        <Checkbox spaces={spacesData} isChecked={isChecked} onClick={SaveProject} loading={loading} setSelectedSpaces={setSelectedSpaces} selectedSpaces={selectedSpaces} />
        </div>
        <div className="rounded-tl-md overflow-hidden z-30 absolute w-[12vw] h-fit hover:shadow-lg bottom-0 right-0">
        {imageUrl ? (
        <img src={imageUrl} alt="Website Image" className="w-full h-full object-cover" />
        ) : (
        <div className='w-20 h-20'>
            <RotateCw className="my-2 size-10 animate-spin text-primary-500" />
        </div>
      )}
        </div>
      </div>
      </>
  );
}

export default Cardd;
