import { createClient } from 'redis';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import http from 'http';

const client = createClient();

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

//run operations on the redis server 
client.set('test1', 'Hello World');
const value = await client.get('test1');

console.log(value); 

