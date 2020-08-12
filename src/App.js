import React, { useState } from "react"
import Chat from "./Components/Chat"
import ChatLogin from "./Components/ChatLogin"
import "./Styles/chat.css"

export default function App(){
  const [chatName, setChatName] = useState()

  if(chatName)
  return(
    <div>
      <div>
        <Chat chatName = {chatName} />
      </div>
    </div>
  )

  return(
    <div>
      <ChatLogin setChatName={setChatName} />
    </div>
  )
}