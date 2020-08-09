const io = require('socket.io')(4000)

io.on('connection', socket => {
    console.log("New user")
    socket.emit("new-user", "Hej på dig du!")

    socket.on('new-user', message => {
        console.log(message)
    })
})
