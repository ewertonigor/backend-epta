import pool from '../db'
import { ItemNotFoundError } from '../errors/ItemNotFoundError'

export const deleteItemUseCase = async (userId: string, itemId: string) => {
  const item = await pool.query(
    'DELETE FROM items WHERE id = $1 AND user_id = $2 RETURNING *',
    [itemId, userId],
  )

  if (!item) {
    throw new ItemNotFoundError()
  }

  return item.rows[0].name
}
