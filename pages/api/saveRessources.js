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
    const result = await sql`
      INSERT INTO resources (user_id, water, food, wood, stone, knowledge, population, coal, gold, military, last_updated)
      VALUES (${userId}, ${resources.water}, ${resources.food}, ${resources.wood}, ${resources.stone}, ${resources.knowledge}, ${resources.population}, ${resources.coal}, ${resources.gold}, ${resources.military}, NOW())
      ON CONFLICT (user_id) 
      DO UPDATE SET 
        water = EXCLUDED.water,
        food = EXCLUDED.food,
        wood = EXCLUDED.wood,
        stone = EXCLUDED.stone,
        knowledge = EXCLUDED.knowledge,
        population = EXCLUDED.population,
        coal = EXCLUDED.coal,
        gold = EXCLUDED.gold,
        military = EXCLUDED.military,
        last_updated = NOW()
    `;
    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('Error saving resources:', error);
    return res.status(500).json({ error: 'Internal Server Error', details: error.message });
  }
}
