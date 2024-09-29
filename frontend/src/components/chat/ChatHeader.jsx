import React, { useState } from 'react';
import { FaEdit } from 'react-icons/fa';
import { TbLayoutSidebarLeftExpandFilled } from "react-icons/tb";

export default function ChatHeader({showSidebar, isOpen}) {


  return (
    <>
    <header className="bg-[#f5ecb6] text-[#012f2c] p-4">
      <div className="container mx-auto flex justify-between items-center">
        {/* Toggle and Edit icons */}
        <div className={`flex gap-4 items-center   `}>
        <TbLayoutSidebarLeftExpandFilled 
            onClick={showSidebar}
            className="text-2xl cursor-pointer"
            size={27}
            />
          <FaEdit className="text-2xl cursor-pointer" 
            size = {25}/>
        </div>

        {/* App Title */}
        <h1 className="text-3xl font-bold font-sans">Mindfull</h1>

        {/* Profile Icon */}
        <div className="flex items-center">
          <img
            src="https://cdn-icons-png.flaticon.com/512/4537/4537019.png"
            alt="user"
            className="w-12 h-12 bg-gray-800 rounded-full"
            />
        </div>
      </div>
    </header>
    
    
    </>
  );
}
