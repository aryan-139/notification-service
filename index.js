import { createClient } from 'redis';
import pkg from 'pg';
const { Client } = pkg;

// The rest of your code

import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import http from 'http';

// Redis client setup
const client = createClient();

// PostgreSQL client setup
const pgClient = new Client({
    user: 'postgres',
    database: 'postgres',
    password: '2022',
    port: 5432,
});

const app = express();
const server = http.createServer(app);
const PORT = 8001;

// Middleware setup
app.use(cors());
app.use(bodyParser.json());

// Server is running on port 8001
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

// Connect to the Redis server
client.on('error', (err) => console.log('Redis Client Error', err));
await client.connect();

// Run operations on the Redis server 
await client.set('test1', 'Hello World');
const value = await client.get('test1');

console.log(value); 

// Connect to the PostgreSQL server
try {
    await pgClient.connect();
    console.log('Connected to PostgreSQL server successfully');

    // Create a table
    const createTableQuery = `
        CREATE TABLE IF NOT EXISTS test_table (
            id SERIAL PRIMARY KEY,
            name VARCHAR(50),
            age INT
        );
    `;
    await pgClient.query(createTableQuery);
    console.log('Table created successfully');
} catch (err) {
    console.error('Failed to connect to PostgreSQL server:', err);
}

// Run operations on the PostgreSQL server

// Insert some data
const insertQuery = `
INSERT INTO test_table (name, age) VALUES ($1, $2) RETURNING *;
`;
const insertValues = ['John', 24];
// const res = await pgClient.query(insertQuery, insertValues);
// console.log('Inserted data:', res.rows[0]);

// Retrieve data
const selectQuery = `SELECT * FROM test_table;`;
const selectResult = await pgClient.query(selectQuery);
console.log('Data retrieved:', selectResult.rows);
