import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
dotenv.config();

async function checkDatabase() {
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'dev_universal',
    port: process.env.DB_PORT || 3306
  });

  try {
    const [rows] = await connection.execute('SELECT COUNT(*) as total FROM audits');
    console.log('Nombre total d\'audits en base:', rows[0].total);

    const [recentRows] = await connection.execute('SELECT id, url, name, email, status, created_at FROM audits ORDER BY id DESC LIMIT 5');
    console.log('Derniers audits:');
    recentRows.forEach(row => {
      console.log(`ID ${row.id}: ${row.url} - ${row.name} - ${row.status} - ${row.created_at}`);
    });
  } catch (error) {
    console.error('Erreur:', error.message);
  } finally {
    await connection.end();
  }
}

checkDatabase();
