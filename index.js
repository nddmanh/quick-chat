require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const path = require('path');
const cookieParser = require('cookie-parser');

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
app.get('/', (req, res) => {
    if (req.cookies.user) {
        res.render('home');
        return;
    }
    res.redirect('/login');
});

app.get('/login', (req, res) => {
    if (!req.cookies.user) {
        res.render('login');
        return;
    }
    res.redirect('/');
});

app.post('/login', (req, res) => {
    let username = req.body.username;
    let password = req.body.password;

    if (username === process.env.USERNAME1 && password === process.env.PASSWORD) {
        res.cookie("user", "n");
        res.redirect("/");
        return;
    }
    if (username === process.env.USERNAME2 && password === process.env.PASSWORD) {
        res.cookie("user", "m");
        res.redirect("/");
        return;
    }

    res.redirect("/login");
});

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

