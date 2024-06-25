import { sql } from '@vercel/postgres';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const { userId } = req.query;

    console.log('Received GET request with userId:', userId); // Debugging-Log

    if (!userId) {
      return res.status(400).json({ error: 'User ID is required' });
    }

    try {
      const result = await sql`SELECT username FROM users WHERE id = ${userId}`;
      if (result.length === 0) {
        return res.status(404).json({ error: 'User not found' });
      }
      return res.status(200).json({ username: result[0].username });
    } catch (error) {
      console.error('Error fetching username:', error);
      return res.status(500).json({ error: 'Error fetching username' });
    }
  } else {
    return res.status(405).json({ error: 'Method not allowed' });
  }
}
