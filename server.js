const bodyParser = require("body-parser");
const express = require("express");

const app = express();
const port = process.env.PORT || 3500;

// app.get("/", (req, res) => {
// 	res.send("Hello man");
// });

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

const routes = require("./settings/routes");

routes(app);

app.listen(port, () => {
	// eslint-disable-next-line no-console
	console.log(`App listen on port ${port}`);
});
