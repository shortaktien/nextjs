import { sql } from '@vercel/postgres';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { address } = req.body;

  if (!address) {
    return res.status(400).json({ error: 'Address is required' });
  }

  try {
    // Check if user exists
    const userResult = await sql`
      SELECT id FROM users WHERE username = ${address}
    `;
    
    if (userResult.rowCount > 0) {
      return res.status(400).json({ error: 'User already exists' });
    }

    // Insert new user
    const newUser = await sql`
      INSERT INTO users (username)
      VALUES (${address})
      RETURNING id
    `;
    const userId = newUser.rows[0].id;

    // Initialize resources
    await sql`
      INSERT INTO resources (user_id)
      VALUES (${userId})
    `;

    // Initialize production rates
    await sql`
      INSERT INTO production_rates (user_id)
      VALUES (${userId})
    `;

    // Initialize capacity rates
    await sql`
      INSERT INTO capacity_rates (user_id)
      VALUES (${userId})
    `;

    // Initialize buildings
    const initialBuildings = [1, 2]; // Example building IDs
    for (const buildingId of initialBuildings) {
      await sql`
        INSERT INTO buildings (user_id, building_id)
        VALUES (${userId}, ${buildingId})
      `;
    }

    res.status(201).json({ message: 'User registered successfully', userId });
  } catch (error) {
    console.error('Error saving username:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
