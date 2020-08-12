import React, { useState } from "react"
import Chat from "./Chat"

export default function ChatLogin(props){
    const[name, setName] = useState()

    const confirmName = ((e) => {
        e.preventDefault()
        props.setChatName(name)
    })

    return(
        <div>
            <p>Hi, please enter your name.</p>
            <form>
                <label>Name: </label>
                <input id="name" autoComplete="off" onChange={(event) => { setName(event.target.value) }} />
                <button onClick={ (e) => confirmName(e) }>OK</button>
            </form>
        </div>
    )
}