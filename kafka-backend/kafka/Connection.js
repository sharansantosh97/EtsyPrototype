//var kafka = require("kafka-node");
//
import kafka from "kafka-node";
const ipAddress = "localhost";
function ConnectionProvider() {
  this.getConsumer = function (topic_name) {
    this.client = new kafka.KafkaClient({kafkaHost: `4.tcp.ngrok.io:19648`});//${ipAddress}:2181
    this.kafkaConsumerConnection = new kafka.Consumer(this.client, [
      { topic: topic_name, partition: 0 }
    ]);
    this.client.on("ready", function () {
      console.log("client ready!");
    });

    return this.kafkaConsumerConnection;
  };

  //Code will be executed when we start Producer
  this.getProducer = function () {
    if (!this.kafkaProducerConnection) {
      this.client = new kafka.KafkaClient({kafkaHost: `4.tcp.ngrok.io:19648`});
      console.log("EEEEEEEEE",this.client);
      var HighLevelProducer = kafka.HighLevelProducer;
      this.kafkaProducerConnection = new HighLevelProducer(this.client);
      console.log("producer ready");
    }
    return this.kafkaProducerConnection;
  };
}
//exports = module.exports = new ConnectionProvider();
export {ConnectionProvider};
