const { getErrorMessage } = require("../utils/errorHelpers");

exports.errorHandler = (err, req, res, next) => {
	const status = err.status || 404;
	res.render("404", { error: getErrorMessage(err) });
};
