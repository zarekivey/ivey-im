const path = require('path');
const http = require('http');
const express = require('express'); 
const socketIO = require('socket.io');

const {generateMessage, generateLocationMessage} = require('./utils/message');
const {isRealString} = require('./utils/validation')
const {Users} = require('./utils/users');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
const app = express();
const server = http.createServer(app);
const io = socketIO(server);
const users = new Users();


app.use(express.static(publicPath));

// events with socket io
io.on('connection', (socket) => {
    console.log('New user connected.');
    
    // params. = name and room entered on the join page
    socket.on('join', (params, callback) => {
        if (!isRealString(params.name) || !isRealString(params.room)) {
            // the rest of the function wont fire if the data doesnt fire
            return callback('Name and room name are required')
        }

        // the room entered on the home page
        socket.join(params.room);
        users.removeUser(socket.id);
        users.addUser(socket.id, params.name, params.room);

        io.to(params.room).emit('updateUserList', users.getUserList(params.room));
        socket.emit('newMessage', generateMessage('Admin', 'Welcome to IveyIM!'));
        socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin', `${params.name} has joined`));
        callback();
    });

    socket.on('createMessage', (message, callback) => {
        console.log('createMessage', message);

        io.emit('newMessage', generateMessage(message.from, message.text));
        callback();
    });

    socket.on('createLocationMessage', (coords) => {
        io.emit('newLocationMessage', generateLocationMessage('Admin', coords.latitude, coords.longitude));
    });

    socket.on('disconnect', () => {
        const user = users.removeUser(socket.id);

        if (user) {
            // when a user leaves a room, they'll be removed from the user list
            io.to(user.room).emit('updateUserList', users.getUserList(user.room));
            io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} has left.`));
        }
    });
});

server.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});