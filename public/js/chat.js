const socket = io();

function scrollToBottom () {
    const messages = jQuery('#messages');
    const newMessage = messages.children('li:last-child');
    const clientHeight = messages.prop('clientHeight');
    const scrollTop = messages.prop('scrollTop');
    const scrollHeight = messages.prop('scrollHeight');
    const newMessageHeight = newMessage.innerHeight();
    const lastMessageHeight = newMessage.prev().innerHeight();

    if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
        messages.scrollTop(scrollHeight);
    };
};

// client side js
socket.on('connect', function () {
    const params = jQuery.deparam(window.location.search);

    socket.emit('join', params, function (err) {
        if (err) {
            alert(err)
            // sedning them back to them homepage if there is an error
            window.location.href = '/';
        } else {
            console.log('no error')
        }
    })
});

socket.on('disconnect', function () {
    console.log('Disconnected from server');
});

// updated user list for when users leave
socket.on('updateUserList', function (users) {
    const ol = jQuery('<ol></ol>');

    users.forEach(function (user) {
        ol.append(jQuery('<li></li>').text(user));
    });

    // setting the lsit to the updated version
    jQuery('#users').html(ol);
});

socket.on('newMessage', function (message) {
    const formattedTime = moment(message.createdAt).format('h:mm a');
    const template = jQuery('#message-template').html();
    const html = Mustache.render(template, {
        text: message.text,
        from: message.from,
        createdAt: formattedTime
    });

    jQuery('#messages').append(html);
    scrollToBottom();
});

// location message
socket.on('newLocationMessage', function (message) {
    const formattedTime = moment(message.createdAt).format('h:mm a');
    // the temnplate and all of its html
    const template = jQuery('#location-message-template').html();
    // the template and the data that needs to be passed through
    const html = Mustache.render(template, {
        from: message.from,
        url: message.url,
        createdAt: formattedTime
    });

    jQuery('#messages').append(html);
    scrollToBottom();
});

const messageTextbox = jQuery('[name=message')

jQuery('#message-form').on('submit', function (e) {
    e.preventDefault();

    socket.emit('createMessage', {
        from: 'User',
        text: messageTextbox.val()
    }, function () {
        messageTextbox.val('')
    });
});

const locationButton = jQuery('#send-location');
locationButton.on('click', function () {
    // if they're on an older browser
    if (!navigator.geolocation) {
        return alert('Geolocation not supported by your browser');
    }

    locationButton.attr('disabled', 'disabled').text('Sending location...');
    // if they accept
    navigator.geolocation.getCurrentPosition(function (position) {
        locationButton.removeAttr('disabled').text('Send location')
        socket.emit('createLocationMessage', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
        });
    }, function () {
    // if they deny permission
        locationButton.removeAttr('disabled').text('Send location');
        alert('Location access denied');
    })
});