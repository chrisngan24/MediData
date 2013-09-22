var diseases = window.diseases;
$(document).ready(function(){
	var villages;
	console.log(diseases);
	for(var i = 0; i < diseases.length; i++){
		console.log(diseases[i])
		$('#diseaseSelect').append('<option>'
			 +diseases[i]+'</option>');	
	}

	debugger;

	$.ajax({
		type: 'GET',
		url : 'http://localhost:3000/api/villages',
		success: function(data){

			villages = data;
			for(var i = 0; i < villages.length; i++){
				$('#villageCheckBoxes').append('<label class="checkbox">'+
				'<input type="checkbox" class="villageCheckBox">' +villages[i].name+'</input></label>');	
				for (var j = 0 ; j < villages[i].diseases.length;j++){
					var percentages= Math.round(villages[i].diseases[j].count/villages[i].population * 1000000 )/10000
					console.log(percentages);
					if(percentages>0.5){
						$('#warning'+villages[i]._id).removeClass('hidden');
						break;
					}
				}
			}			


			drawChart(villages);

			$('#querySubmit').click(function(eve){
				drawChart(villages);
			});


		}
	});

});


function drawChart(villages){
	checkedDiseases =[];
	checkedVillages = [];
	$('#villageCheckBoxes input').each(function(i, ele){
		if(ele.checked == true)
			checkedVillages.push(villages[i]);
	});

	var disease = $('#diseaseSelect option:selected').text()
	
 	queryString = '?disease=' + disease +'&_villageId=';

 	for(var i = 0; i < checkedVillages.length; i ++){
 		queryString+= checkedVillages[i]._id;
 		if(i != checkedVillages.length-1)
 			queryString+= '+';
 	}

 	var max =0;

	var plotData = {
		dates : [],
		data:[]		
	}

	

	vs = [];
	$.ajax({
		type:'GET',
		url: 'http://localhost:3000/api/diseases' + queryString,
		success: function(data){
			console.log(data);
			vs = data;
			plotData = {
				dates : [],
				data:[]		
			}
			


			for (var i =0; i < checkedVillages.length; i ++){
				plotData.data.push([]);
				
			}

			var dateCounter = 0;

			for (var i in vs) {			
				for (var j = 0; j < checkedVillages.length;j++){
					if(vs[i]._villageId == checkedVillages[j]._id){
						plotData.data[j].push(vs[i].count);
						break;
					}
				}
				if(i %checkedVillages.length ==0){
					//plotData.dates.push(new Date(vs[i].time).getDate());
					dateCounter++;
					plotData.dates.push(dateCounter.toString());
				}
				if(vs[i].count > max)
					max = vs[i].count;
			}	

			render();
		}
	})

	function render(){
	
		$('#queryChart').html('');
		var ctx = $("#queryChart").get(0).getContext("2d");
		//This will	 get the first returned node in the jQuery collection.
		var mChart = new Chart(ctx);

		dataSetArray =[];
		for(var i = 0; i < plotData.data.length; i++)
			dataSetArray.push({
				fillColor : "rgba("+i*10+",100,0,0.5)",
				strokeColor : "rgba("+i*10+",100,0,0.5)",
				pointColor : "rgba("+i*10+",100,0,)",
				pointStrokeColor : "#fff",
				data : plotData.data[i]
			})

		var data = {
			labels : plotData.dates,
			datasets : dataSetArray
		};

		var lineChartOptions = {
			scaleOverride : true,
			scaleSteps : 15, 
			scaleStepWidth : 6,
			scaleStartValue : 0,
			// scaleShowValues : false,
			scaleFontSize : 0
			// hAxis: { 
			// 	textPosition:'none'
				
			// }	
		};
		
		new Chart(ctx).Line(data, lineChartOptions);
	}

}


