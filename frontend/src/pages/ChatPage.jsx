import React from 'react'
import ChatHeader from '../components/chat/ChatHeader'
import Sidebar from '../components/chat/Sidebar'
import MainContent from '../components/chat/MainContent'
import ChatSection from '../components/chat/ChatSection'

const ChatPage = () => {
  return (
    <div className="flex h-full w-screen  bg-[#f7f3ec] text-gray-200">
      {/* Sidebar */}
        <Sidebar  />

      {/* Main Content */}
      <div className={`flex-1 flex flex-col transition-all duration-300 ease-in-out `}>
        <ChatHeader  />
        {/* <MainContent /> */}
          <ChatSection />
       
      </div>
    </div>
  )
}

export default ChatPage

