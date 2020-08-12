const io = require('socket.io')(4000)

var users = [];

/*
    Check if username is taken and request a namechange if thats the case
    Send list of users on login and on remote user login
*/


io.on('connection', socket => {
    socket.emit("new-user", "Hej på dig du!")


    socket.on('new-user', name => {
        console.log("User joined: " + name + " - " + socket.id)
        socket.name = name
        users.push(socket);

        var userlist = users.map((user) => {return user.name})

        socket.broadcast.emit("user-list", userlist)
        socket.emit("user-list", userlist)

        //check for uniqe names

        const messageToSend = {user: socket.name, message: "Joined the chat"}
        socket.emit('chat-message', {user: "Server", message: "Welcome to the chat"})
        socket.broadcast.emit('chat-message', messageToSend)
    })

    socket.on('chat-message', message => {
        console.log(socket.id, message)
        const messageToSend = {user: socket.name, message: message}
        socket.broadcast.emit('chat-message', messageToSend)
    })

    socket.on("priv-message", message => {
        var sendToSocket = users.find( user => {
            if(user.name === message.user)
                return user
            } )

        const messageToSend = {user: socket.name, message: message.message, private: true}
        if(sendToSocket)
            sendToSocket.emit("chat-message", messageToSend)
    })
})
