const jwt = require('jsonwebtoken')

const verifyToken = (req, res, next) => {
    const token = req.body.token || req.query.token || req.headers['x-access-token']

    if (!token) {
        res.json({
            errorMessage: 'Bạn chưa được xác thực, cần đăng nhập để thực hiện'
        })
    }

    try {
        const decoded = jwt.verify(token, process.env.TOKEN_KEY)
        req.user = decoded
    } catch (error) {
        res.json({
            errorMessage: 'Bạn chưa được xác thực, cần đăng nhập để thực hiện'
        })
    }
    next()
}

module.exports = verifyToken