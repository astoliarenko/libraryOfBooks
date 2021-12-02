const bodyParser = require("body-parser");
const express = require("express");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 3500;

app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

const routes = require("./settings/routes");

routes(app);

const start = () => {
	try {
		app.listen(port, () => console.log(`App listen on port ${port}`));
	} catch(e) {
		console.log(e);
	}
}

start();
