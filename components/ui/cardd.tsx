// import { FollowerPointerCard } from "@/components/ui/following-pointer";
import Image from "next/image";
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { ArrowRight } from 'lucide-react'

export function Cardd({name, creatorName, websiteLink, description}) {
  return (
      <div className="flex gap-4 h-[15vw] rounded-lg bg-red-200">
        {/* <div className="h-[20vw]">
          <Image src={blogContent.image} fill alt="image" />
        </div> */}
        </div>
  );
}

const blogContent = {
  slug: "amazing-tailwindcss-grid-layouts",
  author: "Manu Arora",
  date: "28th March, 2023",
  title: "Amazing Tailwindcss Grid Layout Examples",
  description:
    "Grids are cool, but Tailwindcss grids are cooler. In this article, we will learn how to create amazing Grid layouts with Tailwindcs grid and React.",
  image: "https://particle.scitech.org.au/wp-content/uploads/2022/12/GettyImages-1203853320-scaled.jpg",
  authorAvatar: "https://t4.ftcdn.net/jpg/06/78/09/75/360_F_678097580_mgsNEISedI7fngOwIipYtEU0T6SN8qKv.jpg",
};

const TitleComponent = ({
  title,
  avatar,
}: {
  title: string;
  avatar: string;
}) => (
    <div className="flex space-x-2 items-center">
    <Image
      src={avatar}
      height="20"
      width="20"
      alt="thumbnail"
      className="rounded-full border-2 border-white"
    />
    <p>{title}</p>
  </div>
);
