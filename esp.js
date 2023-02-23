var hostname = "192.168.195.143";
var port = 8883;
var clientId = "WebSocket";
clientId += new Date().getUTCMilliseconds();;
var topic_count = "count";
var topic_led = "led";

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
    mqttClient.subscribe(topic_count);
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
    if (message.destinationName == topic_count){
      document.getElementById("log").innerHTML = message.payloadString;
    }
   }
    function ledOn() {
        mqttClient.subscribe(topic_led);
        msg = '1';
        Message = new Paho.MQTT.Message(msg);
        Message.destinationName = topic_led;
        mqttClient.send(Message);
    }
    function ledOff() {
        mqttClient.subscribe(topic_led);
        msg = '0';
        Message = new Paho.MQTT.Message(msg);
        Message.destinationName = topic_led;
        mqttClient.send(Message);
    }