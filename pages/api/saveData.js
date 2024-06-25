import { sql } from "@vercel/postgres";

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { username } = req.body;

  if (!username) {
    return res.status(400).json({ error: 'Username is required' });
  }

  try {
    const result = await sql`INSERT INTO users (username) VALUES (${username}) RETURNING id`;

    if (result.count > 0) {
      const userId = result[0].id;
      return res.status(200).json({ userId });
    } else {
      return res.status(500).json({ error: 'Failed to save username' });
    }
  } catch (error) {
    console.error('Error saving username:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
