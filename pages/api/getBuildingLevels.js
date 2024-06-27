import { sql } from '@vercel/postgres';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { userId } = req.body;

  if (!userId) {
    return res.status(400).json({ error: 'User ID is required' });
  }

  try {
    const buildingsResult = await sql`
      SELECT * FROM buildings WHERE user_id = ${userId}
    `;

    res.status(200).json({ buildings: buildingsResult.rows });
  } catch (error) {
    console.error('Error fetching building levels:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
