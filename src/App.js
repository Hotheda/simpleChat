import React, { useState, useEffect } from "react"
import socketIOClient from "socket.io-client"

export default function App(){
  const [chatData, setChatData] = useState([])
  const [socket, setSocket] = useState(null)
  const [chatName, setChatName] = useState("Default")
  const [messageToSend, setMessageToSend] = useState()

  //const socket = 

  useEffect(()=>{
    setSocket(socketIOClient("http://192.168.1.153:4000"))
  },[])

  useEffect(()=>{
    if(!socket) return;
    
    socket.on("new-user", data => {
      var name = null
      //while(!name)
        name = prompt("Hi there, whats your name?")

      setChatName(name)
      setChatData([...chatData, data])
      socket.emit("new-user", name)
    })

    socket.on("chat-message", data => {
      var myMessage = <div> <p>{data}</p> <hr/> </div>;
      setChatData(chatData => [...chatData, myMessage])
    })

  },[socket])
  

  const sendMessage = (e) => {
    e.preventDefault()
    if(socket)
      socket.emit("chat-message", messageToSend)
      var myMessage = <div> <p style={{color: "red"}} >You: {messageToSend}</p> <hr/> </div>;
      setChatData(chatData => [...chatData, myMessage])
      setMessageToSend("")
  }

  const onMessageChange = (e) => {
    setMessageToSend(e.target.value)
  }

  return(
    <div>
      <h1>Welcome to the chat {chatName}</h1>
      <form>
        <input id="chat-input" value={messageToSend} onChange={(e) => onMessageChange(e)} />
        <button onClick={(e) => sendMessage(e) }>Send message</button>
      </form>
      {chatData ? chatData.map( item => <div>{item}</div> ) : null}
    </div>
  )
}