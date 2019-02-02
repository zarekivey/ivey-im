const socket = io();

// client side js
socket.on('connect', function () {
    console.log('Connected to server');
});

socket.on('disconnect', function () {
    console.log('Disconnected from server');
});

    socket.on('newMessage', function (message) {
    console.log('newMessage', message);

    // adding messaages to the ol
    let li = jQuery('<li></li>');
    li.text(`${message.from}: ${message.text}`);

    jQuery('#messages').append(li);
});

// location message
socket.on('newLocationMessage', function (message) {
    let li = jQuery('<li></li>');
    let a = jQuery('<a target="_blank">My current location</a>');

    // a link to the location
    li.text(`${message.from}: `);
    a.attr('href', message.url);
    li.append(a);
    jQuery('#messages').append(li);
});

jQuery('#message-form').on('submit', function (e) {
    e.preventDefault();

    socket.emit('createMessage', {
        from: 'User',
        text: jQuery('[name=message]').val()
    }, function () {

    });
});

const locationButton = jQuery('#send-location');
locationButton.on('click', function () {
    // if they're on an older browser
    if (!navigator.geolocation) {
        return alert('Geolocation not supported by your browser');
    }
    // if they accept
    navigator.geolocation.getCurrentPosition(function (position) {
        socket.emit('createLocationMessage', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
        });
    }, function () {
    // if they deny permission
        alert('Location access denied');
    })
});