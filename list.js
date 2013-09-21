// Load the twilio module
var twilio = require('twilio');
 
// Create a new REST API client to make authenticated requests against the
// twilio back end
var client = new twilio.RestClient('AC6ccc5ad275f60124a022af13ae9d4773', 'ca5dfff962e288351dca2103705ebbda');

var total_messages = 0;
var new_messages = [];

//Loop through a list of SMS messages sent from a given number
client.listSms({
    from:'+12247721893'
}, function (err, responseData) {
    
    if (total_messages != responseData.smsMessages.length) {
    	total_messages = responseData.smsMessages.length;
    	console.log(total_messages);
    	console.log(responseData.smsMessages[0].body);
    }

    
    // responseData.smsMessages.forEach(function(message) {
        // console.log('Message sent on: '+message.dateCreated.toLocaleDateString());
        // console.log(message.body);
    // });

});

/*
	every X minutes check the SMS messages
	if the # of messages has changed: 
	check how much it has changed by
	if it's changed by only 1, then append the newest message
	if its changed by more than 1, loop through diff_messages and add all of those
	increment the number of total messages ?

*/
