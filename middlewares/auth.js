const jwt = require("jsonwebtoken");
module.exports = function(req, res, next) {
  const token = req.header("x-auth-token");
  if (!token) return res.status(401).send("Access Denied No Token Found");
  try {
    const payload = jwt.verify(token,process.env.JWTKEY);
    req.user = payload;
    console.log(payload);
    next();
  } catch (ex) {
    res.status(401).send("Invalid Token");
  }
};
