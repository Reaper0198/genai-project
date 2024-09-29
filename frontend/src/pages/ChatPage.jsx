import React, { useEffect, useState } from 'react'
import ChatHeader from '../components/chat/ChatHeader'
import Sidebar from '../components/chat/Sidebar'
import MainContent from '../components/chat/MainContent'
import ChatSection from '../components/chat/ChatSection'

const ChatPage = () => {

    const [isOpen, setIsOpen] = useState(true);

    const showSidebar = () =>{
        setIsOpen(!isOpen);
    }

  return (
    <div className="flex w-screen h-full bg-gray-800 text-gray-200">
      {/* Sidebar */}
      <Sidebar showSidebar={showSidebar} isOpen={isOpen}/>

      {/* Main Content */}
      <div className={`flex-1 flex flex-col transition-all duration-300 ease-in-out `} >

        <ChatHeader  showSidebar={showSidebar} isOpen={isOpen}/>
        <MainContent />
        <ChatSection />
      </div>
    </div>
  )
}

export default ChatPage

