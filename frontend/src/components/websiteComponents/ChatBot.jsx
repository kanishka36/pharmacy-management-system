// src/Chatbot.js

import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState, useRef, useEffect } from "react";

const faqs = [
  {
    question: "What are your opening hours?",
    answer: "We are open at 8.00 am to 9.30pm",
  },
  {
    question: "Where are you located?",
    answer: "We are located at 123 Main Street, Colombo, Sri Lanka",
  },
  {
    question: "How do I track my order?",
    answer: "You can track your order in you 'my account' tab in 'orders' section ",
  },
  {
    question: "Do you offer customer support?",
    answer: "<a href='https://api.whatsapp.com/send/?phone=%2B94713719748&text&type=phone_number&app_absent=0' target='_blank' rel='noopener noreferrer'>Click Here</a>",
  },
];

const Chatbot = ({ setToggle, toggle }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = (question) => {
    const userInput = question || input.trim();
    if (userInput === "") return;

    const newMessages = [...messages, { text: userInput, sender: "user" }];
    setMessages(newMessages);

    const response = getResponse(userInput);
    setMessages((prevMessages) => [
      ...prevMessages,
      { text: response, sender: "bot" },
    ]);

    setInput("");
  };

  const getResponse = (input) => {
    const faq = faqs.find((faq) =>
      input.toLowerCase().includes(faq.question.toLowerCase())
    );
    return faq
      ? faq.answer
      : "Sorry, I don't understand your question. Can you please rephrase?";
  };

  return (
    <div className="flex flex-col justify-between h-196 w-96 p-4 border border-indigo-600 rounded-lg relative bg-white">
      <div className="absolute top-[-35px] left-[-35px]">
        <FontAwesomeIcon icon={faXmark} className="text-2xl text-indigo-600 p-2 rounded-full border border-indigo-600" onClick={() => setToggle(!toggle)} />
      </div>
      <div className="flex-1 overflow-y-auto mb-4 max-h-60">
        {messages.map((msg, index) => (
          msg.sender === "bot" ? (
            <div
              key={index}
              className="p-2 m-1 rounded-md bg-gray-200 text-black self-start"
              dangerouslySetInnerHTML={{ __html: msg.text }}
            />
          ) : (
            <div
              key={index}
              className="p-2 m-1 rounded-md bg-indigo-600 text-white self-end"
            >
              {msg.text}
            </div>
          )
        ))}
        <div ref={messagesEndRef} />
      </div>
      <div>
        <div className="space-y-2">
          {faqs.map((faq, index) => (
            <button
              key={index}
              className="w-full p-2 bg-indigo-600 text-white rounded-md hover:bg-gray-300"
              onClick={() => handleSend(faq.question)}
            >
              {faq.question}
            </button>
          ))}
        </div>
      </div>
      <div className="flex mt-4">
        <input
          className="flex-1 p-2 border border-gray-300 rounded-md"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
        />
        <button
          className="ml-2 p-2 bg-indigo-600 text-white rounded-md"
          onClick={() => handleSend()}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chatbot;
