var jwt = require('jsonwebtoken');
const JWT_SECRET = 'aliis$boy';

const fetchUser = (req, res, next) =>{
    const token = req.header('auth-token');
    if(!token){
        return res.status(400).send({ error: 'Please auth with valid token' });
    }
    try {
        const data = jwt.verify(token, JWT_SECRET);
        req.User = data.User;
        next();
    } catch (error) {
        return res.status(400).send({ error: 'Please auth with valid token' });
    }
}

module.exports = fetchUser;