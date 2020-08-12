import React, { useState } from "react"
import Chat from "./Components/Chat"
import ChatLogin from "./Components/ChatLogin"

export default function App(){
  const [chatName, setChatName] = useState()

  if(chatName)
  return(
    <div>
      <h1>Welcome to the App {chatName}</h1>
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