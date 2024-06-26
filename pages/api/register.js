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
    console.log('Attempting to insert username:', username);
    const formattedDate = formatDate(new Date());
    const result = await sql`INSERT INTO users (username, last_login) VALUES (${username}, ${formattedDate}) RETURNING id`;
    console.log('Insert result:', result);
    
    if (result.rows && result.rows.length > 0) {
      const userId = result.rows[0].id;
      if (userId) {
        console.log('User inserted with ID:', userId);
        return res.status(200).json({ userId });
      } else {
        console.log('Insert operation did not return a valid ID');
        return res.status(500).json({ error: 'Failed to save username' });
      }
    } else {
      console.log('Insert operation did not return any result');
      return res.status(500).json({ error: 'Failed to save username' });
    }
  } catch (error) {
    console.error('Error saving username:', error);
    return res.status(500).json({ error: 'Internal Server Error', details: error.message });
  }
}
