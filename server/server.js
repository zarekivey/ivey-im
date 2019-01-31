const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
let app = express();
let server = http.createServer(app);
let io = socketIO(server);

app.use(express.static(publicPath));

// events with socket io
io.on('connection', (socket) => {
    console.log('New user connected.')

    socket.emit('newEmail', {
        from: 'Example',
        text: 'example text',
        createdAt: '123'
    });

    socket.emit('newMessage', {
        from: 'Zarek',
        text: 'heres a text',
        createdAt: '12345'
    });

    socket.on('createMessage', (message) => {
        console.log('Message Recieved', message)
    });

    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
});

server.listen(port, () => {
    console.log(`Server is up on port ${port}`)
});