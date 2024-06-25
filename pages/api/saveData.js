import { sql } from '@vercel/postgres';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { username } = req.body;

    if (!username) {
      return res.status(400).json({ error: 'Username is required' });
    }

    try {
      await sql`INSERT INTO users (username) VALUES (${username})`;
      return res.status(200).json({ message: 'Username saved successfully' });
    } catch (error) {
      console.error('Error saving username:', error);
      return res.status(500).json({ error: 'Error saving username' });
    }
  } else {
    return res.status(405).json({ error: 'Method not allowed' });
  }
}
