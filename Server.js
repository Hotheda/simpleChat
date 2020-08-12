const io = require('socket.io')(4000)


/*
    Store sockets in an array contianing socket and user name
    Check if username is taken and request a namechange if thats the case
    Send list of users on login and on remote user login
*/


io.on('connection', socket => {
    socket.emit("new-user", "Hej på dig du!")

    socket.on('new-user', name => {
        console.log("User joined: " + name + " - " + socket.id)
        socket.name = name
        const messageToSend = {user: socket.name, message: "Joined the chat"}
        socket.broadcast.emit('chat-message', messageToSend)
    })

    socket.on('chat-message', message => {
        console.log(socket.id, message)
        const messageToSend = {user: socket.name, message: message}
        socket.broadcast.emit('chat-message', messageToSend)
    })

    socket.on("priv-message", message => {
        /*
            Send to specific socket here
        */
    })
})
