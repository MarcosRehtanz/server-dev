const { Router } = require('express')
const { tokenHash } = require('token-hash')
const morgan = require('morgan')
const { User } = require('./db')
const server = Router()


server.use(morgan('dev'))
server.get('/user', async (req, res) => {
    try {
        const users = await User.findAll()
        if (!users.length) res.status(201).json({ count: users.length, users })
        else res.status(200).json({ count: users.length, users })
} catch (error) {
    
    }
})
server.post('/user', async (req, res) => {
    const { email, password } = req.query
    if (!(email && password)) return res.status(400).json({ email, password })
    try {

const [user, created] = await User.findOrCreate({
    where: {
                email
            },
            defaults: {
                password
            }
        })
        if (!created) return res.status(409).json({ created, user })
        else res.status(200).json({ created, user })
    } catch (error) {
        console.log(error);
        res.status(500).json(error)
    }
})
server.get('/access', async(req,res) => {
    const { email, password } = req.query
    if (!(email && password)) return res.status(400).json({ email, password })
    try {
        const user = await User.findOne({where:{email}})

        if(!user) res.status(404).json('404 not found')
        else if( user.password === tokenHash( "RS256", password )) res.status(200).json({acces: true})
        else res.status(409).json('email or password error')

    } catch (error) {
        res.status(500).json(error)
    }
})

module.exports = server