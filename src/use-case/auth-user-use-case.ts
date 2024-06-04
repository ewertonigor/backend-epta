import { compare } from 'bcryptjs'
import pool from '../db'
import { InvalidCredentialsError } from '../errors/InvalidCredentialsError'

export const authUserUseCase = async (username: string, password: string) => {
  const userResult = await pool.query(
    'SELECT * FROM users WHERE username = $1',
    [username],
  )

  if (userResult.rows.length === 0) {
    throw new InvalidCredentialsError()
  }

  const user = userResult.rows[0]

  const doesPasswordMatch = await compare(password, user.password_hash)

  if (!doesPasswordMatch) {
    throw new InvalidCredentialsError()
  }

  return { id: user.id, username: user.username }
}
