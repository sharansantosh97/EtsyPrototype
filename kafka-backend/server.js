//var connection =  new require('./kafka/Connection');
import {ConnectionProvider} from './kafka/connection.js'
import mongoose from 'mongoose';
var connection = new ConnectionProvider();
//topics files
//var signin = require('./services/signin.js');
//var Books = require('./services/books.js');
//var User = require('./services/user.js');
import {handle_request} from './services/user.js';
mongoose.connect('mongodb://127.0.0.1:27017/Etsy', (err, res) => {
        if (err) {
            console.log(err);
            console.log(`MongoDB Connection Failed`);
        } else {
            console.log(`MongoDB Connected`);
        }
    });

function handleTopicRequest(topic_name,fname){
    //var topic_name = 'root_topic';
    var consumer = connection.getConsumer(topic_name);
    var producer = connection.getProducer();
    console.log('server is running ');
    consumer.on('message', function (message) {
        console.log('message received for ' + topic_name +" ", fname);
        console.log(JSON.stringify(message.value));
        var data = JSON.parse(message.value);
        
        fname(data.data, function(err,res){
            console.log('after handle'+res);
            var payloads = [
                { topic: data.replyTo,
                    messages:JSON.stringify({
                        correlationId:data.correlationId,
                        data : res
                    }),
                    partition : 0
                }
            ];
            producer.send(payloads, function(err, data){
                console.log(data);
            });
            return;
        });
        
    });
}
// Add your TOPICs here
//first argument is topic name
//second argument is a function that will handle this topic request
//handleTopicRequest("post_book",Books)
handleTopicRequest("get_userdetails",handle_request)
