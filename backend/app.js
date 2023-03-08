const express = require("express");
require("dotenv").config();
const morgan = require("morgan");

// import routes
const routerApi = require("./routes");
// import middlewares
const { errorHandler, notFound } = require("./middlewares");
// import database
const db = require("./database/models");

// API config
const app = express();
const port = process.env.PORT || 8080;
app.use(express.json());
app.use(morgan("dev", { skip: (req, res) => process.env.NODE_ENV === "test" }));

// API routes
app.get("/", (req, res) => {
  res.send("Marketplace Used Cars");
});
// load routes
routerApi(app);

// handle errors
app.use(notFound);
app.use(errorHandler);

const startApi = async () => {
  console.log("Testing the database connection...");
  try {
    await db.sequelize.authenticate();
    console.log("Database authentication successfully");
    await db.sequelize.sync({ force: false, logging: false });
    console.log("Database synchronized");
    if (process.env.NODE_ENV !== "test") {
      // fix the port collision when testing
      app.listen(port, () => console.log(`Server start on port ${port}`));
    }
  } catch (error) {
    console.log("Unable to connect to the database \n", error);
  }
};

startApi();

module.exports = app;
