const { Client } = require('pg');

async function setup() {
    const client = new Client({
        host: 'localhost',
        port: 5432,
        user: 'postgres',
        password: 'password',
        database: 'postgres' // Connect to default postgres DB
    });

    try {
        await client.connect();
        console.log('Connected to postgres server');

        const res = await client.query("SELECT 1 FROM pg_database WHERE datname = 'riskwall_nest'");
        if (res.rowCount === 0) {
            await client.query('CREATE DATABASE riskwall_nest');
            console.log('Created database riskwall_nest');
        } else {
            console.log('Database riskwall_nest already exists');
        }
    } catch (err) {
        console.error('Error during setup:', err);
    } finally {
        await client.end();
    }
}

setup();
