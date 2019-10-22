const express = require("express");
const handlebar = require("express-handlebars");
const mongoose = require('mongoose');
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/classact";

const app = express();
const PORT = process.env.PORT || 1337;

//mongoose.connect("mongodb://localhost/unit18Populater", { useNewUrlParser: true });

app.use(express.json());
app.use(express.static("public"));

app.engine("handlebars", handlebar({ defaultLayout: "main" })); //set up handlebars
app.set("view engine", "handlebars");


mongoose.connect(MONGODB_URI, { useNewUrlParser: true });

require("./routing/apiRoutes")(app);
require("./routing/htmlRoutes")(app);

app.listen(PORT, function() {
    console.log(
      "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
      PORT,
      PORT
    );
  });