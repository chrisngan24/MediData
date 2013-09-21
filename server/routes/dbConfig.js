var mongo = require('mongodb');
var MongoClient = mongo.MongoClient;
var Server  = mongo.Server;

var dbName = 'textPerVillage';
var collPhoneNumber = 'phoneNumbers';
var collVillage = 'village';

config ={
    "hostname":"localhost",
    "port":27017,
    "username":"",
    "password":"",
    "name":"",
    "db":"db"
};

var generate_mongo_url = function(obj){
    obj.hostname = (obj.hostname || 'localhost');
    obj.port = (obj.port || 27017);
    obj.db = (obj.db || 'test');
    if(obj.username && obj.password){
        return "mongodb://" + obj.username + ":" + obj.password + "@" + obj.hostname + ":" + obj.port + "/" + obj.db;
    }else{
        return "mongodb://" + obj.hostname + ":" + obj.port + "/" + obj.db;
    }
};
var mongourl = generate_mongo_url(config);

mongo.connect(mongourl, function(err, mongoClient){
    if(mongoClient == null){
        console.log("=======================================================================");
        console.log("\nif using on local machine, remember to turn on mongod from cmd/terminal\n");
        console.log("=======================================================================");

    }
    else{
     	db = mongoClient.db(dbName);
    }
});

var connectPhoneNumber = function(callback){
	connectMongo(collPhoneNumber, callback);
};

var connectVillage = function(callback){
	connectMongo(collVillage, callback);
};

var connectDisease = function(callback){
	connectMongo(collVillage, callback);
};

var connectMongo = function(collName, callback){
    mongo.connect(mongourl, function(err, conn){
        conn.collection(collName, function(err, collection){
            callback(collection);
        });
    });
}


