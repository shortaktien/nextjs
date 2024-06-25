import { sql } from '@vercel/postgres';
import dotenv from 'dotenv';

dotenv.config(); // Laden der Umgebungsvariablen

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { username } = req.body;

  if (!username) {
    return res.status(400).json({ error: 'Username is required' });
  }

  try {
    console.log(`Attempting to find or insert username: ${username}`);
    const currentTime = new Date().toISOString();

    // Überprüfen, ob der Benutzer bereits existiert
    const userResult = await sql`SELECT id FROM users WHERE username = ${username}`;
    
    let userId;
    if (userResult.length > 0) {
      userId = userResult[0].id;
      // Aktualisieren des letzten Login-Datums
      await sql`UPDATE users SET last_login = ${currentTime} WHERE id = ${userId}`;
    } else {
      // Benutzer anlegen und das Login-Datum setzen
      const result = await sql`
        INSERT INTO users (username, last_login) 
        VALUES (${username}, ${currentTime}) 
        RETURNING id
      `;
      userId = result[0].id;
    }

    return res.status(200).json({ userId });
  } catch (error) {
    console.error('Error details:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
