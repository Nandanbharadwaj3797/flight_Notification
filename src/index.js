const express = require('express');
const amqplib = require('amqplib');
const{EmailService} = require('./services');

async function connecttoQueue() {
  try {
    const connection = await amqplib.connect('amqp://localhost');
    const channel = await connection.createChannel();
    const queueName = 'noti-queue';
    await channel.assertQueue(queueName, { durable: true });
    channel.consume(queueName, async(data)=>{
      console.log(`${Buffer.from(data.content)}`);
      const obj=JSON.parse(`${Buffer.from(data.content)}`);
      await EmailService.sendEmail("codingtestmail1@gmail.com", obj.recepientEmail, obj.subject, obj.content);
      channel.ack(data);
    })
  } catch (error) {
    console.error('Error connecting to RabbitMQ:', error);
  }
}

const serverConfig = require('./config');
const mailsender= require('./config/email-config');

const apiRoutes = require('./routes');

const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use('/api',apiRoutes);



app.listen(serverConfig.PORT, async() => {
  console.log(`Server is running on port ${serverConfig.PORT}`);
  await connecttoQueue();
  console.log('Connected to RabbitMQ up');
});