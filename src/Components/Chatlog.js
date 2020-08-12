import React from "react"

export default function Chatlog(props){
    return(
        <div>
            {props.chatData ? props.chatData.map( item => <div>{item}</div> ) : null}
        </div>
    )
}