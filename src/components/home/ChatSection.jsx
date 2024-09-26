import React from 'react';

export default function ChatSection() {
  return (
    <div className='p-4 flex justify-center items-center bg-gray-900'>
      {/* Input field */}
      <input 
        type="text" 
        className='bg-gray-800 p-3 rounded-xl w-full max-w-2xl flex-1 mr-4 outline-none focus:ring-2 focus:ring-blue-500 text-white' 
        placeholder="Type your message..."
      />
      
      {/* Send Button */}
      <button className="bg-blue-600 px-3  py-2 rounded-md text-white hover:bg-blue-700 active:bg-blue-800 transition duration-150 ease-in-out">
        Send
      </button>
    </div>
  );
}
