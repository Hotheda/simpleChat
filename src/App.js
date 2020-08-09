import React, { useState, useEffect } from "react"
import socketIOClient from "socket.io-client"

export default function App(){
  const [chatData, setChatData] = useState("")
  const [socket, setSocket] = useState(null)

  //const socket = 

  useEffect(()=>{
    setSocket(socketIOClient("http://localhost:4000"))
  },[])

  useEffect(()=>{
    if(!socket) return;
    
    socket.on("chat-message", data =>{
      console.log(data)
      setChatData(data)
    })
  },[socket])
  

  const connectUser = () => {
    if(socket)
      socket.emit("new_user", "Kalle")
  }


  return(
    <div>
      <h1>Här är min frontend</h1>
      {chatData}
      <button onClick={connectUser}>Send message</button>
    </div>
  )
}