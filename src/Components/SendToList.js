import React from "react"

export default function SendToList(props){

    const selectUser = (e) => {
        props.setSendTo(e.target.value)
    }

    return(
        <select defaultValue="All" onChange={ (e) => selectUser(e) }>
            <option value="All">All</option>
            {props.users.map((user) => {
                if(props.chatName != user)
                    return(
                        <option value={user}>{user}</option>
                    )
            })}
        </select>
    )
}