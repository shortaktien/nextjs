import { sql } from '@vercel/postgres';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { username } = req.body;

  if (!username) {
    return res.status(400).json({ error: 'Username is required' });
  }

  try {
    console.log('Attempting to insert username:', username);
    const result = await sql`INSERT INTO users (username) VALUES (${username}) RETURNING id`;

    if (result.rowCount > 0) {
      const userId = result.rows[0].id;
      console.log('User inserted with ID:', userId);
      return res.status(200).json({ userId });
    } else {
      console.error('Insert operation did not return any result:', result);
      return res.status(500).json({ error: 'Failed to save username' });
    }
  } catch (error) {
    console.error('Error details:', error);
    return res.status(500).json({ error: 'Internal Server Error', details: error.message });
  }
}
