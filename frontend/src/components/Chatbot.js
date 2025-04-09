import React, { useState } from "react";
import styled from "styled-components";
import { Box, IconButton, TextField, CircularProgress } from "@mui/material";
import ChatIcon from "@mui/icons-material/Chat";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";
import { LightPurpleButton } from "./buttonStyles";

const Chatbot = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { text: "Hi! How can I help you today?", sender: "bot" },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  // ✅ Predefined Q&A
  const simpleQA = {
    "what is the college information system project":
      "It is a web-based system to manage student, faculty, and academic information in a college.",
    "how can faculty add attendance":
      "Faculty can log in and use the attendance module to mark daily attendance of students.",
    "can students view their marks online":
      "Yes, students can view their exam and internal marks in their dashboard.",
    "what technologies are used in this project":
      "The project is built using MERN Stack - MongoDB, ExpressJS, ReactJS, and NodeJS.",
    "how does the admin register a new student":
      "Admin can fill in student details and register them through the admin panel.",
    "how to update student records":
      "Faculty or admin can go to the edit section of the student module to update information.",
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = input.trim();
    const newMessages = [...messages, { text: userMessage, sender: "user" }];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      const questionKey = userMessage.toLowerCase().trim();
      if (simpleQA[questionKey]) {
        // 🎯 Answer from predefined Q&A
        setMessages((prev) => [
          ...prev,
          { text: simpleQA[questionKey], sender: "bot" },
        ]);
      } else {
        // 🔁 Use backend OpenAI API
        const reply = await fetchBotReply(userMessage);
        setMessages((prev) => [...prev, { text: reply, sender: "bot" }]);
      }
    } catch (error) {
      console.error("Error getting reply:", error);
      setMessages((prev) => [
        ...prev,
        {
          text: "Oops! Something went wrong. Please try again later.",
          sender: "bot",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  // 🧠 Backend OpenAI call
  const fetchBotReply = async (userMessage) => {
    const res = await axios.post("http://localhost:5000/api/chat/ask", {
      messages: [
        { role: "system", content: "You are a helpful college assistant bot." },
        { role: "user", content: userMessage },
      ],
    });

    return res.data.reply;
  };

  return (
    <ChatbotContainer>
      {open ? (
        <ChatWindow>
          <ChatHeader>
            <span>Ask Bot</span>
            <IconButton
              onClick={() => setOpen(false)}
              size="small"
              sx={{ color: "white" }}
            >
              <CloseIcon />
            </IconButton>
          </ChatHeader>
          <ChatBody>
            {messages.map((msg, i) =>
              msg.sender === "bot" ? (
                <BotMessage key={i}>{msg.text}</BotMessage>
              ) : (
                <UserMessage key={i}>{msg.text}</UserMessage>
              )
            )}
            {loading && (
              <BotMessage>
                <CircularProgress size={16} /> Typing...
              </BotMessage>
            )}
          </ChatBody>
          <ChatFooter>
            <TextField
              fullWidth
              size="small"
              variant="outlined"
              placeholder="Type your question"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
            />
            <LightPurpleButton
              size="small"
              onClick={handleSend}
              disabled={loading}
            >
              Send
            </LightPurpleButton>
          </ChatFooter>
        </ChatWindow>
      ) : (
        <IconButton
          onClick={() => setOpen(true)}
          sx={{
            backgroundColor: "#7f56da",
            color: "white",
            "&:hover": { backgroundColor: "#6844c1" },
          }}
        >
          <ChatIcon />
        </IconButton>
      )}
    </ChatbotContainer>
  );
};

export default Chatbot;

// 💅 Styled Components
const ChatbotContainer = styled.div`
  position: fixed;
  bottom: 24px;
  right: 24px;
  z-index: 1000;
`;

const ChatWindow = styled(Box)`
  width: 300px;
  height: 400px;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const ChatHeader = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #7f56da;
  color: white;
  padding: 8px 16px;
`;

const ChatBody = styled(Box)`
  flex: 1;
  padding: 16px;
  overflow-y: auto;
`;

const ChatFooter = styled(Box)`
  padding: 8px;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const BotMessage = styled.div`
  background: #f1f0f0;
  padding: 8px;
  margin: 4px 0;
  border-radius: 6px;
  align-self: flex-start;
`;

const UserMessage = styled.div`
  background: #e1dcff;
  padding: 8px;
  margin: 4px 0;
  border-radius: 6px;
  align-self: flex-end;
`;
