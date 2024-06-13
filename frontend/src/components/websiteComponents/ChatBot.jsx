// src/Chatbot.js

import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState, useRef, useEffect } from "react";

const faqs = [
  {
    question: "What is your return policy?",
    answer: "You can return any item within 30 days of purchase.",
  },
  {
    question: "How do I track my order?",
    answer:
      "You can track your order using the tracking link sent to your email.",
  },
  {
    question: "Do you offer customer support?",
    answer: "Yes, we offer 24/7 customer support. You can contact us anytime.",
  },
];

const Chatbot = ({setToggle, toggle}) => {
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
        <FontAwesomeIcon icon={faXmark} className="text-2xl text-indigo-600 p-2 rounded-full border border-indigo-600" onClick={()=> setToggle(!toggle)} />
      </div>
      <div className="flex-1 overflow-y-auto mb-4 max-h-60">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`p-2 m-1 rounded-md ${
              msg.sender === "user"
                ? "bg-indigo-600 text-white self-end"
                : "bg-gray-200 text-black self-start"
            }`}
          >
            {msg.text}
          </div>
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
    </div>
  );
};

export default Chatbot;
