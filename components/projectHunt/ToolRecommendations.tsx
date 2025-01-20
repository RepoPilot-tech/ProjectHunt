"use client"
import React, { useState } from 'react';

import Cardd from '../ui/cardd';
import Checkbox from '../ui/checkbox';
import Check from '../ui/check';


const ToolRecommendations = ({ recommendations }: any) => {
  const tools = Array.isArray(recommendations) ? recommendations : recommendations.answer || [];
  // console.log("from recommendations", tools);

  return (
    <div>
      <h2>Recommended Tools</h2>
      <div className='flex flex-col gap-3 h-fit'>
        {tools.map((tool: any, index: number) => (
            <div key={index} className={`${index === tool.length - 1 ? 'col-span-2 p-8 border-2' : ''}`}>
              <Cardd name={tool.name} creatorName={tool.creatorName} websiteLink={tool.websiteLink} description={tool.description} key={index} />
            </div>
        ))}
      </div>
    </div>
  );
};

export default ToolRecommendations;
