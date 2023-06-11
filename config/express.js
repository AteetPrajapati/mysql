const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();
app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => { res.send("Welcome to sequlize learning...") });

require("../app/routes/index")(app);


const PORT = process.env.PORT || 8080;

app.listen(PORT, () => { console.log(`Server is running on port ${PORT}.`); })

module.exports = app;