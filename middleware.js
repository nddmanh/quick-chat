const checkLogin = (req, res, next) => {
    let user = req.cookies.user;

	if (!user) {
        return res.redirect('/login');
    }

	try {
		next();
	} catch (error) {
		console.log(error);
        return false;
	}
}

const checkLogout = (req, res, next) => {
    let user = req.cookies.user;

	if (user) {
        return res.redirect('/home');
    }

	try {
		next();
	} catch (error) {
		console.log(error);
        return false;

	}
}

module.exports = {
    checkLogin,
    checkLogout
}