import Chat from "../models/Chat.js";

export const getMessages = async (req, res) => {
  try {
    const { receiverId } = req.params;
    const userId = req.user._id;

    const chats = await Chat.find({
      $or: [
        { sender: userId, receiver: receiverId },
        { sender: receiverId, receiver: userId }
      ]
    }).populate("sender receiver", "username");

    res.json(chats);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch messages" });
  }
};

export const sendMessage = async (req, res) => {
  try {
    const { receiverId, message } = req.body;
    const senderId = req.user._id;

    const chat = new Chat({ sender: senderId, receiver: receiverId, message });
    await chat.save();

    const populated = await chat.populate("sender receiver", "username");
    res.json(populated);
  } catch (err) {
    res.status(500).json({ error: "Failed to send message" });
  }
};
