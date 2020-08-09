import React, { useState, useEffect, useReducer } from "react"
import socketIOClient from "socket.io-client"

export default function App(){
  const [chatData, setChatData] = useState([])
  const [socket, setSocket] = useState(null)

  //const socket = 

  useEffect(()=>{
    setSocket(socketIOClient("http://localhost:4000"))
  },[])

  useEffect(()=>{
    if(!socket) return;
    
    socket.on("new-user", data =>{
      var name = prompt("Hi there, whats your name?")
      setChatData(...chatData, data)
      socket.emit("new-user", name)
    })
  },[socket])
  

  const sendMessage = () => {
    if(socket)
      socket.emit("chat-message", "Bla bla bla")
  }


  return(
    <div>
      <h1>Här är min frontend</h1>
      <div>
        <button onClick={sendMessage}>Send message</button>
      </div>
      {chatData}
    </div>
  )
}