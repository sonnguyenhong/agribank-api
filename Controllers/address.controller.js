const Address = require('../Models/address.model')

const validateAddress = async (address) => {
    url = "https://provinces.open-api.vn/api/?depth=3"
    raw = await fetch(url)
    data = await raw.json()
    let provinceIndex = -1
    let districtIndex = -1
    let wardIndex = -1
    // console.log(data)
    for(let i = 0 ; i < data.length ; i++) {
        if(data[i].name === address.province) {
            provinceIndex = i
            break;
        }
    }
    console.log("p index: ", provinceIndex)
    if(provinceIndex === -1) {
        return false
    }

    const districts = data[provinceIndex].districts

    for(let i = 0 ; i < districts.length ; i++) {
        if(districts[i].name === address.district) {
            districtIndex = i
            break
        }
    }
    console.log("d index", districtIndex)
    if(districtIndex === -1) {
        return false
    }

    const wards = districts[districtIndex].wards
    for(let i = 0 ; i < wards.length ; i++) {
        if(wards[i].name === address.ward) {
            wardIndex = i
            break
        }
    }

    console.log("w index", wardIndex)
    if(wardIndex === -1) {
        return false
    }

    return true
}


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

        const address = {
            province: req.body.city,
            district: req.body.district,
            ward: req.body.ward,
            description: req.body.description
        }
        
        const isValidAddress = await validateAddress(address)

        try {
            if(isValidAddress) {
                const result = await Address.create({
                    type: req.body.type,
                    district: req.body.district,
                    city: req.body.city,
                    description: req.body.district + ' ' + req.body.city
                })
                res.json({
                    message: 'Tạo địa chỉ thành công',
                    data: result.dataValues
                })
            }
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
            const isValidAddress = await validateAddress({
                province: req.body.city,
                district: req.body.district,
                ward: req.body.ward
            })
            if(isValidAddress) {
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
            }

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
            const isValidAddress = await validateAddress({
                province: req.body.city,
                district: req.body.district,
                ward: req.body.ward
            })
            if(isValidAddress) {
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
            }
        } catch (error) {
            res.json({
                errorMessage: 'Lỗi tìm kiếm'
            })
        }


    }


}

module.exports = new AddressController