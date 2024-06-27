import { sql } from '@vercel/postgres';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { userId, buildingId, newLevel, newResources } = req.body;

  if (!userId || !buildingId || newLevel === undefined) {
    return res.status(400).json({ error: 'User ID, building ID, and new level are required' });
  }

  try {
    await sql`
      UPDATE buildings
      SET level = ${newLevel}
      WHERE user_id = ${userId} AND building_id = ${buildingId}
    `;

    await sql`
      UPDATE resources
      SET water = ${newResources.water},
          food = ${newResources.food},
          wood = ${newResources.wood},
          stone = ${newResources.stone},
          knowledge = ${newResources.knowledge},
          population = ${newResources.population},
          coal = ${newResources.coal},
          gold = ${newResources.gold},
          military = ${newResources.military}
      WHERE user_id = ${userId}
    `;

    res.status(200).json({ message: 'Building level updated successfully' });
  } catch (error) {
    console.error('Error saving building level:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
