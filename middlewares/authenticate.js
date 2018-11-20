import jwt from 'jsonwebtoken';
import config from '../config';

class Auth {
    static authLogin(req, res, next) {

        jwt.sign({ user: req.body }, config.secret, { expiresIn: 86400 }, (err, token) => {
            return res.json({
                token: token
            });
        });
        next();
    }

    static authUser(req, res, next) {

        let token = req.headers['x-access-token'] || req.headers['authorization'];
        if (token.startsWith('Bearer ')) {
            token = token.slice(7, token.length);
        }
        if (token){
            jwt.verify(token, config.secret, function (err, decoded) {
                if (err) {
                    return res.status(500).send({
                        auth: false,
                        message: 'Failed to authenticate token.'
                    });
                } else {
                    res.status(200).send(decoded);
                }
                next();
            });
        }
        return res.status(401).send({
            auth: false, message: 'No token provided.'
        });
        
        }
    

}



// function verifyToken(req, res, next) {
//     const bearerHeader = req.headers['authorization'];
//     if (typeof bearerHeader !== 'undefined') {
//         const bearer = bearerHeader.split(' ');
//         const bearerToken = bearer[1];

//         req.token = bearerToken;

//         next();
//     } else {
//         res.status(403);
//     }
// }

export default Auth;