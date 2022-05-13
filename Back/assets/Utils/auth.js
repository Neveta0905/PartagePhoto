const jwt = require('jsonwebtoken');

exports.all = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.TOKEN_CRYPTER);
    const userId = decodedToken.userId.toString();
    console.log(userId)
    if (!req.body.userId || req.body.userId !== userId) {
      throw 'Invalid user ID';
    } else {
      next();
    }
  } catch {
    res.status(403).json({
      error: 'Unauthorized request'
    });
  }
};

exports.admin = (req, res, next) => { // Faut envoyer authorization : token + role:2 + id correspondant au token
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.TOKEN_CRYPTER);
    const userId = decodedToken.userId.toString();
    const userRole = decodedToken.userRole.toString();

    if (!req.body.userId || req.body.userId !== userId) {
      throw 'Invalid user ID';
    }
    else if (userRole != 2) {
      throw 'Need Administrator access';
    } else {
      next();
    }
  } catch {
    res.status(403).json({
      error: 'Unauthorized request'
    });
  }
};

exports.GetMyId = (key) => {
  const token = key.split(' ')[1];
  const decodedToken = jwt.verify(token, process.env.TOKEN_CRYPTER);
  const userId = decodedToken.userId;
  return userId
}
