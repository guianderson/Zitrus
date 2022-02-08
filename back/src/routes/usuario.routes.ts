import { Router } from 'express'
import { getRepository } from 'typeorm'
import Usuario from '../models/Usuario'
import authMiddleware from '../middleware/auth'

const userRouter = Router()

userRouter.post('/create', authMiddleware, async (request, response) => {
    try {
        const repo = getRepository(Usuario)
        const res = await repo.save(request.body)
        return response.status(201).json(res)
    } catch (err) {
        return response.status(400).json({msg: err.message})
    }
})

userRouter.get('/list', authMiddleware,  async (request, response) => {
    try {
        const repo = getRepository(Usuario)
        const res = await repo.find()
        if(res.length > 0)
            return response.status(200).json(res)
        return response.status(404).json({msg: 'Nenhum usuário encontrado.'})
    } catch (err) {
        return response.status(400).json({msg: err.message})
    }
})

userRouter.get('/find/:id', authMiddleware, async (request, response) => {
    try {
        const repo = getRepository(Usuario)
        const res = await repo.findOne(request.params.id)
        if(res)
            return response.status(200).json(res)
        return response.status(404).json({msg: `Usuario com id ${request.params.id} não encontrado.`})
    } catch (err) {
        return response.status(400).json({msg: err.message})
    }
})

userRouter.put('/update/:id', authMiddleware, async (request, response) => {
    try {
        const repo = getRepository(Usuario)
        const undd = await repo.findOne(request.params.id)
        if(!undd)
            return response.status(404).json({msg: `Usuario com id ${request.params.id} não encontrado.`})
        repo.merge(undd, request.body)
        repo.save(undd)
        return response.status(200).json(undd)
    } catch (err) {
        return response.status(400).json({msg: err.message})
    }
})

userRouter.delete('/delete/:id', authMiddleware, async (request, response) => {
    try {
        const repo = getRepository(Usuario)
        const res = await repo.findOne(request.params.id)
        if(!res)
            return response.status(404).json({msg: `Usuario com id ${request.params.id} não encontrado.`})
        repo.delete(request.params.id)
        return response.status(200).json({
            msg: `Usuario id: ${request.params.id} excluído.`
        })
    } catch (err) {
        return response.status(400).json({msg: err.message})
    }
})

export default userRouter