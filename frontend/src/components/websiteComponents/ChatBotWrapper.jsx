import React, { useState } from "react";
import Chatbot from "../../components/websiteComponents/ChatBot";
import chtIcon from "../../../src/assets/images/chticon.png";

const ChatBotWrapper = () => {
  const [toggle, setToggle] = useState(false);
  return (
    <>
      <div className="relative">
        <div className="absolute right-2 bottom-4 z-10">
          <div className={`${toggle ? "" : "w-16 bg-indigo-600 rounded-full"}`}>
            {toggle ? (
              <Chatbot setToggle={setToggle} toggle={toggle} />
            ) : (
              <img
                src={chtIcon}
                onClick={() => setToggle(!toggle)}
                className="p-3 rounded"
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ChatBotWrapper;
