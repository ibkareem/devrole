const express = require("express");
const { createNewDriver } = require("../../controller/createDriver");
const { getNearbyCabs } = require("../../controller/getNearbyCabs");
const { saveDriverLocation } = require("../../controller/saveDriverLocation");
const { verifyDriverEmail } = require("../../controller/verifyDriverEmail");
const { requestValidator } = require("../../utils/request-validator");

/**
 * api routes for a cab driver.
 * @routes /create,
 */

const driver = express.Router();

driver.post("/create", requestValidator, createNewDriver);

driver.get("/verify", verifyDriverEmail);

driver.post("/location", saveDriverLocation);

driver.get('/nearby-cabs', getNearbyCabs)

module.exports = { driver };
