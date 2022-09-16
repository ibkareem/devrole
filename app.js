const express = require("express");
require("dotenv").config();
const { driver } = require("./api/driver/driver-routes");
const { connectDB } = require("./model/database-connector");
const { swaggerDocs } = require("./swagger");

connectDB();

const app = express();

const port = process.env.PORT || 3000;

app.use(express.json());

app.use("/driver", driver);

app.listen(port, () => {
  console.log(`Cab server is running on Port: ${port}`);
  swaggerDocs(app, port);
});
