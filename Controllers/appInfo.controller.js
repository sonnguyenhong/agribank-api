const express = require('express')
const AppInfo = require('../Models/appInfo.model')

class AppInfoController {

    async getInfo(req, res) {
        try {
            const appInfo = await AppInfo.findAll()
            console.log(appInfo)
            res.json({
                message: 'Lấy thông tin ứng dụng thành công',
                data: appInfo[0]
            })
        } catch (error) {
            res.json({
                errorMessage: 'Không thể lấy thông tin của ứng dụng'
            })
        }

    }

}

module.exports = new AppInfoController