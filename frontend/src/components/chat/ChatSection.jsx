import React, { useState, useRef, useEffect } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { motion } from "framer-motion"; // Import Framer Motion
import "react-quill/dist/quill.snow.css"; // Import the Quill CSS for formatting

const ChatSection = () => {
  const [story, setStory] = useState(""); // Holds the AI-generated response
  const [loading, setLoading] = useState(false); // Loading state for fetching the AI response
  const [userInput, setUserInput] = useState(""); // Holds the user's input
  const [chatHistory, setChatHistory] = useState([]); // Holds the entire conversation

  // Custom prompt for the AI
  const customPrompt =
    "Provide empathetic advice and use emojis to show encouragement.";

  const lastMessageRef = useRef(null); // Create a ref to reference the last message in chat history
  const chatContainerRef = useRef(null); // Create a ref for the chat container

  useEffect(() => {
    if (lastMessageRef.current && chatContainerRef.current) {
      lastMessageRef.current.scrollIntoView({ behavior: "smooth" }); // Scroll to the last message
    }
  }, [chatHistory]);

  const handleSendMessage = async () => {
    if (!userInput.trim()) return;

    setChatHistory((prevChat) => [
      ...prevChat,
      { sender: "user", text: userInput },
    ]);
    setLoading(true);

    try {
      const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API);
      const model = genAI.getGenerativeModel(
        { model: "tunedModels/mental-health-model-v343l4826azy" },
        {
          temperature: 0.5,
          maxTokens: 100,
          responseLength: 1000,
        }
      );
      const combinedPrompt = `${userInput}. ${customPrompt}`;

      const result = await model.generateContent(combinedPrompt);
      const responseText = result.response
        ? await result.response.text()
        : "Sorry, I didn't understand that.";

      setChatHistory((prevChat) => [
        ...prevChat,
        { sender: "bot", text: responseText },
      ]);
      setStory(responseText); // Set response as the story
    } catch (error) {
      console.error("Error fetching story:", error);
      setChatHistory((prevChat) => [
        ...prevChat,
        {
          sender: "bot",
          text: "Sorry, I encountered an issue. Please try again later.",
        },
      ]);
    } finally {
      setLoading(false);
      setUserInput("");
    }
  };

  return (
    <div
      ref={chatContainerRef}
      className=" lg:w-[50rem] md:w-[40rem] w-[20rem] max-w-full mx-auto p-6 bg-[#f7f3ec] my-auto"
    >
      {chatHistory.length === 0 && (
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col justify-center items-center h-full"
        >
          <h1 className="md:text-3xl text-xl font-semibold text-gray-700">
            Hello! How can I help you today? 😊
          </h1>
          <p className="md:text-3xl text-xl font-semibold text-gray-300">
            &quot; Mental health is not a destination, but a process. It&apos;s
            about how you drive, not where you&apos;re going.&quot;
          </p>
        </motion.div>
      )}
      <div className="w-[50rem]">
        {chatHistory.map((message, index) => (
          <div
            key={index}
            ref={index === chatHistory.length - 1 ? lastMessageRef : null}
            className={`mb-5 p-5 ${
              message.sender === "user"
                ? "bg-[#dff0e1] text-gray-800 text-right rounded-tr-2xl rounded-tl-2xl rounded-bl-2xl w-full"
                : "bg-[#ede6ed] text-gray-800 text-left rounded-tr-2xl rounded-br-2xl rounded-tl-2xl w-full"
            }`}
          >
            <p className="text-lg">{message.text}</p>
          </div>
        ))}
        {loading && (
          <div className="text-center text-gray-800">Gemini is typing...</div>
        )}
      </div>

      {/* Input Section */}
      <div className=" p-4 flex justify-center items-center w-full">
        <input
          type="text"
          className="bg-gray-300 p-3 rounded-xl flex-1 mr-2 outline-none focus:ring-2 focus:ring-gray-500 text-gray-800"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          placeholder="Type your message..."
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              handleSendMessage();
            }
          }}
        />
        <button
          onClick={handleSendMessage}
          className="bg-[#f2db90] px-3 py-2 rounded-md text-white hover:bg-[#f0ca4e] active:bg-[#ecbf2a] transition duration-150 ease-in-out"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatSection;
