const express = require('express')
const bodyParser = require('body-parser')

// Import db
const sequelize = require('./Database/database')

// Import models
const Address = require('./Models/address.model')
const User = require('./Models/user.model')
const AppInfo = require('./Models/appInfo.model')
const FAQ = require('./Models/faq.model')
    // const FAQCategory = require('./Models/faqCategory.model')

// Import routes
const authRoutes = require('./Routes/auth.route')
const addressRoutes = require('./Routes/address.route')
const appInfoRoutes = require('./Routes/appInfo.route')
const currencyRoutes = require('./Routes/currency.route')
const faqRoutes = require('./Routes/faq.route')
const userRoutes = require('./Routes/user.route')

// Import middleware
const authMiddleware = require('./Middleware/auth.middleware')

const app = express()
const PORT = process.env.PORT || 3000

app.use(bodyParser.json())

app.use('/auth', authRoutes)
app.use('/address', authMiddleware, addressRoutes)
app.use('/get_info_app', authMiddleware, appInfoRoutes)
app.use('/currency_price', currencyRoutes)
app.use('/faq', faqRoutes)
app.use('/', authMiddleware, userRoutes)

// FAQCategory.hasMany(FAQ, {
//     foreignKey: 'id'
// })
// FAQ.belongsTo(FAQCategory)

sequelize.sync({ force: true })
    .then(result => {
        console.log(result)
        app.listen(PORT, () => {
            console.log(`Server is running on port: http://localhost:${PORT}`)
        })
    })
    .catch(error => {
        console.log(error)
    })