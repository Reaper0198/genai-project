import React from 'react'
import Sidebar from '../components/home/Sidebar'
import Header from '../components/home/Header'
import MainContent from '../components/home/MainContent'
import ChatSection from '../components/home/ChatSection'

const ChatPage = () => {
  return (
    <div className="flex h-screen w-screen bg-gray-900 text-gray-200">
      {/* Sidebar */}
      <Sidebar  />

      {/* Main Content */}
      <div className={`flex-1 flex flex-col transition-all duration-300 ease-in-out`}>
        <Header  />
        <MainContent />
        <ChatSection />
      </div>
    </div>
  )
}

export default ChatPage

