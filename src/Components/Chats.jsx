import React, { useEffect, useState } from "react";
import "../assets/Styles/Chats.css";

const Chats = ({ msg }) => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const sampleData = {
    username: "Yash",
    chats: [
      {
        talkingTo: "Dog_Seller",
        conversation: [
          {
            sending: true,
            message: { msg },
          },
        ],
      },
      {
        talkingTo: "Cat_Seller",
        conversation: [
          {
            sending: true,
            message: { msg },
          },
        ],
      },
    ],
  };
  const [userData, setUserData] = useState(sampleData);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSendMessage = () => {
    if (inputValue.trim() !== "") {
      const newMessage = {
        text: inputValue,
        sender: "Yash",
      };

      setMessages([...messages, newMessage]);
      setInputValue("");
    }
  };

  return (
    <div className="chat-wrapper">
      <div className="chat">
        <div className="user-section">
          {userData.chats.map((data, index) => (
            <div key={index} className="user-wrapper">
              <div className="user-img">
                <img src="" alt="" />
              </div>
              <div className="user-name">{data.talkingTo}</div>
            </div>
          ))}
        </div>

        <div className="chat-section">
          <div className="message-container">
            {messages.map((message, index) => (
              <div key={index} className="message received">
                {message.text}
              </div>
            ))}
          </div>
          <div className="input-section">
            <input
              type="text"
              placeholder="Type your message..."
              value={inputValue}
              onChange={handleInputChange}
            />
            <button onClick={handleSendMessage}>Send</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chats;
