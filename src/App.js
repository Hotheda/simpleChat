import React, { useState, useEffect } from "react"
import socketIOClient from "socket.io-client"

export default function App(){
  const [chatData, setChatData] = useState([])
  const [socket, setSocket] = useState(null)
  const [messageToSend, setMessageToSend] = useState()

  //const socket = 

  useEffect(()=>{
    setSocket(socketIOClient("http://localhost:4000"))
  },[])

  useEffect(()=>{
    if(!socket) return;
    
    socket.on("new-user", data => {
      var name = prompt("Hi there, whats your name?")
      setChatData([...chatData, data])
      socket.emit("new-user", name)
    })

    socket.on("chat-message", data => {

      setChatData(chatData => [...chatData, data])
    })

  },[socket])
  

  const sendMessage = () => {
    if(socket)
      socket.emit("chat-message", messageToSend)
      setMessageToSend("")
  }


  const onMessageChange = (e) => {
    setMessageToSend(e.target.value)
  }

  return(
    <div>
      <h1>Här är min frontend</h1>
      <div>
        <input id="chat-input" value={messageToSend} onChange={(e) => onMessageChange(e)} />
        <button onClick={sendMessage}>Send message</button>
      </div>
      {chatData ? chatData.map( item => <p>{item}</p> ) : null}
    </div>
  )
}