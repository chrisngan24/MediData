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
	var villageIndex = 0;
	
	
	switch(village.name){
		case 'Tagi':
			villageIndex = 0;
			break;
		case 'Pagong':
			villageIndex = 1;
			break;
		case 'Rattana':
			villageIndex = 2;
			break;
	}
	


	$('#village_name').append('<image width="100" style="margin-right:0.5em;" height="80"src="images/'+window.flags[villageIndex]+'""></image>');
	$('#village_name').append(village.name);
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
		percentage = Math.round(village.diseases[i].count/village.population * 1000000 )/10000
		$(elpercent).text(percentage + '%');
		
	}
	
	var avg_percent = (parseFloat($("#sCurrentPercentage").html().replace('%','')) + parseFloat($("#hCurrentPercentage").html().replace('%','')) + parseFloat($("#mCurrentPercentage").html().replace('%','')))/3

	if (avg_percent > 1.0) {
		$("#village_status").text("Village Status: DANGER")
		$("#village_status").addClass('label-important');
	}
	else if (avg_percent > 0.5) {
		$("#village_status").text("Village Status: WARNING")
		$("#village_status").addClass('label-warning')
	}
	else {
		$("#village_status").text("Village Status: SAFE")
		$("#village_status").addClass('label-success')
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
				color : "#53e885"
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

		new Chart(ctx).Doughnut(data, {});
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
					//dateCounter++;
					plotData.dates.push(' ');
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
			hAxis :{
				textPosition : 'none'
			},
			// scaleFontSize : 0,
			scaleStartValue : 0

		};

		new Chart(ctx).Line(data, lineChartOptions);



	}
}