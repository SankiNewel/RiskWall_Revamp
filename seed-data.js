const { Client } = require('pg');

async function seed() {
    const client = new Client({
        host: 'localhost',
        port: 5432,
        user: 'postgres',
        password: 'password',
        database: 'riskwall_nest',
    });

    try {
        await client.connect();
        console.log('Connected to riskwall_nest database');

        // 1. Seed Users
        const users = [
            { empId: '54078', firstName: 'Chetan', lastName: 'Kadian', group: 'Riskwall', isAdmin: false },
            { empId: '54959', firstName: 'Jayesh', lastName: 'Thakur', group: 'Riskwall', isAdmin: true },
            { empId: '5878', firstName: 'Vinay', lastName: 'Kadian', group: 'Riskwall', isAdmin: true },
            { empId: '50750', firstName: 'Abhishek', lastName: 'Sawad', group: 'Riskwall', isAdmin: true },
            { empId: '27298', firstName: 'Vishnu', lastName: 'Bhagat', group: 'Riskwall', isAdmin: true },
        ];

        for (const u of users) {
            await client.query(
                'INSERT INTO users ("empId", "firstName", "lastName", "group", "isAdmin") VALUES ($1, $2, $3, $4, $5) ON CONFLICT ("empId") DO NOTHING',
                [u.empId, u.firstName, u.lastName, u.group, u.isAdmin]
            );
        }
        console.log('Seeded Users');

        // 2. Seed Groups
        const groups = [
            { name: 'Riskwall', groupAdmin: '' },
            { name: 'CM-Commodities', groupAdmin: '' },
            { name: 'CM-OPS', groupAdmin: 'Vinay Kadam' },
            { name: 'Markets', groupAdmin: '' },
        ];

        for (const g of groups) {
            await client.query(
                'INSERT INTO groups (name, "groupAdmin") VALUES ($1, $2) ON CONFLICT (name) DO NOTHING',
                [g.name, g.groupAdmin]
            );
        }
        console.log('Seeded Groups');

        // 3. Seed TM Items
        const tmItems = [
            'KOTAK0393', 'KOTAK0393X', 'KOTBK0000346', 'KOTBK0000416', 'KOTBK0001151'
        ];

        for (const tm of tmItems) {
            await client.query(
                'INSERT INTO tm_items (name) VALUES ($1) ON CONFLICT (name) DO NOTHING',
                [tm]
            );
        }
        console.log('Seeded TM Items');

        // 4. Seed Process Items
        const processes = [
            { name: 'NSE CASH NWAL', status: 'OFF', isRunning: false },
            { name: 'CDS NCSL', status: 'OFF', isRunning: false },
            { name: 'BSE NWSL', status: 'OFF', isRunning: false },
            { name: 'FNO NCSL', status: 'OFF', isRunning: false },
        ];

        for (const p of processes) {
            await client.query(
                'INSERT INTO process_items (name, status, "isRunning") VALUES ($1, $2, $3)',
                [p.name, p.status, p.isRunning]
            );
        }
        console.log('Seeded Processes');

        // 5. Seed Controls
        const controls = [
            { key: 'nseNwmlCash', enabled: false, type: 'SMS' },
            { key: 'bseNwml', enabled: false, type: 'SMS' },
            { key: 'nseNwmlCash_voice', enabled: false, type: 'Voice' },
        ];

        for (const c of controls) {
            await client.query(
                'INSERT INTO controls (key, enabled, type) VALUES ($1, $2, $3) ON CONFLICT (key) DO NOTHING',
                [c.key, c.enabled, c.type]
            );
        }
        console.log('Seeded Controls');

    } catch (err) {
        console.error('Seeding failed:', err);
    } finally {
        await client.end();
    }
}

seed();
