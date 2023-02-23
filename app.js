
const http = require("http");
const mqtt = require('mqtt');
const fs = require("fs");
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const host = 'localhost';
const port = 8080;
const broker_address = 'mqtt://localhost:1883'
const client = mqtt.connect(broker_address);

var t = 0;
const lmessage = [' ',' '];
let vmassage;
let topic = "topik";
client.on('connect',function(){
console.log("Publishing to $s",broker_address);
setInterval(function(){

client.publish(topic, lmessage);
 },100)
});
app.use(bodyParser.urlencoded({ extended: true })); 

app.post('/', (req, res) => {
    vmassage = req.body.message;
    lmessage.push(vmassage);
    
});




app.listen(port, () => {
  console.log(`Server running on port${port}`);
});