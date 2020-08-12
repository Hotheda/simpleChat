import React, { useState } from "react"
import Chat from "./Components/Chat"

export default function App(){
  const [chatName, setChatName] = useState("")

  return(
    <div>
      <h1>Welcome to the App {chatName}</h1>
      <div>
        <Chat name = {chatName} />
      </div>
    </div>
  )
}