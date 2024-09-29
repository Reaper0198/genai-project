import Chat from "../models/chat.model.js";
import User from "../models/user.model.js";

const saveUserMessage = async (req, res, next) => {
    try {
        const { message, userId } = req.body;
        console.log("User message:", message);
        console.log("User ID:", userId);
        let chatSession = await Chat.findOne({ user: userId });
        if (!chatSession) {
            chatSession = new Chat({
                user: userId,
                messages: []
            });
        }

        chatSession.messages.push({ sender: "user", message });
        await chatSession.save();

        res.json(chatSession);
    } catch (error) {
        console.error("Error Saving user message:", error);
        next(error);
    }
};

const saveBotMessage = async (req, res, next) => {
    try {
        const { message, userId } = req.body;

        // Find the existing chat session
        let chatSession = await Chat.findOne({ user: userId });
        if (!chatSession) {
            return res.status(404).json({ message: "Chat session not found" });
        }

        // Add the bot message to the messages array
        chatSession.messages.push({ sender: "bot", message });
        await chatSession.save(); // Save the chat session

        // Return the updated chat session
        res.json(chatSession);
    } catch (error) {
        console.error("Error Saving bot message:", error);
        next(error);
    }
};

const getChatHistory = async (req, res, next) => {
    try {
        const { userId } = req.params; // Get userId and sessionId from request parameters

        // Retrieve the chat session using both userId and sessionId
        const chatSession = await Chat.findOne({ user: userId });
        if (!chatSession) {
            return res.status(404).json({ message: "Chat session not found" });
        }

        // Return the chat session with its messages
        res.json(chatSession);
    } catch (error) {
        console.error("Error fetching chat history:", error);
        next(error);
    }
};

export { saveUserMessage, saveBotMessage, getChatHistory };
