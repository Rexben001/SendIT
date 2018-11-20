import jwt from 'jsonwebtoken';

class Auth{
    static authUser(req, res, next){

        jwt.sign({user: req.body}, 'secretkey', {expiresIn: 86400}, (err, token) =>{
            return res.json({
                token: token
            });
            next();
        }); 
    }

    static authLogin(req, res,next){

        const token = req.headers['x-access-token'];
        if (!token) return res.status(401).send({ 
            auth: false, message: 'No token provided.' });
        jwt.verify(token, 'secretkey', function(err, decoded) {
            if (err) return res.status(500).send({
                 auth: false, message: 'Failed to authenticate token.'
                 });
            
            res.status(200).send(decoded);
          });
          next();
        }
    }


function verifyToken(req, res, next){
    const bearerHeader = req.headers['authorization'];
    if(typeof bearerHeader !== 'undefined'){
        const bearer = bearerHeader.split(' ');
        const bearerToken = bearer[1];

        req.token = bearerToken;

        next();
    }else{
        res.status(403);
    }
}

export default Auth;