import { sql } from '@vercel/postgres';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { userId, resources } = req.body;

  if (!userId || !resources) {
    return res.status(400).json({ error: 'User ID and resources are required' });
  }

  try {
    // Convert resource values to integers
    const integerResources = {};
    for (const [key, value] of Object.entries(resources)) {
      integerResources[key] = Math.floor(value);
    }

    // Update the resources in the database
    await sql`
      UPDATE resources
      SET
        water = ${integerResources.water},
        food = ${integerResources.food},
        wood = ${integerResources.wood},
        stone = ${integerResources.stone},
        knowledge = ${integerResources.knowledge},
        population = ${integerResources.population},
        coal = ${integerResources.coal},
        gold = ${integerResources.gold},
        military = ${integerResources.military}
      WHERE user_id = ${userId}
    `;

    res.status(200).json({ message: 'Game saved successfully' });
  } catch (error) {
    console.error('Error saving game:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
