// pages/api/admin/users.js
import { sql } from '@vercel/postgres';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const usersResult = await sql`SELECT * FROM users`;
    const resourcesResult = await sql`SELECT * FROM resources`;
    const buildingsResult = await sql`SELECT * FROM buildings`;
    const capacityRatesResult = await sql`SELECT * FROM capacity_rates`;

    res.status(200).json({
      users: usersResult.rows,
      resources: resourcesResult.rows,
      buildings: buildingsResult.rows,
      capacityRates: capacityRatesResult.rows
    });
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
