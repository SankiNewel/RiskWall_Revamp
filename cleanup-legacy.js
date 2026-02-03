const { Client } = require('pg');

async function cleanup() {
    const client = new Client({
        host: 'localhost',
        port: 5432,
        user: 'postgres',
        password: 'password',
        database: 'RiskWall'
    });

    try {
        await client.connect();
        console.log('Connected to RiskWall database');

        // Drop the tables created by the revampled flyway if they conflict
        // The revampled tables were lowercase 'alerts' and 'users'
        // Legacy .NET likely uses 'Alerts' or 'alerts'

        // We'll drop 'alerts' and 'users' which were created by our Flyway script V1
        await client.query('DROP TABLE IF EXISTS alerts CASCADE');
        await client.query('DROP TABLE IF EXISTS users CASCADE');
        await client.query('DROP TABLE IF EXISTS flyway_schema_history CASCADE');

        console.log('Cleaned up revampled tables from legacy database');
    } catch (err) {
        console.error('Error during cleanup:', err);
    } finally {
        await client.end();
    }
}

cleanup();
