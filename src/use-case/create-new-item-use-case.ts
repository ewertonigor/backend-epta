import { randomUUID } from 'crypto'
import pool from '../db'
import { UserNotFoundError } from '../errors/UserNotFoundError'

export const createNewItemUseCase = async (name: string, userId: string) => {
  const itemId = randomUUID()

  if (!userId) {
    throw new UserNotFoundError()
  }

  const newItem = await pool.query(
    'INSERT INTO items (id, name, user_id) VALUES ($1, $2, $3) RETURNING *',
    [itemId, name, userId],
  )

  const item = newItem.rows[0]

  return { name: item.name, description: item.description }
}
