const jwt = require("jsonwebtoken");
// models
const CONFIG = require("../../config.json");
const signupService = require("../../services/auth.services");

exports.authMiddleware = async (req, res, next) => {
  // console.log("---------");
  if (
    !req.headers.authorization ||
    !req.headers.authorization.startsWith("Bearer") ||
    !req.headers.authorization.split(" ")[1]
  ) {
    return res.status(401).json({
      success: false,
      message: "Please provide the token",
    });
  }
  const accessToken = req.headers.authorization.split(" ")[1];
  // console.log(accessToken, "___________accesstoken");
  try {
    const decoded = jwt.verify(accessToken, CONFIG.FRONTEND_JWT_SECRET);
    // console.log(decoded, "decoded tokemn");
    // req.userId = decoded.userId;
    const user = await signupService.findOne(decoded._id);
    if (!user)
      return res.status(401).json({
        success: false,
        message: "user not found with provided token!!",
      });
    req._user = user;
    return next();
  } catch (error) {
    return res.status(200).json({ success: false, message: error.message });
  }
};
