const { Client } = require('pg');

async function check() {
    const client = new Client({
        host: 'localhost',
        port: 5432,
        user: 'postgres',
        password: 'password',
        database: 'riskwall_nest'
    });

    try {
        await client.connect();
        const res = await client.query('SELECT * FROM alerts ORDER BY created_at DESC LIMIT 5');
        console.log('Recent Alerts:', JSON.stringify(res.rows, null, 2));
    } catch (err) {
        console.error('Error:', err);
    } finally {
        await client.end();
    }
}

check();
