import { sql } from '@vercel/postgres';

export default async function handler(req, res) {
  const { userId } = req.query;

  if (!userId) {
    return res.status(400).json({ error: 'User ID is required' });
  }

  try {
    const result = await sql`SELECT * FROM resources WHERE user_id = ${userId}`;
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Resources not found' });
    }
    return res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error('Error loading resources:', error);
    return res.status(500).json({ error: 'Internal Server Error', details: error.message });
  }
}
