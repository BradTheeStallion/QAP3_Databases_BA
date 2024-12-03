const { Pool } = require('pg');
require('dotenv').config();
const inquirer = require('inquirer');

// PostgreSQL connection
const pool = new Pool({
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_DATABASE,
  password: process.env.PG_PASSWORD,
  port: process.env.PG_PORT,
});

// Create tasks table if it doesn't exist
async function createTasksTable() {
    const createTableQuery = `
        CREATE TABLE IF NOT EXISTS tasks (
            id INTEGER PRIMARY KEY,
            description TEXT NOT NULL,
            status VARCHAR(20) NOT NULL
        )
    `;

    try {
        const client = await pool.connect();
        await client.query(createTableQuery);
        client.release();
        console.log('Tasks table ensured');
    } catch (err) {
        console.error('Error creating tasks table', err);
    }
}

module.exports = {
    pool,
    createTasksTable
};