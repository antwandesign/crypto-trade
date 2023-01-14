const Crypto = require("../models/Crypto");

exports.create = (publicationData) => Crypto.create(publicationData);
exports.getAll = () => Crypto.find();
exports.getOne = (id) => Crypto.findById(id);
exports.getOneDetailed = (id) => Crypto.findById(id).populate("owner");
exports.update = (publicationId, publicationData) => {
	return Crypto.updateOne(
		{ _id: publicationId },
		{ $set: publicationData },
		{ runValidators: true }
	);
};
exports.buy = (publicationId, userId) => {
	return Crypto.findOneAndUpdate(
		{ _id: publicationId },
		{ $push: { buyers: userId } }
	);
};

exports.delete = (publicationId, userId) => {
	return Crypto.deleteOne({ _id: publicationId });
};

exports.search = (query, paymentMethod) => {
	return Crypto.find({ name: query, paymentMethod: paymentMethod });
};
