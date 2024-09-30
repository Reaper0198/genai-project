import React, { useState, useRef, useEffect } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { motion } from "framer-motion";
import "react-quill/dist/quill.snow.css";
import arrow from "../../assets/arrow.gif";
import axios from "axios";
import { useSelector } from "react-redux";

const ChatSection = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [story, setStory] = useState("");
  const [loading, setLoading] = useState(false);
  const [userInput, setUserInput] = useState("");
  const [chatHistory, setChatHistory] = useState([]);

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

    const handleSendMessage = async () => {
    if (!userInput.trim() || loading) return;

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

  return (
    <div
      ref={chatContainerRef}
      className=" lg:w-[50rem] mt-20 md:w-[40rem] w-[20rem] max-w-full mx-auto p-6 bg-[#f7f3ec]  flex flex-col justify-between h-full "
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
          <p className="mt-4 md:text-4xl text-xl font-semibold text-gray-300 text-center">
            &quot;Mental health is not a destination, but a process. It&apos;
            about how you drive, not where you&apos;re going.&quot;
          </p>
          <div className="flex justify-between w-full mt-5">
            <div>
              <img src={arrow} alt="" style={{ transform: "scaleX(-1)" }} />
            </div>
            <div className="mt-5">
              <img src={arrow} alt="" />
            </div>
          </div>
        </motion.div>
      )}
      <div className="w-[50rem]">
        {chatHistory.map((message, index) => {
          console.log(message);
          return (
            <div
              key={index}
              ref={index === chatHistory.length - 1 ? lastMessageRef : null}
              className={`mb-5 p-5 ${
                message.sender === "user"
                  ? "bg-[#dff0e1] text-gray-800 text-right rounded-tr-2xl rounded-tl-2xl rounded-bl-2xl w-full"
                  : "bg-[#ede6ed] text-gray-800 text-left rounded-tr-2xl rounded-br-2xl rounded-tl-2xl w-full"
              }`}
            >
              <p className="text-lg">
                {message.message || "No text available."}
              </p>
            </div>
          );
        })}
        {loading && (
          <div className="text-center text-gray-800">Gemini is typing...</div>
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
          className="bg-[#f2db90] px-3 py-2 rounded-md text-white hover:bg-[#f0ca4e] active:bg-[#ecbf2a] transition duration-150 ease-in-out"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatSection;
