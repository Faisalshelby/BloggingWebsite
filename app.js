// Load a .env file if one exists
require('dotenv').config()

const express = require("express");
const handlebars = require("express-handlebars");
const app = express();

// Listen port will be loaded from .env file, or use 3000 if
const port = process.env.EXPRESS_PORT || 3000;

const session = require("express-session");
app.use(session({
    resave: false,
    saveUninitialized: false,
    secret: "CS719"
}));

//making public directory available
const path = require("path");
app.use(express.static(path.join(__dirname, "public")));

// Setup Handlebars
app.engine("handlebars", handlebars.create({
    defaultLayout: "main"
}).engine);
app.set("view engine", "handlebars");

// Set up to read POSTed form data
app.use(express.urlencoded({ extended: true }));
app.use(express.json({}));


// TODO: Your app here
const loginRoutes = require("./routes/login_routes.js");
app.use(loginRoutes);

const appRoutes = require("./routes/application_routes.js");
app.use(appRoutes);

app.listen(port, function () {
    console.log(`Web final project listening on http://localhost:${port}/`);
});

