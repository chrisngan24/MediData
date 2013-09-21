var express = require('express');
var handle = require('./routes/handle');
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
    // app.use(express.static(path.join(__dirname, 'public')));
    app.use(allowCrossDomain);
});



app.get('/api/hello', handle.hello);
app.get('/api/villages', handle.getVillages);
app.get('/api/diseases', handle.getDiseases);
app.get('/api/phoneNumbers', handle.getPhoneNumbers);



// app.post()
// app.push()
// app.delete();
// 
// 
var registerNumbers = function(){
	var phoneNumber = {
		'number' : '9058871226'

	}
}
// function test()
// {
//    console.log('hello');
//    setTimeout(test, 5000);
// }

test();


app.listen(3000);