import React, { useEffect, useState } from 'react';
import { FaEdit } from 'react-icons/fa';
import { PiList } from 'react-icons/pi';
import { TbLayoutSidebarLeftCollapseFilled } from "react-icons/tb";
import { GoogleGenerativeAI } from "@google/generative-ai";

export default function Sidebar({ showSidebar, isOpen }) {

  // Custom prompt for the AI
  const userInput =
    "Today I scored very low on my test.Now i am sad and dont know what to do?";

    const customPrompt = 
        "give a single title only for this in strictly 2-4 words."

    const [chatTitle, setChatTitle] = useState("");

    useEffect(() => {
        handleSendMessage();
        // Empty dependency array ensures this runs only once
      }, []);

    const handleSendMessage = async () => {

    try {
        console.log(import.meta.env.GEMINI_API);
        const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API);
        const model = genAI.getGenerativeModel(
          { model: "gemini-1.5-flash" },
          {
            temperature: 0.5,
            maxTokens: 100,
            responseLength: 1000,
          }
        );
        const combinedPrompt = `${userInput}. ${customPrompt}`;
  
        const result = await model.generateContent(combinedPrompt);
        const responseText = result.response.text();
        setChatTitle(responseText);
  
      } catch (error) {
        console.error("Error fetching story:", error);
      } 
    }

  return (
    <aside
      className={`fixed top-0 left-0 h-full w-64 bg-[#eadfa3] text-[#012f2c] transform transition-transform duration-700 ease-in-out z-50  ${
        isOpen ? 'translate-x-0' : '-translate-x-full '
      }`}
    >
      {/* Header with toggle and edit icons */}
      <div className="flex w-full justify-between items-center m py-3 md:mb-4">
        <TbLayoutSidebarLeftCollapseFilled 
          className=" cursor-pointer ml-2"
          size={28}
          onClick={showSidebar}  
        />
        <FaEdit className=" cursor-pointer mr-2" size={25} />
      </div>

      {/* Content */}
      <div className="flex flex-col items-start text-left">
        <p className="text-xl font-semibold">Today:</p>
        <ul className="py-2 w-60">
          <li className="hover:bg-[#efc44e]  border-2 border-[#012f2c] rounded-full p-2 cursor-pointer">{chatTitle}</li>
        </ul>
      </div>

      {/* Previous 7 Days Section */}
      <div className="flex flex-col items-start text-left">
        <p className="text-xl my-2 font-semibold">Previous 7 Days:</p>
        <ul className="space-y-2">
        </ul>
      </div>

      {/* Log in button */}
      <div className="my-4 absolute bottom-0  w-full">
        <button className="bg-[#cce270] w-56 py-2  rounded-md text-xl font-semibold active:bg-[#b1c94d] transition duration-300 ease-in-out hover:border-2 hover:border-[#85973f]">Log out</button>
      </div>
    </aside>
  );
}
