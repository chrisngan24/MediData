exports.initializeDiseases = function(){
		
};

exports.parseTextMsg = function(textmessage, village){
	try{
		var diseaseArray = [];	
		var diseaseComponents;
		var n = textmessage.split(",");

		for (var i = 0; i < n.length; i++) {			
			var diseaseObject = {};

			diseaseComponents = n[i].split(":");
			switch(diseaseComponents[0]){
				case 'M': //Malayria
					diseaseObject['disease'] = 'Malaria';
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
			if(diseaseObject['disease'] != null){
				diseaseObject['name'] = village.name;
				diseaseObject['time'] = new Date().getTime();
				diseaseObject['_villageId'] = village._id;
				diseaseArray.push(diseaseObject);
			}
			
		}
	}catch(e){}

	return diseaseArray;

};

function s4() {
  return Math.floor((1 + Math.random()) * 0x10000)
             .toString(16)
             .substring(1);
};

exports.getUUID = function() {
  return s4() + s4()  + s4()  + s4()  +
         s4()  + s4() + s4() + s4();
}