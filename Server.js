const io = require('socket.io')(4000)

io.on('connection', socket => {
    console.log("New user")
    socket.emit("chat-message", "Hej på dig du!")
    socket.on('new_user', message => {
        console.log(message)
    })
})
