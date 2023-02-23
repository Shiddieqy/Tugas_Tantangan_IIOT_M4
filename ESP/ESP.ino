#include <WiFi.h>
#include <PubSubClient.h>
#define LED 16
#define BUTTON 33
int led = 0;
int counter = 0;

const char* ssid = "Shiddieqy";
const char* password = "shiddieqy";
char count[10];
// Local MQTT broker
char* mqttServer = "192.168.195.143";
int mqttPort = 1883;
const char* mqtt_client_name = "SHABRI";
const char* mqtt_pub_topic = "count";
const char* mqtt_sub_topic = "led";
WiFiClient client;
PubSubClient mqttClient(client);
void callback(char* topic, byte* payload, unsigned int length) {
String msg;
for (int i = 0; i < length; i++) {
  msg += (char)payload[i];
}
led = msg.toInt();
}

void setup() {
  pinMode(LED,OUTPUT);
  pinMode(BUTTON,INPUT);
Serial.begin(115200);
WiFi.mode(WIFI_STA);
WiFi.begin(ssid, password);
while( WiFi.status() != WL_CONNECTED ) {
delay(500);
Serial.print(".");
}
Serial.println("");
Serial.print("WiFi connected to: ");
Serial.println(ssid);
Serial.println("IP address: ");
Serial.println(WiFi.localIP());
delay(2000);
mqttClient.setServer(mqttServer, mqttPort);
mqttClient.setCallback(callback);
}
void loop() {
if( !mqttClient.connected() ){
while( !mqttClient.connected() ){
if( mqttClient.connect(mqtt_client_name) ){
Serial.println("MQTT Connected!");
mqttClient.subscribe(mqtt_sub_topic);
}

else{
Serial.print(".");
}
}
}
counter += digitalRead(BUTTON);
digitalWrite(LED,led);
sprintf(count,"%d",counter);
mqttClient.publish(mqtt_pub_topic, count);
Serial.println("Message published");
mqttClient.loop();
delay(500);
}
