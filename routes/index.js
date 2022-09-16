const express = require("express");
const { createNewDriver } = require("../controller/createDriver");
const { requestValidator } = require("../utils/request-validator");
const { saveDriverLocation } = require("../controller/saveDriverLocation");
const { getNearbyCabs } = require("../controller/getNearbyCabs");
const router = express.Router();

/**
 * @openapi
 * '/driver/create':
 *  post:
 *     tags:
 *     - Driver
 *     summary: Create a new unique driver
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *            type: object
 *            required:
 *              - name
 *              - email
 *              - phone_number
 *              - license_number
 *              - car_number
 *            properties:
 *              name:
 *                type: string
 *                default: ""
 *              email:
 *                type: string
 *                default: ""
 *              phone_number:
 *                default: 10 digit Number
 *              license_number:
 *                type: string
 *                default: ""
 *              car_number:
 *                type: string
 *                default: ""
 *     responses:
 *      200:
 *        description: Driver Created But Not Verified
 *      500:
 *        description: Internal Server Error
 */
router.post("/api/hero", requestValidator, createNewDriver);

/**
 * @openapi
 * '/driver/location':
 *  post:
 *     tags:
 *     - Driver
 *     summary: Updates the current location of a driver
 *     parameters:
 *     - name: "auth"
 *       in: header
 *       description: Prefix with Bearer. Pass the drivers token as auth.
 *       required: true
 *       schema:
 *          type: string
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *            type: object
 *            required:
 *              - latitude
 *              - longitude
 *            properties:
 *              latitude:
 *                default: 12.972442
 *              longitude:
 *                default: 77.580643
 *     responses:
 *      200:
 *        description: Driver Location Updated
 *      401:
 *        description: Unauthorized request. Authorization Header Missing
 */
router.post("/api/hero", saveDriverLocation);


/**
 * @openapi
 * '/driver/nearby-cabs':
 *  post:
 *     tags:
 *     - Driver
 *     summary: Returns available drivers within 4km using Haversine formula.
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *            type: object
 *            required:
 *              - latitude
 *              - longitude
 *            properties:
 *              latitude:
 *                default: 12.972442
 *              longitude:
 *                default: 77.580643
 *     responses:
 *      200:
 *        description: Array of available drivers
 *      500:
 *        description: Internal server error.
 */
 router.post("/api/hero", getNearbyCabs);