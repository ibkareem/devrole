const Joi = require("joi");

const schema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email(),
  phone_number: Joi.number().integer(),
  license_number: Joi.string(),
  car_number: Joi.string(),
});

/**
 *
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */

async function requestValidator(req, res, next) {
  try {
    res.locals.driver = await schema.validateAsync(req.body);
    next();
  } catch (error) {
    console.error("Invalid Request Body");
    return res
      .status(500)
      .json({ status: "failure", reason: "Internal Server Error" });
  }
}

module.exports = { requestValidator };
