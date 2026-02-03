const amqp = require('amqplib');

async function list() {
    try {
        const connection = await amqp.connect('amqp://guest:guest@localhost:5672');
        const channel = await connection.createChannel();
        console.log('Connected to RabbitMQ');

        // We can't easily list all queues without management API, 
        // but we can try to assert the one we think exists and see if it has messages.

        // Let's try to see if MassTransit created its expected queue
        const q1 = 'RiskWall.API.Consumers:AlertCreated'; // Just a guess
        const q2 = 'riskwall_alerts_queue';

        console.log('Checking queues...');
        // This is not very helpful without management API.

        await connection.close();
    } catch (err) {
        console.error('Error:', err);
    }
}

list();
