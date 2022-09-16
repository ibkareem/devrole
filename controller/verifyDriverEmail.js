const { driverModel } = require("../model/driver-models/new-driver-model");
const { token } = require("../utils/tokenizer");

async function verifyDriverEmail(req, res) {
  const { auth } = req.query;
  var email;
  try {
    const authStatus = token.verify(auth);
    email = authStatus.email  
  } catch (error) {
    console.error(`Invalid token from ${req.socket.remoteAddress}`)
    return res
      .status(500)
      .json({ status: "failure", reason: "Internal Server Error" });
  }
  try{
    await driverModel.findOneAndUpdate({email: email}, {verified: true});
    res.json({status: "success", message: "Email verified successfully"})
  }
  catch(error){
    console.error(`Unable to update verified status for ${email} request from: ${req.socket.remoteAddress}`)
    res
      .status(500)
      .json({ status: "failure", reason: "Internal Server Error" });
  }
}

module.exports = { verifyDriverEmail };
