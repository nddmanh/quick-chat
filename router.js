const express = require('express');
const router = express.Router();
const { checkLogin, checkLogout } = require('./middleware');

router.get('/', (req, res) => {
    return res.redirect('/home');
});

router.get('/home', checkLogin, (req, res) => {
    return res.render('home');
});

router.get('/login', checkLogout, (req, res) => {
    return res.render('login');
});

router.get('/logout', checkLogin, (req, res) => {
    res.clearCookie("user");
    return res.redirect('/login');
});

router.post('/login', (req, res) => {
    let username = req.body.username;
    let password = req.body.password;

    if (username === process.env.USERNAME1 && password === process.env.PASSWORD) {
        res.cookie("user", "n");
        return res.redirect("/home");
    }
    if (username === process.env.USERNAME2 && password === process.env.PASSWORD) {
        res.cookie("user", "m");
        return res.redirect("/home");
    }

    return res.redirect("/login");
});

module.exports = router;
