import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

class Auth {
  static verifyUser(req, res, next) {
    const token = req.headers['x-access-token'];
    if (token) {
      // verifies secret and checks exp
      jwt.verify(token, process.env.SECRETKEY, (err, decoded) => {
        if (err) {
          return res.json({ success: false, message: 'Failed to authenticate token.' });
        }
        // if everything is good, save to request for use in other routes
        req.decoded = decoded;
        next();
      });
    } else {
      return res.json({
        success: false,
        message: 'No token provided.'
      });
    }
  }
}

export default Auth;
