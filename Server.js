const io = require('socket.io')(4000)


io.on('connection', socket => {
    socket.emit("new-user", "Hej på dig du!")

    socket.on('new-user', name => {
        console.log("User joined: " + name + " - " + socket.id)
        socket.name = name
        socket.broadcast.emit('chat-message', name + ": joined")
    })

    socket.on('chat-message', message => {
        console.log(socket.id, message)
        socket.broadcast.emit('chat-message', socket.name + ": " + message)
    })
})
