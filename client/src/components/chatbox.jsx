import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import "./chatbot.css"; // Import the CSS file

function Chatbot() {
  const [message, setMessage] = useState("");
  const [chatHistory, setChatHistory] = useState([]); // Stores all messages
  const chatContainerRef = useRef(null); // For auto-scroll

  // Auto-scroll to the bottom when messages update
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [chatHistory]);

  const handleSend = async () => {
    if (!message.trim()) return; // Prevent sending empty messages

    const userMessage = { text: message, sender: "user" };
    setChatHistory((prev) => [...prev, userMessage]); // Add user message

    try {
      const res = await axios.post("http://localhost:5001/chat", { message });
      const botResponseText =
        res.data?.candidates?.[0]?.content?.parts?.[0]?.text ||
        "No response from chatbot.";
      const botMessage = { text: botResponseText, sender: "bot" };

      setChatHistory((prev) => [...prev, botMessage]); // Add bot response
    } catch (error) {
      console.error("Error:", error);
      setChatHistory((prev) => [
        ...prev,
        { text: "Error: Unable to fetch response.", sender: "bot" },
      ]);
    }

    setMessage(""); // Clear input field after sending
  };

  return (
    <div className="chatbot-background">
      <div className="chat-container">
        <div className="chat-header">Chatbot</div>

        {/* Response area - Displays chat history */}
        <div className="chat-response" ref={chatContainerRef}>
          {chatHistory.map((msg, index) => (
            <div
            key={index}
            className={msg.sender === "user" ? "user-message" : "bot-message"}
            >
              {msg.text}
            </div>
          ))}
        </div>

        {/* Fixed input box at the bottom */}
        <div className="chat-input-button">
            <div className="chat-input">
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type a message..."
                />
            </div>
            <div className="chat-button">
              <i class="ri-send-plane-fill" onClick={handleSend}></i>
            </div>
        </div>
      </div>
    </div>
  );
}

export default Chatbot;
