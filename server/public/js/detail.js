var gVillage;
$(document).ready(function(){	

	$.ajax({
		type: 'GET',
		url: 'http://localhost:3000/api/villages/' + (location.hash).substring(1),
		success: function(data){
			gVillage = data;
			drawPieChart(data);
			//renderPie(data);

			drawLineChart(data);
			updateStats(data);
		}
	});

});

function updateStats(village){
	$('#village_name').text(village.name);
	$("#village_population").text("Village Population: " + village.population)
	for (var i =0 ; i < village.diseases.length; i++){
		var elId='';
		var elpercent='';

		switch(village.diseases[i].disease){
			case 'Malaria':
				elId = '#mCurrent';
				elpercent = '#mCurrentPercentage'
				break;
			case 'HIV':
				elId = '#hCurrent';
				elpercent = '#hCurrentPercentage'
				break;
			case 'Smallpox':
				elId = '#sCurrent';
				elpercent = '#sCurrentPercentage'
				break;
		}
		$(elId).text(village.diseases[i].count);
		percentage = Math.round(village.diseases[i].count/village.population * 10000 )/10000
		$(elpercent).text(percentage + '%');
		if (percentage > 1) {
			$("#village_status").text("Village Status: DANGER")
			$("#village_status").css("color","red")
		}
		else {
			$("#village_status").text("Village Status: SAFE")
			$("#village_status").css("color","green")
		}
	}
	
}


function drawPieChart(village){

	var pieData = new Array();
	var population = village.population;

	console.log(village);
    
	pieData[0] = village.diseases[0].count;
	pieData[1] = village.diseases[1].count;
	pieData[2] = village.diseases[2].count;

/*
	vs = []

	$.ajax({
		type: 'GET',
		url: 	'http://localhost:3000/api/villages',
		success: function(data) {
			vs = data;

			for (i in vs){
			if((new Date(vs[i].time)=== (new Date())       ))
			{

				var disease = vs[i].disease;
				console.log("hello");
				if (disease === "Malaria") {
					pieData[0]=vs[i].count;
				}
				else if (disease === "HIV") {
					pieData[1]=vs[i].count;
				}
				else if (disease === "Smallpox") {
					pieData[2]=vs[i].count;
				}
			}
		    }
		    */
			pieData[3] = population - pieData[0] - pieData[1] - pieData[2];
			console.log(pieData);
			renderPie(pieData);

}

function renderPie(dataSet){
		$('#healthPieChart').html('');
		var ctx = $("#healthPieChart").get(0).getContext("2d");
		//This will get the first returned node in the jQuery collection.
		var myNewChart = new Chart(ctx);
		console.log(dataSet)
		var data = [
			{
				value: parseInt(dataSet[0], 10),
				color: "#F38630"
			},
			{
				value : parseInt(dataSet[1], 10),
				color : "#E0E4CC"
			},
			{
				value : parseInt(dataSet[2], 10),
				color : "#69D2E7"
			},
			{
				value : parseInt(dataSet[3], 10),
				color : "#900000"
			}	
      ]

		new Chart(ctx).Pie(data, {});
}
function drawLineChart(village){

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

			var dateCounter = 0;

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
					//plotData.dates.push((new Date(vs[i].time)).getUTCMilliseconds().toString());
					dateCounter++;
					plotData.dates.push(dateCounter.toString());
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
			scaleSteps : 15,
			scaleStepWidth : 6,
			scaleStartValue : 0
		};

		new Chart(ctx).Line(data, lineChartOptions);



	}
}