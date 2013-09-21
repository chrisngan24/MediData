exports.initializeDiseases = function(){
		
};

exports.parseTextMsg = function(textmessage, village){
	try{
		var diseaseArray = [];	
		var diseaseComponents;
		var n = textmessage.split(",");

		for (var i = 0; i < n.length; i++) {
			diseaseArray.push({});
			diseaseObject = diseaseArray[i];
			diseaseComponents = n[i].split(":");
			diseaseObject[diseaseComponents[0]] = diseaseComponents[1];
			diseaseObject['villageName'] = village.name;
			diseaseObject['_villageId'] = village._id;
		}
	}catch(e){}

	return diseaseArray;

};


var makeDisease = function(name, description){

};

