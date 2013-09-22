exports.initializeDiseases = function(){
		
};

exports.parseTextMsg = function(textmessage, village){
		var diseaseArray = [];	
	try{
		var n = textmessage.split(",");
		var diseaseObject = {};

		for (var i = 0; i < n.length; i+=2) {			
		
			var diseaseCode = n[i].trim();
			var diseaseCount = n[i+1];
			diseaseObject = {}

			switch(diseaseCode){
				case 'M': //Malaria
					diseaseObject['disease'] = 'Malaria';
					diseaseObject['count'] = diseaseCount;
					break;
				case 'S': //Smallpox
					diseaseObject['disease'] = 'Smallpox';
					diseaseObject['count'] = diseaseCount;
					break;
				case 'H': //HIV
					diseaseObject['disease'] = 'HIV';
					diseaseObject['count'] = diseaseCount;
					break;
				
				
			};

			if(diseaseObject['disease'] != null){
				diseaseObject['name'] = village.name;
				diseaseObject['time'] = new Date().getTime();
				diseaseObject['_villageId'] = village._id;
				diseaseArray.push(diseaseObject);
				console.log("Parsed: " + diseaseObject.disease);
			}

		}
	} catch(e){
		console.log("ERROR in text message parse." + e);
	}

	console.log(diseaseArray);
	return diseaseArray;

};

exports.checkText = function(text){
	var n = text.split(",");
	
	if (n.length != 6)
		return false;
	else
		return true;
}

function s4() {
  return Math.floor((1 + Math.random()) * 0x10000)
             .toString(16)
             .substring(1);
};

exports.getUUID = function() {
  return s4() + s4()  + s4()  + s4()  +
         s4()  + s4() + s4() + s4();
}