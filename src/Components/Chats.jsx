import React, { useEffect, useState } from "react";
import "../assets/Styles/Chats.css";
import animals from "../assets/utils/animals";
import { useParams } from "react-router-dom";

const Chats = () => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const { id } = useParams();
  let msg = "";
  if (id != 100) {
    msg = `I want to buy ${animals[id].breed} can you tell me about it`;
  }
  const sampleData = {
    username: "Yash",
    chats: [
      {
        talkingTo: "Dog_Seller",
        conversation: [
          {
            sending: true,
            message: `${ msg }`,
          },
        ],
      },
      {
        talkingTo: "Cat_Seller",
        conversation: [
          {
            sending: true,
            message: `${ msg }`,
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
            <div className="message sent">
              {userData.chats[0].conversation[0].message}
            </div>
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
