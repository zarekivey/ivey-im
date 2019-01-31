const socket = io();

// client side js
socket.on('connect', function () {
    console.log('connected to server');

    socket.emit('createMessage', {
        from: 'examplePerson',
        text: 'exampleText'
    });
});

socket.on('disconnect', function () {
    console.log('disconnected from the server');
});

socket.on('newMessage', function (message) {
    console.log('newMessage', message);
});