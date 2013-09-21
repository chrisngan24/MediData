$(document).ready(function(){	
	
	var plotData = {
		dates : [],
		data:[[],[],[]]
		// spData : [],
		// mData : [],
		// hData : []
	}

	vs = []

	$.ajax({
		type: 'GET',
		url: 	'http://localhost:3000/api/diseases',
		success: function(data) {
			vs = data;
			
			for (var i in vs) {
				
				var disease = vs[i].disease;
				if (disease === "Malaria") {
					plotData.data[0].push(vs[i].count);
				}
				else if (disease === "HIV") {
					plotData.data[1].push(vs[i].count);
				}
				else if (disease === "Smallpox") {
					plotData.data[2].push(vs[i].count);
					plotData.dates.push((new Date(vs[i].time)).getUTCMilliseconds().toString());
					//plotData.dates.push(new Date(vs[i].time));
				}

			}	
			render(plotData.data[0])
		}
	});

	$('#graphingSelection').change(function(e){
		
		var selected =e.target.selectedIndex;
		
		render(plotData.data[selected]);

	})

	//Get context with jQuery - using jQuery's .get() method.
	function render(dataSet){
		$('#myChart').html('');
		var ctx = $("#myChart").get(0).getContext("2d");
		//This will get the first returned node in the jQuery collection.
		var myNewChart = new Chart(ctx);

		var data = {
			labels : plotData.dates,
			datasets : [
				{
					fillColor : "rgba(250,100,0,0.5)",
					strokeColor : "rgba(250,100,0,1)",
					pointColor : "rgba(250,100,0,1)",
					pointStrokeColor : "#fff",
					data : dataSet
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
})