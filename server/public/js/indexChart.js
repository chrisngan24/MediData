var diseases = window.diseases;
$(document).ready(function(){
	var villages;
	for(var i = 0; i < diseases.length; i++){
		$('#diseaseCheckBoxes').append('<label class="checkbox">'+
			'<input type="checkbox" class="diseaseCheckBox">' +diseases[i]+'</label>');	
	}

	$.ajax({
		type: 'GET',
		url : 'http://localhost:3000/api/villages',
		success: function(data){

			villages = data;
			for(var i = 0; i < villages.length; i++){
				$('#villageCheckBoxes').append('<label class="checkbox">'+
				'<input type="checkbox" class="villageCheckBox">' +villages[i].name+'</label>');	
			}			

			drawChart(villages);

			
		}
	});

});


function drawChart(villages){
	checkedDiseases =[];
	checkedVillages = [];
	$('.villageCheckBoxes').each(function(i, ele){
		checkedVillages.push(villages[i]);
	})

	$('.diseaseCheckBox').each(function(i, ele){
		checkedDiseases.push(diseases[i]);
	})

	debugger;

	var plotData = {
		dates : [],
		data:[]
		
	}

	for (var i =0; i < window.diseases.length; i ++){
		plotData.data.push([]);
	}

	vs = [];


	function render(allData){
	
		$('#queryChart').html('');
		var ctx = $("#queryChart").get(0).getContext("2d");
		//This will	 get the first returned node in the jQuery collection.
		var mChart = new Chart(ctx);

		var data = {
			labels : plotData.dates,
			datasets : [
				{
					fillColor : "rgba(250,100,0,0.5)",
					strokeColor : "rgba(250,100,0,1)",
					pointColor : "rgba(250,100,0,1)",
					pointStrokeColor : "#fff",
					data : allData
				}
			]
		};

		var lineChartOptions = {
			scaleOverride : true,
			scaleSteps : 20,
			scaleStepWidth : 1,
			scaleStartValue : 0
		};

		new Chart(ctx).Line(data, lineChartOptions);
	}

}


