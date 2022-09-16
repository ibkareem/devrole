const { driverModel } = require("../model/driver-models/new-driver-model");

async function getNearbyCabs(req, res) {
  const { latitude, longitude } = req.body;
    try {
        const drivers = await driverModel.aggregate([
            {
              $geoNear: {
                near: {
                  type: "Point",
                  coordinates: [longitude, latitude],
                },
                distanceField: "calcDistance",
                maxDistance: 4000,
                query: {},
                spherical: true,
              },
            },
            {
                $project: {
                  _id: 0,
                  name: 1,
                  car_number: 1,
                  phone_number: 1,
                },
              },
          ]);
          if (drivers.length === 0) {
            return res.json({
              message: "No cabs available!",
            });
          }
          res.json({
                "available_cabs": drivers
            })
    } catch (error) {
        console.error(`Error while getting nearby cabs. ${error}`)
        res.status(500).json({status: "failure", message: "Internal Server Error"})
    }
  

}

module.exports = { getNearbyCabs };
