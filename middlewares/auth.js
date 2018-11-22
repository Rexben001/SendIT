import jwt from 'jsonwebtoken';

class Auth {
    static verifyUser(req, res, next) {
        var token = req.headers['x-access-token'];
        if (token) {

            // verifies secret and checks exp
            jwt.verify(token, 'ertyuio', function (err, decoded) {
                if (err) {
                    return res.json({ success: false, message: 'Failed to authenticate token.' });
                } else {
                    // if everything is good, save to request for use in other routes
                    req.decoded = decoded;
                    next();
                }
            });
        }else{
        return res.json({
            success: false,
            message: 'No token provided.'
        });
    }

    }
}

export default Auth;