"use client"
import axios from 'axios';
import { RotateCw } from 'lucide-react';
import Image from 'next/image';
import React, { useEffect, useState } from 'react'

interface ImageProps{
    imageLink: string
}
const ImageFetch: React.FC<ImageProps> = ({imageLink}) => {
    const [imageUrl, setImageUrl] = useState<string | undefined>(undefined);
    useEffect(() => {
        async function fetchMicrolinkImage(link: String) {
          try {
            const { data } = await axios.get(`https://api.microlink.io?url=${link}&screenshot=true`);
            setImageUrl(data?.data?.screenshot.url || "");
            console.log("data now", data.data.screenshot.url)
          } catch (error) {
            console.error('Error fetching image:', error);
          }
        }
    
        if (imageLink) {
            fetchMicrolinkImage(imageLink);
          }
      }, [imageLink]);
  return (
    <>
        {imageUrl ? (
        <Image src={imageUrl} alt="Website Image" width={180} height={150} />
      ) : (
        <div className='w-20 h-20'>
            <RotateCw className="my-2 size-10 animate-spin text-primary-500" />
        </div>
      )}
    </>
  )
}

export default ImageFetch