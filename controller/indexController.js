const response = require("../response");

exports.index = (req, res) => {
	response.status("Hello rest api", res);
};
