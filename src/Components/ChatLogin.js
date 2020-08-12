import React, { useState } from "react"
import Chat from "./Chat"

export default function ChatLogin(props){
    const[name, setName] = useState()

    return(
        <div>
            <p>Hi, please enter your name.</p>
            <div>
                <label>Name: </label>
                <input id="name" onChange={(event) => { setName(event.target.value) }} />
                <button onClick={ () => {props.setChatName(name)} }>OK</button>
            </div>
        </div>
    )
}