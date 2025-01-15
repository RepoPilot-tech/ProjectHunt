'use client'

import React from 'react';

interface CheckboxProps {
  isChecked: boolean;
  onClick: () => void;
}

const Checkbox: React.FC<CheckboxProps> = ({ isChecked, onClick }) => {
  return (
    <button onClick={onClick} className="inline-block">
      <label className="flex items-center m-2.5 font-sans text-black cursor-pointer" htmlFor="checkbox1">
        <span className="mr-2.5 font-bold select-none">Save</span>
        <input 
          className="hidden" 
          checked={isChecked}
          id="checkbox1" 
          type="checkbox"
        />
        <span className={`
          relative w-7 h-7 rounded-[10px] cursor-pointer
          ${isChecked ? 'bg-[#22cc3f]' : 'bg-[#ffffff2b]'}
          transition-colors duration-300 ease-in-out
          shadow-[inset_0px_0px_5px_rgba(0,0,0,0.62),inset_0px_0px_0px_24px_rgba(0,0,0,0.21)]
          ${isChecked ? 'shadow-[inset_0px_0px_5px_rgba(0,0,0,0.62),inset_0px_0px_0px_2px_#22cc3f,inset_0px_0px_0px_24px_#22cc3f]' : ''}
        `}>
          <span className={`
            absolute w-[18px] h-[18px] rounded-[5px]
            top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2
            ${isChecked ? 'bg-white' : 'bg-[#e3e3e3]'}
            transition-colors duration-300 ease-in-out
            shadow-[0px_6px_6px_rgba(0,0,0,0.3)]
          `}></span>
        </span>
      </label>
    </button>
  );
}

export default Checkbox;

