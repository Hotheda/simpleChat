import React from "react"

export default function Chatlog(props){
    return(
        <div>
            {props.chatLogData ? props.chatLogData.map( item => <div>{item.user} : {item.message} </div> ) : null}
        </div>
    )
}