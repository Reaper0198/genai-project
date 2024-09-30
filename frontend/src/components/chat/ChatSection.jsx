import React, { useState, useRef, useEffect } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { motion } from "framer-motion";
import "react-quill/dist/quill.snow.css";
import arrow from "../../assets/arrow.gif";
import axios from "axios";
import { useSelector } from "react-redux";
import SyncLoader from "react-spinners/SyncLoader";

const ChatSection = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [story, setStory] = useState(""); // Holds the AI-generated response
  const [typedResponse, setTypedResponse] = useState(""); // For typing animation
  const [loading, setLoading] = useState(false); // Loading state for fetching the AI response
  const [userInput, setUserInput] = useState(""); // Holds the user's input
  const [chatHistory, setChatHistory] = useState([]); // Holds the entire conversation

  const customPrompt =
    "Provide empathetic advice and use emojis to show encouragement.";
  const lastMessageRef = useRef(null);
  const chatContainerRef = useRef(null);

  useEffect(() => {
    const fetchChatHistory = async () => {
      try {
        const response = await axios.get(`/chat/${currentUser._id}`);
        const chatData = response.data;
        console.log("Chat History (Fetched):", chatData);

        if (Array.isArray(chatData.messages)) {
          setChatHistory(chatData.messages);
        } else {
          console.error("Messages is not an array:", chatData.messages);
          setChatHistory([]);
        }
      } catch (error) {
        console.error("Error fetching chat history:", error);
      }
    };
    fetchChatHistory();
  }, [currentUser._id]);

  useEffect(() => {
    console.log("Chat History (Updated):", chatHistory);
  }, [chatHistory]);

  useEffect(() => {
    if (lastMessageRef.current && chatContainerRef.current) {
      lastMessageRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [chatHistory]);

  // // Typing animation function using setTimeout
  // const typeResponse = (text) => {
  //   let index = -1;
  //   setTypedResponse(""); // Clear any previous typed text

  //   // Ensure that text is not null, undefined, or empty
  //   if (!text) return;

  //   const typeCharacter = () => {
  //     if (index < text.length - 1) {
  //       setTypedResponse((prev) => prev + text[index]);
  //       index++;

  //       // Use setTimeout to control typing speed
  //       setTimeout(typeCharacter, 10); // Adjust speed here (50ms per character)
  //     }
  //   };

  //   typeCharacter(); // Start typing
  // };

  const handleSendMessage = async () => {
    if (!userInput.trim()) return;
    if (loading) return;

    setChatHistory((prevChat) => [
      ...prevChat,
      { sender: "user", message: userInput },
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
        { sender: "bot", message: responseText },
      ]);
      setStory(responseText);

      await axios.post("/chat/user-message", {
        message: userInput,
        userId: currentUser._id,
      });
      await axios.post("/chat/bot-message", {
        message: responseText,
        userId: currentUser._id,
      });
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

  const usernameVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0 },
  };

  return (
    <div
      ref={chatContainerRef}
      className="lg:w-[50rem] md:w-[40rem] sm:w-[30rem] w-[20rem] max-w-full mx-auto p-6 bg-[#f4ded1] flex flex-col justify-between h-full"
    >

      {chatHistory.length === 0 && (
        <div className="flex flex-col h-full justify-center items-center gap-2">
          <h1 className="md:text-6xl sm:text-4xl text-3xl font-semibold text-gray-800 flex  items-end">
            Hello ,
            <motion.span
              variants={usernameVariants}
              initial="hidden"
              animate="visible"
              transition={{ duration: 0.9 }}
              className="ml-2 bg-gradient-to-r from-orange-400 to-orange-700 bg-clip-text text-transparent mr-1 "
            >
              {currentUser.username.substring(
                0,
                currentUser.username.length - 4
              )}
            </motion.span>
          </h1>
          <h1 className="md:text-4xl sm:text-3xl text-2xl font-semibold text-gray-600 flex mt-3 ml-8 text-nowrap">
            <p>How can I help you today?😊</p>
          </h1>
          <p className="mt-4 md:text-2xl sm:text-xl text-xl font-semibold text-gray-500 text-center ">
            &quot;Mental health is not a destination, but a process. It&apos;s
            about how you drive, not where you&apos;re going.&quot;
          </p>
          <div className="flex justify-between w-full mt-5 max-md:hidden">
            <div>
              <img src={arrow} alt="" style={{ transform: "scaleX(-1)" }} />
            </div>
            <div className="mt-5">
              <img src={arrow} alt="" />
            </div>
          </div>
        </div>
      )}

      <div className="w-full">
        {chatHistory.map((message, index) => (
          <div
            key={index}
            ref={index === chatHistory.length - 1 ? lastMessageRef : null}
            className={`mb-3 md:mb-4  md:p-5 p-3 ${
              message.sender === "user"
                ? "bg-[#dff0e1] text-gray-800 text-right rounded-tr-2xl rounded-tl-2xl rounded-bl-2xl w-full"
                : "bg-[#ede6ed] text-gray-800 text-left rounded-tr-2xl rounded-br-2xl rounded-tl-2xl w-full"
            }`}
          >
            {/* Show the typing animation for the bot message */}
            <p className="sm:text-lg ">
              {message.message || "no text available"}
            </p>
          </div>
        ))}

        {loading && (
          <div className="items-center">
            <SyncLoader color="#34495e" size={10} />
          </div>
        )}
      </div>

      <div className="p-4 flex justify-center items-center w-full">
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
          className="px-3 py-2 rounded-md text-gray-600 "
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="nd:size-8 size-7 hover:text-gray-800 active:text-gray-900"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default ChatSection;
