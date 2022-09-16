const { driverModel } = require("../model/driver-models/new-driver-model");
const { token } = require("../utils/tokenizer");

async function saveDriverLocation(req, res) {
  const { latitude, longitude } = req.body;
  let { authorization, auth } = req.headers;
  if(!authorization && !auth){
    console.error(`Unauthorized request. Missing Token in request header`);
    return res
      .status(401)
      .json({ status: "failure", reason: "Internal Server Error" });
  }
  authorization = auth ? auth : authorization;

  authorization = token.extract(authorization);
  let driver;
  try {
    driver = token.verify(authorization);
  } catch (error) {
    console.error(`Unauthorized request. Invalid Token in authorization header`);
    return res
      .status(401)
      .json({ status: "failure", reason: "Internal Server Error" });
  }
  try {
    await driverModel.findOneAndUpdate(
      { email: driver.email },
      { 'location.coordinates': [longitude, latitude] }
    );
    res.json({ status: "success" });
  } catch (error) {
    return res
      .status(500)
      .json({ status: "failure", reason: "Internal Server Error" });
  }
}

module.exports = { saveDriverLocation };
