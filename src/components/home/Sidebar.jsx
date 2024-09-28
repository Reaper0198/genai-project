import React from 'react';
import { FaEdit } from 'react-icons/fa';
import { PiList } from 'react-icons/pi';

export default function Sidebar({ isOpen, setIsOpen }) {
  return (
    <aside
      className={`w-64 bg-gray-800 p-4 md:flex md:flex-col hidden min-h-screen transition-all duration-300 ease-in-out`}
    >
      {/* Header with toggle and edit icons */}
      <div className="flex w-full justify-between items-center py-3">
        <PiList 
          className="text-2xl cursor-pointer"  
          aria-label={isOpen ? "Close sidebar" : "Open sidebar"} 
        />
        <FaEdit className="text-2xl" />
      </div>

      {/* Content */}
      <div className="flex flex-col items-start text-left">
        <h2 className="text-xl font-semibold mb-6">ChatApp</h2>
        <p className="text-xl font-semibold">Today:</p>
        <ul className="space-y-2">
          <li className="hover:bg-gray-700 p-2 rounded-md cursor-pointer">GitHub Repository</li>
          <li className="hover:bg-gray-700 p-2 rounded-md cursor-pointer">ArrayList Syntax Correction</li>
          <li className="hover:bg-gray-700 p-2 rounded-md cursor-pointer">Carousel Component</li>
          <li className="hover:bg-gray-700 p-2 rounded-md cursor-pointer">ProjectVerse Overview</li>
          <li className="hover:bg-gray-700 p-2 rounded-md cursor-pointer">Prefix Score Calculation</li>
        </ul>
      </div>

      {/* Previous 7 Days Section */}
      <div className="flex flex-col items-start text-left">
        <p className="text-xl my-2 font-semibold">Previous 7 Days:</p>
        <ul className="space-y-2">
          <li className="hover:bg-gray-700 p-2 rounded-md cursor-pointer">React Signup Form Debugging</li>
          <li className="hover:bg-gray-700 p-2 rounded-md cursor-pointer">Planar Graph Regions</li>
        </ul>
      </div>

      {/* Log in button */}
      <div className="my-4">
        <button className="bg-blue-600 w-full py-2 rounded-md">Log in</button>
      </div>
    </aside>
  );
}
