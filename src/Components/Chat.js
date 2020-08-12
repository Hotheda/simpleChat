import React, { useState, useEffect } from "react"
import socketIOClient from "socket.io-client"
import Chatlog from "./Chatlog"

export default function Chat(props){
    const [socket, setSocket] = useState(null)
    const {chatName} = props
    const [messageToSend, setMessageToSend] = useState()
    const [chatLogData, setChatLogData] = useState()

  useEffect(()=>{
    setSocket(socketIOClient("http://192.168.1.153:4000"))
  },[])

  useEffect(()=>{
    if(!socket) return;
    
    socket.on("new-user", data => {
      setChatLogData([{user: "You", message: "Joined the chat"}])
      socket.emit("new-user", chatName)
    })

    socket.on("chat-message", data => {
        setChatLogData(chatData => [...chatData, data])
    })

  },[socket])
  

  const sendMessage = (e) => {
    e.preventDefault()
    if(!socket)
        return;
    
    socket.emit("chat-message", messageToSend)
    setChatLogData(chatData => [...chatData, {user: "You", message: messageToSend}])
    setMessageToSend("")
  }

  const onMessageChange = (e) => {
    setMessageToSend(e.target.value)
  }

  return(
    <div>
      <h1>Welcome to the chat {chatName}</h1>
      <form>
        <input id="chat-input" value={messageToSend} onChange={(e) => onMessageChange(e)} autoComplete="off" />
        <button onClick={(e) => sendMessage(e) }>Send message</button>
      </form>
      <Chatlog chatLogData = {chatLogData} />
    </div>
  )
}