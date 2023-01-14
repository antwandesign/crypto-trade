const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.create = (userData) => User.create(userData);

exports.login = async (email, password) => {
	//Get User by username
	const user = await User.findOne({ email });

	//Error if user not found
	if (!user) {
		throw new Error("Invalid username or password");
	}
	//Check if password is valid
	const isValid = await bcrypt.compare(password, user.password);
	//Error if password is not valid
	if (!isValid) {
		throw new Error("Passwords don't match");
	}
	//Return User object
	return user;
};
exports.createToken = (user) => {
	//Token payload
	const payload = {
		_id: user._id,
		username: user.username,
		email: user.email,
	};
	//Create and Return Token Promise
	return new Promise((resolve, reject) => {
		jwt.sign(payload, "secret", { expiresIn: "1h" }, (err, token) => {
			if (err) {
				reject(err);
			} else {
				resolve(token);
			}
		});
	});
};
