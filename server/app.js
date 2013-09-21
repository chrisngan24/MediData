var express = require('express');
var handle = require('./routes/handle');
var util = require('./routes/util');
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

// The main caller to the api URL
var output = util.parseDiseases("Malaria,3");
app.get('/api/hello', handle.hello);

app.listen(3000);