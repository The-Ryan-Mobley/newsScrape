const express = require("express");
const handlebar = require("express-handlebars");

const app = express();
const PORT = process.env.PORT || 1337;

app.use(express.json());
app.use(express.static("public"));

app.engine("handlebars", handlebar({ defaultLayout: "main" })); //set up handlebars
app.set("view engine", "handlebars");

require("./routing/htmlRoutes")(app);

app.listen(PORT, function() {
    console.log(
      "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
      PORT,
      PORT
    );
  });