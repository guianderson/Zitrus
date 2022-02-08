import { Router } from 'express'
import userRouter from './usuario.routes'
import authRouter from './auth.routes'

const routes = Router()
routes.use('/user', userRouter)
routes.use('/auth', authRouter)

export default routes
