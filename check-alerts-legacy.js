const { Client } = require('pg');

async function check() {
    const client = new Client({
        host: 'localhost',
        port: 5432,
        user: 'postgres',
        password: 'password',
        database: 'RiskWall' // Legacy DB
    });

    try {
        await client.connect();
        // In legacy .NET it might be "Alerts" or "alerts"
        const res = await client.query('SELECT * FROM "Alerts" ORDER BY "CreatedAt" DESC LIMIT 5');
        console.log('Recent Legacy Alerts:', JSON.stringify(res.rows, null, 2));
    } catch (err) {
        try {
            const res2 = await client.query('SELECT * FROM alerts ORDER BY created_at DESC LIMIT 5');
            console.log('Recent Legacy Alerts (lowercase):', JSON.stringify(res2.rows, null, 2));
        } catch (err2) {
            console.error('Error:', err.message, err2.message);
        }
    } finally {
        await client.end();
    }
}

check();
