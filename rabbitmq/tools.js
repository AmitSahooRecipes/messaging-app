const amqp = require("amqplib");
var self = {
    connectQueue: async function (queueName) {
        connection = await amqp.connect("amqp://localhost:5672");
        channel = await connection.createChannel();
        await channel.assertQueue(queueName);
    },

    consumeData: async function (queueName, action) {
        try {
            await self.connectQueue(queueName);
            channel.consume (queueName, data => {
                action(data);
                channel.ack(data);
            });
        } catch (error) {
            console.log(error);
        }
    },

    sendData: async function (queueName, data) {
        await self.connectQueue(queueName);
        await channel.sendToQueue(queueName, Buffer.from(JSON.stringify(data)));
        await channel.close();
        await connection.close(); 
    }
};

module.exports = self;