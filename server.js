const mongo = require('mongodb').MongoClient;
const client_socket = require('socket.io').listen(4000).sockets;

//conntect to mongo
mongo.connect('mongodb://127.0.0.1', function (err,client) {
    if(err){
        throw err;
    }
    console.log('Mongodb connected');

    // Connect to Socket.io
    client_socket.on('connection', function(socket){
        //const chat = client.db.collection('chats');
        const chat = client.db('ChatApp');
        const collection = chat.collection('chats');

        //create function to send status
        sendStatus = function(s){
            socket.emit('status',s);
        };

        //Get chats from mongo collection
        collection.find().limit(100).sort({_id:1}).toArray(function (err, res) {
            if(err){
                throw err;
            }

            //emit messages
            socket.emit('output', res);
        });

        //handle input events
        socket.on('input', function (data) {
            let name = data.name;
            let message = data.message;

            //check for name and message
            if(name == '' || message == ''){
                //send error status
                sendStatus('Please enter the name and message');
            } else {
                //Insert message into database
                collection.insert({name: name, message: message}, function () {
                   client_socket.emit('output',[data]);

                   //send status object
                    sendStatus({
                        message: 'Message sent',
                        clear: true
                    });
                });
            }
        });

        //Handle clear
        socket.on('clear', function (data) {
            //remove all chats from collections
            collection.remove({}, function () {
               client_socket.emit('cleared');
            });
        });

    });
});
