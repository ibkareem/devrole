const { driverModel } = require("../model/driver-models/new-driver-model");
const {
  checkUniqueness,
  uniqueDriverModel,
} = require("../model/utils/unique-drivers");
const { token } = require("../utils/tokenizer");
const { sendVerificationMail } = require("../utils/verification-mailer");

async function createNewDriver(req, res) {
  const { driver } = res.locals;
  const { email, phone_number, license_number, car_number } = driver;
  if (phone_number.toString().length > 10) {
    console.error(
      `Phone number length error on request from ${req.socket.remoteAddress}`
    );
    return res
      .status(500)
      .json({ status: "failure", reason: "Internal Server Error" });
  }
  const unique = await checkUniqueness([
    email,
    phone_number.toString(),
    license_number,
    car_number,
  ]);
  if (unique.length !== 0) {
    console.error(
      `Uniqueness check failed on request from ${req.socket.remoteAddress}`
    );
    return res
      .status(500)
      .json({ status: "failure", reason: "Internal Server Error" });
  }
  const UniqueDriver = new uniqueDriverModel({
    uniqueDriver: [email, phone_number, license_number, car_number],
  });
  try {
    await UniqueDriver.save();
  } catch (error) {
    console.error(
      `Unable to save unique driver details to database on request from ${req.socket.remoteAddress}`
    );
    return res
      .status(500)
      .json({ status: "failure", reason: "Internal Server Error" });
  }
  driver.token = token.sign({ email: email });
  const NewDriver = new driverModel(driver);
  try {
    const driver = await NewDriver.save();
    const {
      _id: id,
      name,
      email,
      phone_number,
      license_number,
      car_number,
    } = driver;
    let data = { id, name, email, phone_number, license_number, car_number };
    res.json(data);
    const verificationLink = `${process.env.BASE_URL}/driver/verify?auth=${driver.token}`;
    const emailStatus = sendVerificationMail(name, email, verificationLink);
    console.log(await emailStatus);
    console.log(`New driver with Id ${driver._id}, created successfully`);
  } catch (error) {
    console.error(
      `Unable to save new driver details to database on request from ${req.socket.remoteAddress}`
    );
    return res
      .status(500)
      .json({ status: "failure", reason: "Internal Server Error" });
  }
}

module.exports = { createNewDriver };
