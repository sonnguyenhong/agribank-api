const express = require('express')
const http = require('http')
const fetch = require('node-fetch')

const getExchangeRate = (cb) => {
    http.get('http://data.fixer.io/api/latest?access_key=' + process.env.CURRENCY_API_KEY, res => {
        let buffer = [];
        const headerDate = res.headers && res.headers.date ? res.headers.date : 'no response date';
        console.log('Status Code:', res.statusCode);
        console.log('Date in Response header:', headerDate);

        res.on('data', chunk => {
            buffer.push(chunk);
        });

        res.on('end', () => {
            console.log('Response ended: ');
            const data = JSON.parse(Buffer.concat(buffer).toString());
            cb(data)
        });
    }).on('error', err => {
        console.log('Error: ', err.message);
    });
}
class CurrencyController {

    async getList(req, res) {
        getExchangeRate(data => {
            const baseCurrency = ['USD', 'EUR', 'GBP', 'HKD', 'CHF', 'JPY', 'AUD', 'SGD', 'THB', 'CAD', 'NZD', 'NZD']
            const toCurrency = 'VND'
            const VNDRate = data.rates.VND
            const rates = [];
            const response = {}
            for (let i = 0; i < baseCurrency.length; i++) {
                rates[i] = VNDRate / data.rates[baseCurrency[i]]
                response[baseCurrency[i]] = rates[i]
            }
            res.json({
                    message: 'Lấy dữ liệu thành công',
                    data: response
                })
                // console.log(rates)
        });
    }

}

module.exports = new CurrencyController