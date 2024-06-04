import { Request, Response } from 'express'
import { authUserUseCase } from '../use-case/auth-user-use-case'
import jwt from 'jsonwebtoken'
import { InvalidCredentialsError } from '../errors/InvalidCredentialsError'

export const authController = {
  login: async (req: Request, res: Response) => {
    try {
      const { username, password } = req.body

      const user = await authUserUseCase(username, password)

      const token = jwt.sign(
        { id: user.id, username: user.username },
        process.env.JWT_SECRET as string,
        { expiresIn: '1h' },
      )

      return res.status(200).json({ token })
    } catch (err) {
      if (err instanceof InvalidCredentialsError) {
        return res.status(400).json({ message: err.message })
      }
      return res.status(500).json({ err })
    }
  },
}
