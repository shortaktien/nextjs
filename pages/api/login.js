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
    
    if (userResult.rowCount === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    const userId = userResult.rows[0].id;

    // Load resources, production rates, capacity rates, and building levels
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

    res.status(200).json({
      userId,
      resources: resourcesResult.rows[0],
      productionRates: productionRatesResult.rows[0],
      capacityRates: capacityRatesResult.rows[0],
      buildings: buildingsResult.rows
    });
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
