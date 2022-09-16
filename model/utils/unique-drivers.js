const mongoose = require("mongoose");

const UniqueDriverSchema = new mongoose.Schema({
  uniqueDriver: [String],
});

const uniqueDriverModel = mongoose.model("uniqueDrivers", UniqueDriverSchema);

async function checkUniqueness(fields) {
  const uniqueness = uniqueDriverModel.aggregate(
    [{
      $match: {
        uniqueDriver: {
          $in: fields,
        },
      },
    }],
  );
  return uniqueness
}

module.exports = { uniqueDriverModel, checkUniqueness };

