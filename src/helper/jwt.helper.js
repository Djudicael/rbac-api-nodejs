import JWT from 'jsonwebtoken';
import createError from 'http-errors'
import client from './init_redis.js';

export const signAccessToken = (userId) => {
    return new Promise((resolve, reject) => {

        // PAYLOAD
        // var payload = {
        //     name: user.firtsName,
        //     email: user.email,
        //     roles: user.roles
        // };
        // // PRIVATE and PUBLIC key
        // // var privateKEY  = fs.readFileSync('./private.key', 'utf8');
        // // var publicKEY  = fs.readFileSync('./public.key', 'utf8');
        // const issuer = 'Issuer';          // Issuer 
        // const subject = user.id;        // Subject 
        // //const audience  = 'http://test.fr'; // Audience
        // // SIGNING OPTIONS
        // var signOptions = {
        //     issuer: issuer,
        //     subject: subject,
        //     //audience:  a,
        //     expiresIn: "6h",
        //     //algorithm: "RS256"
        // };
        // //_key

        // const signature = 'balbale78755_$^^ù';
        // //const expiration = '6h';

        const payload = {
            name: "amazing"
        };

        const secret = process.env.ACCESS_TOKEN_SECRET;
        const options = {
            expiresIn: "1h",
            issuer: "djmxCreation",
            audience: userId.toString(),
            subject: userId.toString()
        }



        JWT.sign(payload, secret, options, (err, token) => {
            if (err) {
                console.error(err.message);
                //reject(err);
                return reject(createError.InternalServerError());
            }

            resolve(token);
        })
    })
}


export const signRefreshToken = (userId) => {
    return new Promise((resolve, reject) => {

        var payload = {

        };

        const secret = process.env.REFRESH_TOKEN_SECRET;
        const options = {
            expiresIn: "1y",
            issuer: "djmxCreation",
            audience: userId.toString()
        }

        JWT.sign(payload, secret, options, (err, token) => {
            if (err) {
                console.error(err.message);
                return reject(createError.InternalServerError());
            }

            const expiresIn = 365 * 24 * 60 * 60;// here its for 1 years  but should be modify for less time if needed
            client.SET(userId, token, 'EX', expiresIn, (err, reply) => {
                if (err) {
                    console.error(err.message);
                    return reject(createError.InternalServerError());
                }
                resolve(token);
            })

        })
    })
}


export const verifAccessToken = (req, res, next) => {
    if (!req.headers['authorization']) {
        return next(createError.Unauthorized())
    }

    const authHeader = req.headers['authorization'];
    const bearerToken = authHeader.split(' ');
    const token = bearerToken[1];
    JWT.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, payload) => {
        if (err) {

            const message = err.name === 'JsonWebTokenError' ? 'Unauthorized' : err.message;
            return next(createError.Unauthorized(message));

        }
        req.payload = payload;
        next();
    })
}


export const verifRefreshToken = (refreshToken) => {
    return new Promise((resolve, reject) => {
        JWT.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, payload) => {
            if (err) {
                return reject(createError.Unauthorized())
            }

            const userId = payload.aud;
            client.GET(userId,(err,result)=>{
                if (err){
                    console.error(err.message);
                    return reject(createError.InternalServerError());
                }

                if(refreshToken===result){
                    return resolve(userId);
                }

                return reject(createError.Unauthorized());
            })
            
        })
    })
}