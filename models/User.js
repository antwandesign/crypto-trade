const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
	username: {
		type: String,
		required: [true, "Username is required"],
		minLength: [5, "Username must be at least 5 characters long"],
	},
	email: {
		type: String,
		required: [true, "Address is required"],
		minLength: [10, "Username must be at least 10 characters long"],
	},
	password: {
		type: String,
		required: [true, "Password is required"],
	},
});

userSchema.pre("save", function (next) {
	bcrypt.hash(this.password, 10).then((hashedPassword) => {
		this.password = hashedPassword;
		next();
	});
});

const User = mongoose.model("User", userSchema);

module.exports = User;
