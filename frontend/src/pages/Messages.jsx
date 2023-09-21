import React, { useState } from "react";
import "../styles/Messages.css";
import { useParams } from "react-router-dom";
import MessagesSideBar from "../components/MessagesSideBar";
import ChatBox from "../components/ChatBox";
import ConversationData from "../components/ConversationData";
import { useUserAndSocket } from "./MySphere";

export default function Messages() {
  const { username } = useParams();
  const { myData, socket } = useUserAndSocket();
  const [selectedConversation, setSelectedConversation] = useState();
  const [showConversationData, setShowConversationData] = useState(false);
  return (
    <div className="Messages">
      <MessagesSideBar
        setSelectedConversation={setSelectedConversation}
        socket={socket}
      />
      <span className="vertical-line"></span>
      <div className="messanger-container">
        {selectedConversation && (
          <>
            <ChatBox
              selectedConversation={selectedConversation}
              socket={socket}
              setShowConversationData={setShowConversationData}
            />
            {showConversationData && (
              <ConversationData
                selectedConversation={selectedConversation}
                socket={socket}
                setShowConversationData={setShowConversationData}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
}
