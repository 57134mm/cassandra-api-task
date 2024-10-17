var express = require('express');
var http = require('http');
var app = express();
const client = require('./src/config/db');

app.set('port', process.env.PORT || 3000);

const createKeyspace = `
CREATE KEYSPACE IF NOT EXISTS user_management_keyspace 
WITH replication = {'class': 'SimpleStrategy', 'replication_factor': '1'}
`;

const createTable = `
CREATE TABLE IF NOT EXISTS user_management_keyspace.users (
  id uuid PRIMARY KEY,
  name text,
  email text,
  files blob
)
`;

async function setup() {
    try {
        await client.execute(createKeyspace);
        console.log('Keyspace created');
        await client.execute(createTable);
        console.log('Table created');
    } catch (err) {
        console.error('Setup error', err);
    } finally {
        await client.shutdown();
    }
}

setup();

http.createServer(app).listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});