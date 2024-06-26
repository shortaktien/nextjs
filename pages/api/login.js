import { sql } from '@vercel/postgres';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { username } = req.body;

  if (!username) {
    console.log('No username provided');
    return res.status(400).json({ error: 'Username is required' });
  }

  const formatDate = (date) => {
    return date.toISOString().replace('T', ' ').substring(0, 19);
  };

  try {
    console.log('Attempting to login username:', username);

    // Check if user already exists
    const result = await sql`SELECT id FROM users WHERE username = ${username}`;
    
    if (result.rows && result.rows.length > 0) {
      const userId = result.rows[0].id;
      console.log('User exists with ID:', userId);
      
      // Update last login timestamp
      const formattedDate = formatDate(new Date());
      await sql`UPDATE users SET last_login = ${formattedDate} WHERE id = ${userId}`;
      return res.status(200).json({ userId });
    } else {
      console.log('User not found');
      return res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    console.error('Error logging in:', error);
    return res.status(500).json({ error: 'Internal Server Error', details: error.message });
  }
}
