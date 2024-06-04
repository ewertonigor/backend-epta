import pool from '../db'
import { ItemNotFoundError } from '../errors/ItemNotFoundError'

export const updateItemUseCase = async (
  userId: string,
  name: string,
  description: string,
  itemId: string,
) => {
  const item = await pool.query(
    'UPDATE items SET name = $1, description = $2 WHERE id = $3 AND user_id = $4 RETURNING *',
    [name, description, itemId, userId],
  )

  if (item.rows.length === 0) {
    throw new ItemNotFoundError()
  }

  return { name: item.rows[0].name, description: item.rows[0].description }
}
