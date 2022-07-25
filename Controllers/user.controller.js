const multer = require('multer')
const User = require('../Models/user.model')

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './Uploads')
    },
    filename: function(req, file, cb) {
        cb(null, file.originalname + '-' + Date.now())
    }
})


class UserController {

    uploadImg = multer({ storage: storage }).single('avatar')

    async updateAvatar(req, res) {
        try {
            const user = await User.update({
                avatar: req.file.path
            }, {
                where: {
                    id: req.body.user_id
                }
            })
            res.json({
                message: 'Đổi avatar thành công',
                user_data: {
                    avatar_url: req.file.path
                }
            })
        } catch (error) {
            res.json({
                errorMessage: 'Đổi avatar không thành công'
            })
        }
    }

}

module.exports = new UserController