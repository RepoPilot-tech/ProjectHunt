"use client"
import React, { useState } from 'react';

import Cardd from '../ui/cardd';


const ToolRecommendations = ({ recommendations }: any) => {
  const tools = Array.isArray(recommendations) ? recommendations : recommendations.answer || [];
  // console.log("from recommendations", tools);

  return (
    <div>
      <h2 className='mb-3'>Recommended Tools</h2>
      <div className='grid grid-cols-2 gap-3 h-fit'>
        {tools.map((tool: any, index: number) => (
            <div key={index}>
              <Cardd name={tool.name} creatorName={tool.creatorName} websiteLink={tool.websiteLink} description={tool.description} key={index} />
            </div>
        ))}
      </div>
    </div>
  );
};

export default ToolRecommendations;
