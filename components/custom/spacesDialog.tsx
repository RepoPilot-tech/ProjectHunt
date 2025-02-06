"use client"
import { DialogDescription, DialogTitle } from '@radix-ui/react-dialog'
import { ExternalLink, Link } from 'lucide-react'
import React, { useEffect, useState } from 'react'

import { Button } from '../ui/button'
import { DialogHeader } from '../ui/dialog'
import Mansorygrid from '../ui/mansory-grid'
import axios from 'axios'



const SpacesDialog = ({details}) => {
    const [spaceData, setSpacesData] = useState([])
    const [kill, setKill] = useState(false)
    const [length, setLength] = useState(true);
    console.log("space name is this", details[1])
    const data = [
        {
            name: "Project A",
            website: "https://www.projecta.com",
            builder: "Alice Johnson",
            image: "http://localhost:3000/_next/image?url=https%3A%2F%2Fiad.microlink.io%2FFcNCdVtepVdvdA33F7HsQsDByjkMgTOMYd2J6TVXfmC5lc5ciXUjrrNFmPkoGQkqYuIIvk0s7D9Ji5tsUwnfwQ.png&w=256&q=75"
          },
          {
            name: "Project B",
            website: "https://www.projectb.com",
            builder: "Bob Smith"
          },
          {
            name: "Project C",
            website: "https://www.projectc.com",
            builder: "Charlie Davis",
            image: "http://localhost:3000/_next/image?url=https%3A%2F%2Fiad.microlink.io%2FFcNCdVtepVdvdA33F7HsQsDByjkMgTOMYd2J6TVXfmC5lc5ciXUjrrNFmPkoGQkqYuIIvk0s7D9Ji5tsUwnfwQ.png&w=256&q=75"
          },
          {
            name: "Project D",
            website: "https://www.projectd.com",
            builder: "Diana Green",
            image: "http://localhost:3000/_next/image?url=https%3A%2F%2Fiad.microlink.io%2FFcNCdVtepVdvdA33F7HsQsDByjkMgTOMYd2J6TVXfmC5lc5ciXUjrrNFmPkoGQkqYuIIvk0s7D9Ji5tsUwnfwQ.png&w=256&q=75"
          },
          {
            name: "Project E",
            website: "https://www.projecte.com",
            builder: "Evan Walker"
          },
          {
            name: "Project F",
            website: "https://www.projectf.com",
            builder: "Fayla Brown",
            image: "http://localhost:3000/_next/image?url=https%3A%2F%2Fiad.microlink.io%2FFcNCdVtepVdvdA33F7HsQsDByjkMgTOMYd2J6TVXfmC5lc5ciXUjrrNFmPkoGQkqYuIIvk0s7D9Ji5tsUwnfwQ.png&w=256&q=75"
          },
          {
            name: "Project G",
            website: "https://www.projectg.com",
            builder: "George Lee"
          },
          {
            name: "Project H",
            website: "https://www.projecth.com",
            builder: "Hannah Scott",
            image: "http://localhost:3000/_next/image?url=https%3A%2F%2Fiad.microlink.io%2FFcNCdVtepVdvdA33F7HsQsDByjkMgTOMYd2J6TVXfmC5lc5ciXUjrrNFmPkoGQkqYuIIvk0s7D9Ji5tsUwnfwQ.png&w=256&q=75"
          },
          {
            name: "Project I",
            website: "https://www.projecti.com",
            builder: "Ian Clark"
          },
          {
            name: "Project J",
            website: "https://www.projectj.com",
            builder: "Julia Moore"
          }
    ]


    // useEffect(() => {
    //   console.log("I am going")
    //     try {
    //       async function fetchData() {
    //         const res = await axios.get("/api/space/spaceProjects", id);
    //         console.log("i am here");
    //         console.log(res);
    //       }
    //       fetchData();
    //     } catch (error) {
    //      console.log("error when findng space project") 
    //     }
    //     // console.log("I am going")
    // }, [kill])


    const fetchData = async() => {
      try {
        // console.log("i am here");
        const res = await axios.get(`/api/space/spaceProjects?id=${details[1]}`);
        // console.log("mai aa gya",  res.data.map(item => item.project));
        setSpacesData(res.data.map(item => item.project));
      } catch (error) {
        console.log("error while fetching data", error)
        return new Response("An error occurred while fetching data", {
          status: 500,
        });
      }
    }

    useEffect(() => {     
        const fetch = async() => {
          try {
            console.log("Fetching data...");
            const res = await fetchData(); // Call the fetchData function
            console.log("Data from space dialog:", res);
          } catch (error) {
            console.log("Error from space dialog:", error);
          }
        }
        fetch();
  }, [details[1]])

    console.log("hum nhi sudhrene",spaceData);
  return (
    <div className='size-full pt-8 pb-2 text-3xl flex flex-col gap-4 overflow-y-scroll text-white'>
      {/* <Button onClick={fetch}>kill it</Button> */}
        <div className='px-8'>
            {details[0]} Icon
        </div>
        
      <div className="w-full h-fit overflow-y-scroll columns-2xs px-6">
        {spaceData.map((project, i) => (
          // ${project.image ? "min-h-[30vh]" : "min-h-[20vh]"}
            <div key={i} className={`w-[25vw] mt-4 ${length ? "min-h-[30vh]" : "min-h-[20vh]"} relative`}>
            <Mansorygrid name={project.name} website={project.websiteLink} builder={project.creatorName} image={project?.image} setLength={setLength} length={length} />
            </div>
        ))}
      </div>
    </div>
  )
}

export default SpacesDialog