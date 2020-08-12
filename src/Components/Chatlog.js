import React from "react"

export default function Chatlog(props){

    if(props.chatLogData){
        return(
            <div className="Chat_log">
                {props.chatLogData.map( (item, index) => {
                    if(item.private)
                        return <div className="private_message" key={index}> {index} : {item.user} : {item.message} </div>
                    
                    return <div key={index}> {index} : {item.user} : {item.message} </div>
                })}
            </div>
        )
    }

    return null;
}