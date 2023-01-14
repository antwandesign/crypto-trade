const mongoose = require("mongoose");

const cryptoSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		minLength: [2, "Name must be at least 2 characters long"],
	},
	image: {
		type: String,
		required: true,
		validate: {
			validator: function (value) {
				new URL(value);
			},
			message: (props) => `${props.value} must be a postive number`,
		},
	},
	price: {
		type: Number,
		required: true,
		validate: {
			validator: function (value) {
				return value > 0;
			},
			message: (props) => `${props.value} must be a postive number`,
		},
	},
	description: {
		type: String,
		required: true,
		minLength: [10, "Description must be at least 10 characters long"],
	},
	paymentMethod: {
		type: String,
		enum: ["crypto-wallet", "credit-card", "debit-card", "paypal"],
		message: "{VALUE} is not supported",
		required: true,
	},
	owner: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
	},
	buyers: {
		type: [mongoose.Schema.Types.ObjectId],
		ref: "User",
	},
});

const Crypto = mongoose.model("Crypto", cryptoSchema);
module.exports = Crypto;
