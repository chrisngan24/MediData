var express = require('express');
var twilio = require('twilio');
var handle = require('./routes/handle');
var util = require('./routes/util');
var path = require('path');
var app = express();

//twilio variables
var client = new twilio.RestClient('AC6ccc5ad275f60124a022af13ae9d4773', 'ca5dfff962e288351dca2103705ebbda');

var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
};

app.configure(function() {
    app.set('port', process.env.PORT || 3000);
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(app.router);

    app.use(express.static(path.join(__dirname, 'public')));
    app.use(allowCrossDomain);
});

app.get('/', function(req, res){
    res.redirect('/index.html');
});
app.get('/admin', function(req, res){
    res.redirect('/admin.html');
});
app.get('/detailed/:villageId', function(req, res){
    console.log(req.params);
    res.redirect('/detailed.html#' + req.params.villageId);
});

app.post('/api/register_number', function(req, res){
    console.log(req.body.data);
    res.send();
})

// app.post()
// app.push()
// app.delete();


// The main caller to the api URL
app.get('/api/villages', handle.getVillages);

// app.get('/api/diseases', handle.getDiseases);
app.get('/api/diseases', handle.getDiseasesByQuery);
app.get('/api/diseases/:villageId', handle.getDiseasesByVillage);
app.get('/api/phoneNumbers', handle.getPhoneNumbers);
app.get('/api/villages/:villageId', handle.getVillageById);
app.get('/api/villages/phoneNumber/:phoneNumber', handle.getVillageByPhoneNumber);

// Code for updating the disease info
// app.push('/api/villages/update', handle.updateVillageDiseases);

app.listen(3000);



function check_sms(number, i) {
    try{
        //Loop through a list of SMS messages sent from a given number
        client.listSms({
            from:number
        }, function (err, responseData) {
            if(responseData.smsMessages!= null){

                if (total_messages[i] == 0) {
                    total_messages[i] = responseData.smsMessages.length;    
                }

                if (total_messages[i] != responseData.smsMessages.length) {
                    total_messages[i] = responseData.smsMessages.length;
                    
                    // console.log(responseData.smsMessages[0].body);
                    var textMessage = {
                        message : responseData.smsMessages[0].body,
                        phoneNumber : number
                    }
                    handle.pushTextMsg(textMessage, function(){
                        console.log('messaged pushed');
                    })
                }
                
            }

        });
    }catch(e){}
}

check_sms();

var total_messages = [0,0];

setInterval ( check_sms, 1000, '12247721893', 0 );
setInterval ( check_sms, 1000, '14502350575', 1);

//
var response = {
    send : function(blah){
        console.log('DeleteAll');
        var phoneNumbers = [];
        
        phoneNumbers.push({
            'number' : '12247721893',
            'administrator' : 'Kishan Dedakia',
            'name' : 'Tagi',
            'population' : 15000
        });
        console.log(phoneNumbers);
        phoneNumbers.push({
            'number' : '14502350575',
            'administrator' : 'Vishal Mathur',
            'name' : 'Pagong',
            'population' : 12000
        });
        phoneNumbers.push({
            'number' : '16478651425',
            'administrator' : 'Yannick Ngana',
            'name' : 'Rattana',
            'population' : 7000
        });
        for (var i = 0; i < phoneNumbers.length; i++){
            var req = {};
            req.body = {};
            req.body.phoneNumber = phoneNumbers[i];
            handle.registerNumber(req,{
                send : function(){
                    
                    if (i == phoneNumbers.length)
                        generateTextMessages();    
                }
            });                            
        }
    }
}
handle.deleteAll({}, response);

// function test()
// {
//    console.log('hello');
//    setTimeout(test, 5000);
// }
// 
var generateTextMessages = function(){
    console.log('generating');
    var NUMBER_OF_PHONE_NUMBERS = 15;
    var PHONES = ['12247721893', '14502350575', '16478651425'];
    var DISEASE_TYPES = ['M', 'H', 'S'];

    // x is a number by which the traits are randomized
    var generateTextMsg = function(x) {

        textcode = DISEASE_TYPES[0] + ':' + x + ',' + DISEASE_TYPES[1]  + ':' + (x+2) + "," + DISEASE_TYPES[2]  + ':' + (x+1);
        console.log(textcode);

        var textMsg = {
            'message' : textcode,
            'phoneNumber' : PHONES[x % 3]
        };

        return textMsg;
    };

    var diseapseStats = [];
    var textObj;
    
    for (var i = 0; i < NUMBER_OF_PHONE_NUMBERS; i++) {
        textObj = generateTextMsg(i);
        var req = {
            body:{
                textMessage : textObj
            }
        }
        handle.pushTextMsg(textObj, function(){
            console.log('fake added');
        });
    }

}