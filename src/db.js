const { Sequelize } = require('sequelize')
const User = require('./Models/User')


const sequelize = new Sequelize('postgres://postgres:postgres@localhost:5432/prueba',{logging:false})

User(sequelize)


module.exports = {
    ...sequelize.models,
    conn: sequelize
}