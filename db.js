const dbPort = "mongodb://localhost:27017/crypto-project";
const mongoose = require("mongoose");

exports.dbInit = () => {
	mongoose.connection
		.on("connected", () => {
			console.log("Connected to database");
		})
		.on("error", (err) => {
			console.log(err);
		});

	return mongoose.connect(dbPort);
};
