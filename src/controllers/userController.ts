import { Request, Response } from 'express'
import { hash } from 'bcryptjs'
import { createUserUseCase } from '../use-case/create-user-use-case'
import { UserAlreadyExistsError } from '../errors/UserAlreadyExistsError'

export const userController = {
  create: async (req: Request, res: Response) => {
    try {
      const { username, email, password } = req.body

      const passwordHash = await hash(password, 6)

      const newUser = await createUserUseCase(username, email, passwordHash)

      res.status(200).json(newUser)
    } catch (err) {
      if (err instanceof UserAlreadyExistsError) {
        return res.status(400).json({ message: err.message })
      }

      return res.status(500).json({ message: 'Internal Server Error' })
    }
  },
}
