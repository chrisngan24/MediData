var express = require('express');
var handle = require('./routes/handle');
var util = require('./routes/util');
var path = require('path');
var app = express();

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

// app.post()
// app.push()
// app.delete();
// 
// 


// The main caller to the api URL

app.get('/api/villages', handle.getVillages);
/*app.get('/api/villages', function(req, res){
    villages = [{
            name:"First Village", "diseases": {"Malaria" : 10,"HIV" : 39,"Small Pox" : 2} 
        },                    
        {
            name:"Second Village", "diseases": {"Malaria" : 120,"HIV" : 12,"Small Pox" : 4} 
        }
    ]
    res.send(villages);
})*/
app.get('/api/diseases', handle.getDiseases);
app.get('/api/phoneNumbers', handle.getPhoneNumbers);
app.get('/api/villages/:phoneNumber', handle.getVillageByPhoneNumber);
app.listen(3000);

var response = {
    send : function(blah){
        console.log('DeleteAll');
        var phoneNumbers = [];
        
        phoneNumbers.push({
            'number' : '12247721893',
            'administrator' : 'Clement Fung',
            'name' : 'village 1',
            'latitude' :1,
            'longitude' : 1
        });
        console.log(phoneNumbers);
        phoneNumbers.push({
            'number' : '16478897900',
            'administrator' : 'Arthur Yan',
            'name' : 'village 2',
            'latitude' :2,
            'longitude' : 2
        });
        phoneNumbers.push({
            'number' : '16478651425',
            'administrator' : 'Yannick Ngana',
            'name' : 'village 3',
            'latitude' :3,
            'longitude' : 3
        });
        console.log('hello')
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
handle.deleteAll({}, response)

// function test()
// {
//    console.log('hello');
//    setTimeout(test, 5000);
// }
// 
var generateTextMessages = function(){
    console.log('generating');
    var NUMBER_OF_PHONE_NUMBERS = 15;
    var PHONES = ['12247721893', '16478897900', '16478651425'];
    var DISEASE_TYPES = ['Malaria', 'HIV', 'SmallPox'];

    // x is a number by which the traits are randomized
    var generateTextMsg = function(x) {

        textcode = DISEASE_TYPES[(x + 4) % 3] + ':' + x + ',' + DISEASE_TYPES[(x + 2) % 3]  + ':' + (x+2);
        console.log(textcode);

        var textMsg = {
            'message' : textcode,
            'phoneNumber' : PHONES[x % 3]
        };

        return textMsg;
    };

    var diseapseStats = [];
    var textObj;
    
    // for (var i = 0; i < NUMBER_OF_PHONE_NUMBERS; i++) {
        textObj = generateTextMsg(0);
        var req = {
            body:{
                textMessage : textObj
            }
        }
        handle.pushTextMsg(req);
    // }

}





