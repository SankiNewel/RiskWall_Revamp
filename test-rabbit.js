const amqp = require('amqplib');

async function test() {
    try {
        const connection = await amqp.connect('amqp://guest:guest@localhost:5672');
        console.log('Connected to RabbitMQ');
        await connection.close();
    } catch (err) {
        console.error('Failed to connect to RabbitMQ:', err);
    }
}

test();
