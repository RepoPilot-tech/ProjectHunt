"use client"
// import { FollowerPointerCard } from "@/components/ui/following-pointer";
import Image from "next/image";
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { ArrowRight, CornerDownRight } from 'lucide-react'
import { useEffect, useState } from "react";
import axios from 'axios';
import image from '@/public/images/image.png';
import { Badge } from "./badge";
import Checkbox from "./checkbox";
import Link from "next/link";

const Cardd = ({name, creatorName, websiteLink, description}) => {
  const [save, setSave] = useState(false);
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState(image);
  const [isChecked, setIsChecked] = useState(false);
  const spaces = ['web3', 'web dev', 'job', 'AI', 'mobile', 'design'];
  useEffect(() => {
    async function fetchMicrolinkImage(websiteLink) {
      try {
        const { data } = await axios.get(`https://api.microlink.io?url=${websiteLink}`);
        setImageUrl(data.data.image.url || image);
        console.log("data now", data.data.image.url)
      } catch (error) {
        console.error('Error fetching image:', error);
        setImageUrl(image);
      }
    }

    fetchMicrolinkImage(websiteLink);
  }, [websiteLink]);

  async function SaveProject() {
    setLoading(true);
    console.log("its happenning")
    try {
      if(isChecked == false){
        const res = await axios.post("/api/save", {
        name, creatorName, websiteLink, description
      });
      console.log('Server Response:', res.data);
    } else {
      const res = await axios.delete("/api/delete", {
        data: { websiteLink }  // Pass the websiteLink to delete the project
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
      <div className="h-52 w-full border relative rounded-2xl dark:bg-white dark:text-black flex overflow-hidden pr-0 pl-6">
        <div className="z-20 h-full flex flex-col justify-between gap-3 py-6 w-full">
          <div className="flex flex-col gap-1">
          <h1 className="text-xl font-sans font-semibold">{name}</h1>
          <div className="flex gap-1 items-center">
          <CornerDownRight size={20} />
          <Badge className="w-fit mt-1">By {creatorName}</Badge>
          </div>
          </div>
          <Link href={websiteLink} target="_blank" className="flex gap-1 hover:gap-3 duration-200 ease-in-out items-center">Try Now <ArrowRight size={20} /></Link>
          {/* <h1>{description}</h1> */}
        </div>
        <div className="">
        <Checkbox spaces={spaces} isChecked={isChecked} onClick={SaveProject} />
        </div>
        <div className="rounded-tl-md overflow-hidden z-30 absolute hover:shadow-lg bottom-0 right-0">
        <Image src={imageUrl} alt="Example" width={250} height={250} />
        </div>
      </div>
      </>
  );
}

export default Cardd;
