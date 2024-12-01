const jwt = require("jsonwebtoken");
const verifytoken = (req, res, next) => {
  let token;
  let authHeader = req.headers.Authorization || req.headers.authorization;
  if (authHeader && authHeader.startsWith("Bearer")) {
    token = authHeader.split(" ")[1];
    if (!token) {
      return res.status(401).json({
        message: "No token authorization",
      });
    }

    try {
      const decode = jwt.verify(token, process.env.JWT);
      req.user = decode;
      console.log("Decoded user is:", req.user);
      next()
    } catch (error) {
      res.status(400).json({
        message: "Token in not valid",
      });
    }
  }else{
    return res.status(401).json({
        message: "No token authorization",
      });
  }
};

module.exports = verifytoken;
