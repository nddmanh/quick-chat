require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const path = require('path');
const cookieParser = require('cookie-parser');
const userRoute = require('./router');

// Set up socket.io
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

// Set up EJS
app.set('view engine', 'ejs');
app.set('views', './views');
app.use(express.static(path.join(__dirname, 'public')));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(cookieParser());

// Router
app.use('/', userRoute);

io.on('connection', (socket) => {
    console.log('A user connected');
    socket.broadcast.emit("user-online");

    socket.on("send-message", function(msg) {
        socket.broadcast.emit("response-msg", msg);
    })

    socket.on('disconnect', () => {
        socket.broadcast.emit("user-offline");
    });
});

server.listen(port, () => {
  console.log(`Server running in http://localhost:${port}`);
})

