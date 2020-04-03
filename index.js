const express = require("express");
// path = require('path'),
// morgan = require('morgan'),
const bodyParser = require("body-parser");
const fs = require("fs");
const app = express();
var flash = require("connect-flash");
const session = require("express-session");
app.use(bodyParser());

// importing routes
const livreRoutes = require("./route/router");

// settings
app.set("port", process.env.PORT || 3000);
// app.set('views', path.join(__dirname, 'views'));
app.set("view engine", "ejs");
app.use(
  session({
    secret: "somme secret",
    cookie: { maxAge: 60000 }
  })
);
// routes
app.use(flash());
app.use("/", livreRoutes);

// starting the server
app.listen(app.get("port"), () => {
  console.log(`server on port ${app.get("port")}`);
});
