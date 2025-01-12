"use client"
import React from 'react';

import { Cardd } from '../ui/cardd';

const ToolRecommendations = ({ recommendations }: any) => {
  // Check if recommendations is an object and extract the array
  const tools = Array.isArray(recommendations) ? recommendations : recommendations.answer || [];
  console.log("from recommendations", tools);

  return (
    <div>
      <h2>Recommended Tools</h2>
      <div className='flex flex-col gap-3 h-fit'>
        {tools.map((tool: any, index: number) => (
            <div key={index} className={`${index === tool.length - 1 ? 'col-span-2 p-8 border-2' : ''}`}>
            {/* <strong>{tool.name}</strong><br />
            Website: <a href={tool.websiteLink} target="_blank" rel="noopener noreferrer">{tool.websiteLink}</a><br />
            Creator: {tool.creatorName} */}
            <Cardd name={tool.name} creatorName={tool.creatorName} websiteLink={tool.websiteLink} description={tool.description} key={index} />
            </div>
        ))}
      </div>
    </div>
  );
};

export default ToolRecommendations;
