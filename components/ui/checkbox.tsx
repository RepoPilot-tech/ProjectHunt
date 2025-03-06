'use client'

import React, { useState } from 'react';

interface CheckboxProps {
  isChecked: boolean;
  onClick: () => void;
  loading: boolean;
  spaces: string[];
  setSelectedSpaces: any;
  selectedSpaces: string[];
}

const Checkbox: React.FC<CheckboxProps> = ({ isChecked, onClick, spaces, loading, setSelectedSpaces, selectedSpaces }) => {
  const [isHovered, setIsHovered] = useState(false);

  const toggleSpace = (space: string) => {
    setSelectedSpaces((selectedSpaces: string[]) =>
      selectedSpaces.includes(space) ? selectedSpaces.filter(s => s !== space) : [...selectedSpaces, space]
    );
  };

  return (
    <div
      className="inline-block relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {isHovered && (
        <div className="absolute right-12 -top-8 fade-in-30 flex gap-x-3 h-fit gap-y-2 min-w-[10vw] flex-wrap bg-white shadow-xl border-primary rounded-xl p-2 text-xs font-semibold z-[999]">
          {spaces.map((space, index) => (
            <button
              key={index}
              onClick={() => toggleSpace(space)}
              className={`p-2 rounded-xl ${
                selectedSpaces.includes(space)
                  ? 'bg-[#22cc3f] text-white'
                  : 'bg-gray-200 text-gray-700'
              } transition-colors duration-200`}
            >
              {space}
            </button>
          ))}
        </div>
      )}

      <button
        onClick={onClick}
        className="flex items-center m-2.5 font-sans text-black cursor-pointer"
      >
        <input
          className="hidden"
          checked={isChecked}
          id="checkbox1"
          type="checkbox"
        />
        <span
          className={`
          relative w-7 h-7 rounded-[10px] cursor-pointer
          ${loading ? '!animate-blink' : ''}
          ${isChecked ? 'bg-[#22cc3f]' : 'bg-[#ffffff2b]'}
          transition-colors duration-300 ease-in-out
          shadow-[inset_0px_0px_5px_rgba(0,0,0,0.62),inset_0px_0px_0px_24px_rgba(0,0,0,0.21)]
          ${
            isChecked
              ? 'shadow-[inset_0px_0px_5px_rgba(0,0,0,0.62),inset_0px_0px_0px_2px_#22cc3f,inset_0px_0px_0px_24px_#22cc3f]'
              : ''
          }
        `}
        >
          <span
            className={`
            absolute w-[18px] h-[18px] rounded-[5px]
            top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2
            ${isChecked ? 'bg-white' : 'bg-[#e3e3e3]'}
            transition-colors duration-300 ease-in-out
            shadow-[0px_6px_6px_rgba(0,0,0,0.3)]
          `}
          ></span>
        </span>
      </button>
    </div>
  );
};

export default Checkbox;
