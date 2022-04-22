const Address = require('../Models/address.model')

class AddressController {
    async addAddress(req, res) {
        if (!req.body.type) {
            res.json({
                errorMessage: 'Bạn chưa nhập loại địa chỉ (ATM hay Phòng giao dịch)'
            })
        }
        if (!req.body.district) {
            res.json({
                errorMessage: 'Bạn chưa nhập huyện'
            })
        }
        if (!req.body.city) {
            res.json({
                errorMessage: 'Bạn chưa nhập tên thành phố'
            })
        }

        try {
            const address = await Address.create({
                type: req.body.type,
                district: req.body.district,
                city: req.body.city,
                description: req.body.district + ' ' + req.body.city
            })
            res.json({
                message: 'Tạo địa chỉ thành công',
                data: address.dataValues
            })
        } catch (error) {
            res.json({
                errorMessage: 'Tạo địa chỉ không thành công'
            })
        }
    }

    async editAddress(req, res) {
        if (!req.body.id_address) {
            res.json({
                errorMessage: 'Chưa xác định địa chỉ cần sửa'
            })
        }

        if (!req.body.type) {
            res.json({
                errorMessage: 'Bạn chưa nhập loại địa chỉ (ATM hay Phòng giao dịch)'
            })
        }

        if (!req.body.district) {
            res.json({
                errorMessage: 'Bạn chưa nhập huyện'
            })
        }
        if (!req.body.city) {
            res.json({
                errorMessage: 'Bạn chưa nhập tên thành phố'
            })
        }

        try {
            const newAddress = await Address.update({
                type: req.body.type,
                district: req.body.district,
                city: req.body.city,
                description: req.body.district + ' - ' + req.body.city
            }, {
                where: {
                    id: req.body.id_address
                }
            })

            res.json({
                message: 'Sửa địa chỉ thành công',
                data: {
                    id: req.body.id_address,
                    type: req.body.type,
                    district: req.body.district,
                    city: req.body.city,
                    description: req.body.district + ' - ' + req.body.city
                }
            })
        } catch (error) {
            res.json({
                errorMessage: 'Lỗi sửa địa chỉ'
            })
        }
    }

    async findAddress(req, res) {
        if (!req.body.district) {
            res.json({
                errorMessage: 'Bạn chưa nhập huyện'
            })
        }
        if (!req.body.city) {
            res.json({
                errorMessage: 'Bạn chưa nhập tên thành phố'
            })
        }
        if (!req.body.type) {
            res.json({
                errorMessage: 'Bạn chưa nhập loại địa chỉ (ATM hay Phòng giao dịch)'
            })
        }

        try {
            const addresses = await Address.findAll({
                raw: true,
                where: {
                    type: req.body.type,
                    district: req.body.district,
                    city: req.body.city
                }
            })
            res.json({
                message: 'Tìm kiếm thành công',
                data: addresses
            })
        } catch (error) {
            res.json({
                errorMessage: 'Lỗi tìm kiếm'
            })
        }


    }


}

module.exports = new AddressController