import pool from '../db'
import { EnoughItemsError } from '../errors/EnoughItemsError'

export const getItemsUseCase = async (userId: string) => {
  const items = await pool.query(
    'SELECT id ,name, description, created_at FROM items WHERE user_id = $1',
    [userId],
  )

  if (items.rows.length < 0) {
    throw new EnoughItemsError()
  }

  return { items: items.rows }
}
