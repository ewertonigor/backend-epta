import express from 'express'
import { authMiddleware } from './middleware/authMiddleware'
import { userController } from './controllers/userController'
import { authController } from './controllers/authController'
import { itemController } from './controllers/itemController'

export const routes = express.Router()

routes.post('/users', userController.create)

routes.post('/auth', authController.login)

routes.post('/items', authMiddleware, itemController.create)

routes.get('/items', authMiddleware, itemController.read)

routes.put('/items/:itemId', authMiddleware, itemController.update)

routes.delete('/items/:itemId', authMiddleware, itemController.delete)
