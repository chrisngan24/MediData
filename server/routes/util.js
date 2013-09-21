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
			switch(diseaseComponents[0]){
				case 'M': //Malayria
					diseaseObject['disease'] = 'Malayria';
					diseaseObject['count'] = diseaseComponents[1];
					break;
				case 'H': //HIV
					diseaseObject['disease'] = 'HIV';
					diseaseObject['count'] = diseaseComponents[1];
					break;
				case 'S': //Smallpox
					diseaseObject['disease'] = 'Smallpox';
					diseaseObject['count'] = diseaseComponents[1];
					break;
				default:
					break;
				
			};
			
			diseaseObject['name'] = village.name;
			diseaseObject['time'] = new Date().getTime();
			diseaseObject['_villageId'] = village._id;
		}
	}catch(e){}

	return diseaseArray;

};


var makeDisease = function(name, description){

};

