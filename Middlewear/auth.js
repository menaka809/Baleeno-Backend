import jwt from 'jsonwebtoken';

export const verifyJWT = (req, res, next) => {
    const token = req.headers['x-access-token']?.split(' ')[1]

    if (token) {
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                return res.json({ 
                    isLoggedIn: false,
                    message: "Failed to authenticate"
                })
            }
            req.user= {};
            req.user.id = decoded.id;
            req.user.name = decoded.name;
            next();
        }) 
    } else {
        return res.json({
            isLoggedIn: false,
            message: "Invalid token"
        })
    }
}