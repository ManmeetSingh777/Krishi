const jwt = require('jsonwebtoken')
require('dotenv').config()

const authenticateToken = (req, res, next) => {
    const token = req.headers['authorization'] && req.headers['authorization'].split(' ')[1]

    if (!token) {
        return res.status(401).json({ message: "User forbidden" })
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({ message: "User forbidden" })
        }
        req.user = user
        next()
    })
}

module.exports = authenticateToken