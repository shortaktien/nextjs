import { sql } from '@vercel/postgres';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { userId, buildingId, newLevel } = req.body;

  try {
    await sql`
      UPDATE buildings
      SET level = ${newLevel}
      WHERE user_id = ${userId} AND building_id = ${buildingId}
    `;

    res.status(200).json({ message: 'Building level updated successfully' });
  } catch (error) {
    console.error('Error saving building level:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
