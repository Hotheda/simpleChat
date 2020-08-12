import React, { useState, useEffect } from "react"
import socketIOClient from "socket.io-client"
import Chatlog from "./Chatlog"
import SendToList from "./SendToList"

export default function Chat(props){
    const [socket, setSocket] = useState(null)
    const {chatName} = props
    const [messageToSend, setMessageToSend] = useState()
    const [chatLogData, setChatLogData] = useState([])
    const [users, setUsers] = useState()
    const [sendTo, setSendTo] = useState("All")

  useEffect(()=>{
    setSocket(socketIOClient("http://192.168.1.153:4000"))
  },[])

  useEffect(()=>{
    if(!socket) return;
    
    socket.on("new-user", data => {
      socket.emit("new-user", chatName)
    })

    socket.on("chat-message", data => {
        setChatLogData(chatLogData => [...chatLogData, data])
    })

    socket.on("user-list", data => {
        setUsers(data)
    })
    
},[socket])

  const sendMessage = (e) => {
    e.preventDefault()
    if(!socket)
        return;
    
    if(sendTo === "All"){
        socket.emit("chat-message", messageToSend)
        setChatLogData(chatLogData => [...chatLogData, {user: "You", message: messageToSend}])
    }else{
        sendPrivMessage()
    }


    setMessageToSend("")
  }

  const sendPrivMessage = () => {
    const privMessage = {user: sendTo, message: messageToSend}
    socket.emit("priv-message", privMessage)
    setChatLogData(chatLogData => [...chatLogData, {user: "You", message: messageToSend, private: true}])
  }

  const onMessageChange = (e) => {
    setMessageToSend(e.target.value)
  }

  return(
    <div>
        <h1>Welcome to the chat {chatName}</h1>
        <form>
            <input id="chat-input" value={messageToSend} onChange={(e) => onMessageChange(e)} autoComplete="off" />
            {users ? <SendToList users={users} chatName={chatName} setSendTo={setSendTo}/> : null}
            <button onClick={(e) => sendMessage(e) }>Send message</button>
        </form>
        <Chatlog chatLogData = {chatLogData} />
    </div>
  )
}