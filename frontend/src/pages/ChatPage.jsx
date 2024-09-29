import React, { useEffect, useState } from "react";
import ChatHeader from "../components/chat/ChatHeader";
import Sidebar from "../components/chat/Sidebar";
import MainContent from "../components/chat/MainContent";
import ChatSection from "../components/chat/ChatSection";

const ChatPage = () => {
  const [isOpen, setIsOpen] = useState(true);

  const showSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className=" h-full min-h-screen  w-screen  bg-[#f7f3ec] text-gray-200 flex">
     
        <Sidebar showSidebar={showSidebar} isOpen={isOpen} setIsOpen={setIsOpen}/>


      {/* Main Content */}
      <div
        className={`flex-1 font-serif flex flex-col transition-all duration-300 ease-in-out w-full`}
      >
        <ChatHeader showSidebar={showSidebar} isOpen={isOpen} />
        {/* <MainContent /> */}
        <ChatSection />
      </div>
    </div>
  );
};

export default ChatPage;
