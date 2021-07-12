const path = require('path');
const express = require("express");
const { Client } = require('pg');
require('dotenv').config();

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.static(path.resolve(__dirname, '../client/build')));
const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});
client.connect();

app.get("/api", async (req, res) => {
  // const { rows } = await client.query('select * from cars');

  // res.json(rows);
  res.json([{ name: 'test'} ]);
});

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
