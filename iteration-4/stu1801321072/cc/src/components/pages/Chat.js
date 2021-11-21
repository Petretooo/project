import React, { useState } from "react";
import { ChatEngine, getOrCreateChat } from "react-chat-engine";
import store from "../../store";

const Chat = () => {
  const [username, setUsername] = useState("");

  function implementingDirectChat() {
    getOrCreateChat({ is_direct_chat: true, usernames: [""] }, () =>
      setUsername("")
    );
  }

  const displayChatInterface = (creds) => {
    return (
      <div>
        <input
          type="text"
          placeholder="Find username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <button onClick={() => implementingDirectChat(creds)}>
          Create Chat
        </button>
      </div>
    );
  };

  return (
    <div>
      <ChatEngine
        height="calc(100vh-66px)"
        projectID="ada67ff7-e738-4efc-a9ea-ceeb805c5bfc"
        userName="pesho"
        userSecret="pesho"
        displayNewChatInterface={(creds) => displayChatInterface(creds)}
      />
    </div>
  );
};

export default Chat;
