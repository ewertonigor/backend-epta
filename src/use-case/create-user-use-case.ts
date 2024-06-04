import { randomUUID } from 'crypto'
import pool from '../db'
import { UserAlreadyExistsError } from '../errors/UserAlreadyExistsError'

export const createUserUseCase = async (
  username: string,
  email: string,
  passwordHash: string,
) => {
  const id = randomUUID()

  const doesUserExist = await pool.query(
    'SELECT id, username, email FROM users WHERE username = $1 OR email = $2',
    [username, email],
  )

  if (doesUserExist.rows.length > 0) {
    throw new UserAlreadyExistsError()
  }

  const createUser = await pool.query(
    `INSERT INTO users (id, username, email, password_hash) VALUES ($1, $2, $3, $4)`,
    [id, username, email, passwordHash],
  )

  const newUser = createUser.rows[0]

  return { newUser }
}
