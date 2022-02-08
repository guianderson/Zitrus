const jwt = require('jsonwebtoken')

const authMiddleware = (request, response, next) => {
    let token = request.headers.authorization
    
    if(token) {
        token = token.split(' ')[1]
            
        jwt.verify(token, process.env.JWT_SECRET, (err, payload) => {
            if (err) {
                return response.status(403).json({msg: 'Token inválido'});
            }
            request.payload = payload;
            next();
        });
    } else {
        return response.status(403).json({msg: 'Token inválido'});
    }

};

export default authMiddleware