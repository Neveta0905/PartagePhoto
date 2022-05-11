const jwt = require('jsonwebtoken');

exports.all = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.TokenCrypter);
    const userId = decodedToken.userId.toString();
    req.auth = { userId }

    if (req.body.userId && req.body.userId !== userId) {
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
