import React, { useState } from 'react';
import { FaEdit } from 'react-icons/fa';
import { PiList } from 'react-icons/pi';
import Sidebar from './Sidebar';

export default function ChatHeader() {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <>
    <header className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        {/* Toggle and Edit icons */}
        <div className={`flex gap-4 items-center md:hidden  `}>
          <PiList
            className="text-2xl cursor-pointer"
            />
          <FaEdit className="text-2xl cursor-pointer" />
        </div>

        {/* App Title */}
        <h1 className="text-2xl font-bold">ChatApp</h1>

        {/* Profile Icon */}
        <div className="flex items-center">
          <img
            src="https://cdn-icons-png.flaticon.com/512/4537/4537019.png"
            alt="user"
            className="w-12 h-12 bg-gray-800"
            />
        </div>
      </div>
    </header>
    
    
    </>
  );
}
