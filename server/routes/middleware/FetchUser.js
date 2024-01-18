var jwt = require("jsonwebtoken");

const fetchuser = (req, res, next) => {

  const authHeader = req.header("Authorization");

  if (!authHeader) {
    return res.status(401).send({ error: "Please use a valid token" });
  }

  if (!authHeader.startsWith('Bearer ')) {
    return res.status(401).send({ error: "Please use a valid token" });
  }

  const token = authHeader.substring(7);

  try {
    const data = jwt.verify(token, process.env.JWT_SECRET);

    req.user = data.user;

    next();
  } catch (error) {
    res.status(401).send({ error: "Please use a valid token" });
  }
};

module.exports = fetchuser;


module.exports = fetchuser;
