const mongoose = require("mongoose");

const DriverSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone_number: Number,
  license_number: String,
  car_number: String,
  verified: {
    type: Boolean,
    default: false
  },
  token: String,
  location:{
    type: {
        type: String,
        enum: ["Point"],
      },
      coordinates: {
        type: [Number],
        index: "2dsphere",
      },
  }
});

const driverModel = mongoose.model("drivers", DriverSchema);

module.exports = { driverModel };
