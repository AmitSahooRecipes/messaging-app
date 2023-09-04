const express = require('express');
const amqp = require("amqplib");
const bodyParser = require('body-parser');


const tools = require ("./tools");

const app = express();
const PORT = process.env.PORT || 8080;

var channel, connection;  //global variables


app.use (express.json());
app.use (bodyParser.json());
app.use (bodyParser.urlencoded({extended: false}));
app.post ("/queue/send-msg", (req, res)=> {
    try {
       data = req.body; 
       tools.sendData(data.queuename,data.message);
       res.send (data);
    } catch (error) {
        console.log ("Error");
    }
});

app.listen (PORT, ()=> console.log ("Server running at port " + PORT));

async function sendData (data) {
    await tools.connectQueue();
    await channel.sendToQueue("sojourn-queue", Buffer.from(JSON.stringify(data)));
    await channel.close();
    await connection.close(); 
}