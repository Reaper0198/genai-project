import Chat from "../models/chat.model.js";
import User from "../models/user.model.js";

// Save user message
const saveUserMessage = async (req, res, next) => {
    try {
        const { message, userId, sessionId } = req.body;

        // Check if the chat session already exists
        let chatSession = await Chat.findOne({ user: userId, sessionId });

        // If no chat session exists, create a new one
        if (!chatSession) {
            chatSession = new Chat({
                user: userId,
                sessionId,
                messages: []
            });
        }

        // Add the user message to the array
        chatSession.messages.push({ sender: "user", message });

        // Save the chat session
        await chatSession.save();
        res.json(chatSession);
    } catch (error) {
        console.error("Error Saving user message:", error);
        next(error);
    }
};

// Save bot message
const saveBotMessage = async (req, res, next) => {
    try {
        const { message, userId, sessionId } = req.body;

        // Find the chat session
        let chatSession = await Chat.findOne({ user: userId, sessionId });
        if (!chatSession) {
            return res.status(404).json({ message: "Chat session not found" });
        }

        // Add the bot message to the array
        chatSession.messages.push({ sender: "bot", message });

        // Save the chat session
        await chatSession.save();
        res.json(chatSession);
    } catch (error) {
        console.error("Error Saving bot message:", error);
        next(error);
    }
};


export { saveUserMessage, saveBotMessage };
