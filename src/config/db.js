const cassandra = require('cassandra-driver');

const client = new cassandra.Client({
    contactPoints: ['127.0.0.1'],
    localDataCenter: 'datacenter1',
    keyspace: 'user_management_keyspace',
    protocolOptions: { maxVersion: 4 }
});

client.connect()
    .then(() => console.log('Connected to Cassandra'))
    .catch(err => console.error('Connection error', err));

module.exports = client;
