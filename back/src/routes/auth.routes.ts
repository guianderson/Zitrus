import { Router } from 'express'
const jwt = require('jsonwebtoken')

interface ADUserData {
    sAMAccountName: string
    name: string
}

const authRouter = Router()

authRouter.post('/login', async (request, response) => {
    try {
        if (request.body.username === 'zitrino' && request.body.password === 'venhaserfeliz') {
            const token = jwt.sign({
                name: request.body.username,
            }, process.env.JWT_SECRET, { expiresIn: '1h' })

            return response.status(200).json({
                token,
                expiresIn: '3600',
                user: {
                    name: request.body.username,
                }
            })
        }
        else {
            return response.status(403).json({msg: 'Credenciais incorretas'})
        }
    } catch (err) {
        return response.status(403).json({msg: 'Credenciais incorretas'})
    }
})

export default authRouter