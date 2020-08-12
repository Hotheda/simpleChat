const io = require('socket.io')(4000)


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
