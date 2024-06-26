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
    let userResult = await sql`
      SELECT id FROM users WHERE username = ${address}
    `;
    
    if (userResult.rows.length > 0) {
      const userId = userResult.rows[0].id;
      const resourcesResult = await sql`
        SELECT * FROM resources WHERE user_id = ${userId}
      `;
      const productionRatesResult = await sql`
        SELECT * FROM production_rates WHERE user_id = ${userId}
      `;
      const capacityRatesResult = await sql`
        SELECT * FROM capacity_rates WHERE user_id = ${userId}
      `;
      const buildingsResult = await sql`
        SELECT * FROM buildings WHERE user_id = ${userId}
      `;

      return res.status(200).json({
        userId,
        resources: resourcesResult.rows[0],
        productionRates: productionRatesResult.rows[0],
        capacityRates: capacityRatesResult.rows[0],
        buildings: buildingsResult.rows
      });
    } else {
      userResult = await sql`
        INSERT INTO users (username) 
        VALUES (${address})
        RETURNING id
      `;
      
      const userId = userResult.rows[0].id;
      await sql`
        INSERT INTO resources (user_id)
        VALUES (${userId})
      `;
      await sql`
        INSERT INTO production_rates (user_id)
        VALUES (${userId})
      `;
      await sql`
        INSERT INTO capacity_rates (user_id)
        VALUES (${userId})
      `;
      const initialBuildings = [1, 2];
      for (const buildingId of initialBuildings) {
        await sql`
          INSERT INTO buildings (user_id, building_id)
          VALUES (${userId}, ${buildingId})
        `;
      }

      return res.status(201).json({
        message: 'User registered successfully',
        userId,
        resources: {
          water: 250,
          food: 250,
          wood: 300,
          stone: 100,
          knowledge: 0,
          population: 15,
          coal: 0,
          gold: 0,
          military: 0,
        },
        productionRates: {
          water: 40 / 3600,
          food: 35 / 3600,
          wood: 33 / 3600,
          stone: 29 / 3600,
          knowledge: 1 / 3600,
          population: 1 / 3600,
          coal: 15 / 3600,
          gold: 0.01 / 3600,
        },
        capacityRates: {
          water: 500,
          food: 500,
          wood: 500,
          stone: 500,
          knowledge: 100,
          population: 15,
          coal: 500,
          gold: 500,
          military: 0,
          maxMilitaryCapacity: 0,
        },
        buildings: initialBuildings.map(id => ({
          user_id: userId,
          building_id: id,
          level: 0,
        }))
      });
    }
  } catch (error) {
    console.error('Error handling request:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
