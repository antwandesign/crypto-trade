const jwt = require("jsonwebtoken");

exports.auth = (req, res, next) => {
	const token = req.cookies["user"];

	if (token) {
		jwt.verify(token, "secret", (err, decodedToken) => {
			if (err) {
				res.clearCookie("user");
				return next(err);
			}
			req.user = decodedToken;
			res.locals.user = decodedToken;

			next();
		});
	} else {
		next();
	}
};

exports.isAuth = (req, res, next) => {
	if (!req.user) {
		res.redirect("/auth/login");
	}
	next();
};

exports.isGuest = (req, res, next) => {
	if (req.user) {
		res.redirect("/");
	}
	next();
};
