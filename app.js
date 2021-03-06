const express   = require('express');
const app       = express();
const http      = require('http');
const server    = http.createServer(app);
const socketIO  = require('socket.io')(server); //hello I am new

const LISTEN_PORT = 8080; //make sure greater than 3000. Some ports are reserved/blocked by firewall ...

app.use((express.static(__dirname + '/public'))); //set root dir to the public folder

//routes
app.get('/color', function(req,res) {
    res.sendFile(__dirname + '/public/color.html');
});

app.get('/controller', function(req,res) {
    res.sendFile(__dirname + '/public/controller.html');
});

//websocket stuff
socketIO.on('connection', function(socket) {
    console.log(socket.id + ' has connected!');

    socket.on('disconnect', function(data) {
        console.log(socket.id + ' has disconnected');
    });

    //custom events
    //socket = one client
    //socketIO.sockets = all clients
    socket.on('red', function(data) {
        console.log('red event heard');
        socketIO.sockets.emit('red', {r:255, g:0, b:0});
    });

    socket.on('orange', function(data) {
        console.log('orange event heard');
        socketIO.sockets.emit('orange', {r:255, g:165, b:0});
    });

    socket.on('yellow', function(data) {
        console.log('yellow event heard');
        socketIO.sockets.emit('yellow', {r:255, g:255, b:0});
    });

    socket.on('green', function(data) {
        console.log('green event heard');
        socketIO.sockets.emit('green', {r:0, g:255, b:0});
    });

    socket.on('blue', function(data) {
        console.log('blue event heard');
        socketIO.sockets.emit('blue', {r:0, g:0, b:255});
    });

    socket.on('purple', function(data) {
        console.log('purple event heard');
        socketIO.sockets.emit('purple', {r:128, g:0, b:128});
    });

     // passing 1 to the delete target function in controller
    socket.on('remove', function(data) {  
        console.log('player has hit the target');
        socketIO.sockets.emit('addPoints', 1);
        
    });

    socket.on('end', function(data) {
        console.log('end event heard');
        socketIO.sockets.emit('end', {r:255, g:0, b:0});
    });

});

//finally, start server
server.listen(LISTEN_PORT);
console.log('listening to port: ' + LISTEN_PORT);