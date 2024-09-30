import React, { useState } from 'react';
import { FaEdit } from 'react-icons/fa';
import { TbLayoutSidebarLeftExpandFilled } from "react-icons/tb";
import { Link } from 'react-router-dom';

export default function ChatHeader({showSidebar, isOpen}) {


  return (
    <>
    <header className="fixed top-0 left-0 w-full bg-[#f5edc3] font-serif text-[#012f2c] p-4 z-5">
      <div className="container mx-2 flex justify-between items-center">
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
        <Link to="/">
            <h1 className="text-4xl font-bold italic font-sans">Mindful</h1>
        </Link>
        {/* Profile Icon */}
        <Link to={'/profile'} className="flex items-center ">
          <img
            src="https://cdn-icons-png.flaticon.com/512/4537/4537019.png"
            alt="user"
            className="w-12 h-12 bg-gray-800 rounded-full"
            />
        </Link>
      </div>
    </header>
    
    
    </>
  );
}
