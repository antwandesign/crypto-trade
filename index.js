//Constants
const PORT = 3000;
const routes = require("./router/routes");
const { dbInit } = require("./db");
const { auth } = require("./middlewares/authMiddleware");
const { errorHandler } = require("./middlewares/errorHandlerMiddleware");

//Creating a server
const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");

//Express Handlebars
const hbs = require("express-handlebars");
app.engine("hbs", hbs.engine({ extname: "hbs" }));
app.set("view engine", "hbs");

//Body parser and static files
app.use(express.urlencoded({ extended: false }));
app.use(express.static(__dirname + "/public"));

//Use cookie parser
app.use(cookieParser());

//User validation
app.use(auth);

//Setup Routes
app.use(routes);

//Use error handler for 404 pages
app.use(errorHandler);

//Start DB
dbInit();

//Start server
app.listen(PORT, () => {
	console.log("Server is running on port " + PORT);
});
