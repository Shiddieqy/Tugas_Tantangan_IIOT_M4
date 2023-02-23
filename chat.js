var hostname = "192.168.195.143";
var port = 8883;
var clientId = "WebSocket";
clientId += new Date().getUTCMilliseconds();;
var topic = "topik";
mqttClient = new Paho.MQTT.Client(hostname, port, clientId);
mqttClient.startTrace();
mqttClient.onMessageArrived = MessageArrived;
mqttClient.onConnectionLost = ConnectionLost;
Connect();
/*Initiates a connection to the MQTT broker*/
function Connect(){
 mqttClient.connect({
 onSuccess: Connected,
 onFailure: ConnectionFailed,
 keepAliveInterval: 10,
});
}
/*Callback for successful MQTT connection */
function Connected() {
    console.log("Connected to MQTT-over-WebSocket broker.");
    mqttClient.subscribe(topic);
   }
   /*Callback for failed connection*/
   function ConnectionFailed(res) {
   console.log("Connect failed:" + res.errorMessage);
   }
   /*Callback for lost connection*/
   function ConnectionLost(res) {
    if (res.errorCode !== 0) {
    console.log("Connection lost:" + res.errorMessage);
    Connect();
    }
   }

   /*Callback for incoming message processing */
   function MessageArrived(message) {
      document.getElementById("log").innerHTML += message.payloadString + '\n';
   }
    function sendChat() {
        mqttClient.subscribe("topik");
        msg = document.getElementById("chat").value;
        Message = new Paho.MQTT.Message(msg);
        Message.destinationName = "topik";
        mqttClient.send(Message);
    }