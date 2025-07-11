import React, { useState } from "react";
// import { ChatBotWidget } from "chatbot-widget-ui";
import ChatBotWidget from "./ChatBotWidget";
 
const Chatbot = () => {
  // Save all messages conversation
  // Example: [{'role': 'user', 'content': 'hello'}, {'role': 'assistant', 'content': 'Hello, how can I assist you today!'}, ...]
    const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: "hi, how can i assist you today?",
    }
  ]);
 
  const customApiCall = async (message) => {
    const response = await fetch("http://139.59.19.212:8000/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message: message }),
    });
    const data = await response.json();
    return data.response;
 
  };
 
  const handleBotResponse = (response) => {
    // Handle the bot's response here
    console.log("Bot Response:", response);
    setMessages((prevMessages) => [
      ...prevMessages,
      { role: "assistant", content: response },
    ]);
  };
 
  const handleNewMessage = (message) => {
    setMessages((prevMessages) => [...prevMessages, message]);
  };
 
  return (
    <div>
      <ChatBotWidget
        callApi={customApiCall}
        onBotResponse={handleBotResponse}
        handleNewMessage={handleNewMessage}
        messages={messages}
        primaryColor="#2e475d"
        inputMsgPlaceholder="Type your message..."
        chatbotName="AI Assistant"
        isTypingMessage="Typing..."
        IncommingErrMsg="Oops! Something went wrong. Try again."
        chatIcon={<div>💬</div>}
        botIcon={<div style={{ background: '#2e475d', fontSize: 20 }}>🤖</div>}
        botFontStyle={{
          fontFamily: "Arial",
          fontSize: "14px",
          color: "#60758d",
        }}
        typingFontStyle={{
          fontFamily: "Arial",
          fontSize: "12px",
          color: "#888",
          background: '#eaf0f6',
          fontStyle: "italic",
        }}
        useInnerHTML={true}
      />
    </div>
  );
};
 
export default Chatbot;