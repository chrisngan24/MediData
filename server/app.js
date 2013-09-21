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

// The main caller to the api URL

app.get('/api/hello', handle.hello);
// app.get('/api/villages', handle.getVillages);
app.get('/api/villages', function(req, res){
    villages = [{
            name:"First Village", "diseases": {"Malaria" : 10,"HIV" : 39,"Small Pox" : 2} 
        },                    
        {
            name:"Second Village", "diseases": {"Malaria" : 120,"HIV" : 12,"Small Pox" : 4} 
        }
    ]
    res.send(villages);
})
app.get('/api/diseases', handle.getDiseases);
app.get('/api/phoneNumbers', handle.getPhoneNumbers);




// app.post()
// app.push()
// app.delete();
// 
// 
var registerNumbers = function(){
	var phoneNumber = {
		'number' : '9058871226',
        'administrator' : 'Clement Fung'
	}

    return phoneNumber;
}

var req = {};
req.body = {};
req.body.phoneNumber = registerNumbers();

handle.registerNumber(req, function(){});
// function test()
// {
//    console.log('hello');
//    setTimeout(test, 5000);
// }

// test();

var generateTextMsg = function() {
    var textMsg = {
        'message' : 'Malaria:3,HIV:4',
        'phoneNumber' : '9058871226'
    };

    return textMsg;
}

// var diseaseStats = util.parseTextMsg(generateTextMsg().message);

app.listen(3000);