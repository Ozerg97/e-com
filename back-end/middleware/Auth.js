const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const User = require("../models/User1");

const protect = asyncHandler(async (req, res, next) => {
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

      // Assurez-vous que l'ID du token correspond à celui utilisé dans le modèle User (id ou _id)
      req.user = await User.findById(decodedToken.id || decodedToken._id).select("-password");

      if (!req.user) {
        res.status(401);
        throw new Error("Not authorized, user not found");
      }

      // Vérifier si l'utilisateur a bien vérifié son email
      if (!req.user.isVerified) {
        res.status(401);
        throw new Error("Please verify your email before accessing this resource");
      }

      next();
    } catch (err) {
      console.log("Error in auth middleware:", err.message);
      res.status(401);
      throw new Error("Not authorized, token failed");
    }
  } else {
    res.status(401);
    throw new Error("Not authorized, no token");
  }
});

module.exports = protect;
