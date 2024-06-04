import { Response } from 'express'
import { createNewItemUseCase } from '../use-case/create-new-item-use-case'
import { UserNotFoundError } from '../errors/UserNotFoundError'
import { getItemsUseCase } from '../use-case/get-items-use-case'
import { updateItemUseCase } from '../use-case/update-item-use-case'
import { EnoughItemsError } from '../errors/EnoughItemsError'
import { ItemNotFoundError } from '../errors/ItemNotFoundError'
import { deleteItemUseCase } from '../use-case/delete-item-use-case'
import { AuthRequest } from '../middleware/authMiddleware'

export const itemController = {
  create: async (req: AuthRequest, res: Response) => {
    try {
      const { name } = req.body
      const { id } = req.user

      const newItem = await createNewItemUseCase(name, id)

      return res
        .status(200)
        .json({ message: 'Item created successfully', newItem })
    } catch (err) {
      if (err instanceof UserNotFoundError) {
        return res.status(401).json({ message: err.message })
      }

      return res.status(500).json({ err })
    }
  },
  read: async (req: AuthRequest, res: Response) => {
    try {
      const { id } = req.user

      const getItems = await getItemsUseCase(id)

      return res.status(200).json(getItems)
    } catch (err) {
      if (err instanceof EnoughItemsError) {
        return res.status(400).json({ message: err.message })
      }
    }
  },
  update: async (req: AuthRequest, res: Response) => {
    try {
      const { id } = req.user

      const { name, description } = req.body
      const { itemId } = req.params

      const updatedItem = await updateItemUseCase(id, name, description, itemId)

      res.status(200).json({
        message: 'Item updated successfully',
        updatedItem,
      })
    } catch (err) {
      if (err instanceof ItemNotFoundError) {
        return res.status(404).json({ message: err.message })
      }
      return res.status(500).json({ err })
    }
  },
  delete: async (req: AuthRequest, res: Response) => {
    try {
      const { id } = req.user

      const { itemId } = req.params

      const deleteItem = await deleteItemUseCase(id, itemId)

      return res
        .status(200)
        .json({ message: 'Item deleted successfully', deleteItem })
    } catch (err) {
      return res.status(500).json({ message: 'Internal Server Error' })
    }
  },
}
