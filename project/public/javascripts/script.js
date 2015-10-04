jQuery(document).ready(function() {
    jQuery('.tabs .tab-links a').on('click', function(e)  {
        var currentAttrValue = jQuery(this).attr('href');
		
        // Show/Hide Tabs
        jQuery('.tabs ' + currentAttrValue).show().siblings().hide();
 
        // Change/remove current tab to active
        jQuery(this).parent('li').addClass('active').siblings().removeClass('active');
 
        e.preventDefault();

    });
	var g_day="";
	var g_month=0;
	var g_year=0;
	var months=["January", "February", "March","April","May","June", "July","August", "September","October","November", "December"];
	var today = new Date();
	var mm = today.getMonth();
	var year=today.getFullYear();
	var prevM=mm;
	var prevY=year;
	if(mm==0){
		
		prevM=11;
		
	}
	else{
		prevM=mm-1;
		
	}
	
	if(prevM==11){
		
		prevY=year-1;
		
	}
	
	
	//setting the current month.
	for(i=0;i<months.length;i++){
		
		if(i==mm){
			
			$('#Calendar table thead #month').text(months[i]);
			$('#Calendar table thead #year').text(year);
			
		}
		
	}
	
	//set the days of the current day and month.==============================================================
	//get the first day's day of the week 
	var first = new Date(year, mm, 1);
	var day_of_week = first.getDay();
	var total_days = DaysInMonth(year,mm);
	//get end of the previous months
	var prev_total_days = DaysInMonth(prevY,prevM);
	
	var prev_start = prev_total_days;
	
	if(day_of_week!=0){
		
		prev_start=prev_total_days-(day_of_week-1);
		
	}
	
	//all in one function for filling in calendar.
	makeCalendar(prev_start, prev_total_days, day_of_week, total_days, prevM, prevY, mm, year);

//click time events===========================================================================================	
	//if you clicked previous
	$('#Calendar table thead #prev').click(function(){
			var temp=$('#Calendar table thead #month').text();
			//var temp2=$('#Calendar table thead #year').text();
			var prevMonth="";
			var prevMon=0;
			var prevYear=Number($('#Calendar table thead #year').text());
		for(i=0;i<months.length;i++){
			
			if (temp.localeCompare(months[0])==0){
				
				prevMonth="December";
				prevMon=11;
				prevYear=prevYear-1;
			
			}
			else
				prevMonth=months[i-1];
				prevMon=i-1;
				//prevYear stays the same
			if(temp.localeCompare(months[i])==0){
				
				temp=months[i];
				
				break;
			}
			
		}
	
	$('#Calendar table thead #month').text(prevMonth);
	$('#Calendar table thead #year').text(prevYear);
	$("#calendar tbody").empty();
	//set days
	var pM=prevMon;
	var pY=prevYear;
	if(prevMon==0){
		
		pM=11;
		
	}
	else{
		pM=prevMon-1;
		
	}
	
	if(pM==11){
		
		pY=prevYear-1;
		
	}
	
	var prevfirst=new Date(prevYear, prevMon, 1);
	var jour=prevfirst.getDay();
	var ptotal_days=DaysInMonth(prevYear,prevMon);
	var pr_total_days = DaysInMonth(pY,pM);
	
	var p_start = pr_total_days;
	
	if(day_of_week!=0){
		
		p_start=pr_total_days-(jour-1);
		//alert(pr_total_days+" - "+(jour-1)+" = "+p_start);
	}	
	clear();
	makeCalendar(p_start, pr_total_days, jour, ptotal_days,pM,pY,prevMon,prevYear);
	
	});
	
	//if you clicked next
	$('#Calendar table thead #next').click(function(){
			var temp=$('#Calendar table thead #month').text();
			var nextMonth="";
			var nextYear=Number($('#Calendar table thead #year').text());
			var nextM=0;
		for(i=0;i<months.length;i++){
			
			if (temp.localeCompare(months[11])==0){
				
				nextMonth="January";
				nextYear=nextYear+1;
				nextM=0;
				break;
				
			}
			else
				nextMonth=months[i+1];
				nextM=i+1;
			if(temp.localeCompare(months[i])==0){
				
				temp=months[i];
				break;
			}
			
		}
	
	$('#Calendar table thead #month').text(nextMonth);
	$('#Calendar table thead #year').text(nextYear);
	$("#calendar tbody").empty();
	//set days
	var pM=nextM;
	var pY=nextYear;
	if(nextM==0){
		
		pM=11;
		
	}
	else{
		pM=nextM-1;
		
	}
	
	if(pM==11){
		
		pY=nextYear-1;
		
	}
	
	var prevfirst=new Date(nextYear, nextM, 1);
	var jour=prevfirst.getDay();
	var ptotal_days=DaysInMonth(nextYear,nextM);
	var pr_total_days = DaysInMonth(pY,pM);
	
	var p_start = pr_total_days;
	
	if(day_of_week!=0){
		
		p_start=pr_total_days-(jour-1);
		//alert(pr_total_days+" - "+(jour-1)+" = "+p_start);
	}	
	clear();
	makeCalendar(p_start, pr_total_days, jour, ptotal_days, pM,pY,nextM,nextYear);
	//makeCalendar(prev_start, prev_total_days, day_of_week, total_days, prevM, prevY, mm, year
	});	
	

	
});



//Days in each month
function DaysInMonth(year,month){
	
	/*var monthStart = new Date(year,month,1);
	var monthEnd = new Date(year, month+1,1);
	var monthLength =Math.round((monthEnd - monthStart)/(1000*60*60*24));
	//alert(monthLength);
	return monthLength;*/
	month=month+1;
	//alert("Month: "+ month);
    var d = new Date(year, month, 0);
	//alert(d);
    return d.getDate();
	
}

function dateCalendar(prev_start, prev_total_days, day_of_week, total_days, prevM, prevY, mm, year){
	
		//put numbers of previous month on calendar
	for(var i=prev_start, j=0;i<=prev_total_days;i++,j++){
		
		
		$('#calendar tbody #'+j).html(i);
		$('#calendar tbody #'+j).attr("month",prevM);
		$('#calendar tbody #'+j).attr("year",prevY);
	}
	
	//put all days of current month.
	for(var k=day_of_week,l=1;l<=total_days;k++,l++){
		
		
		$("#calendar tbody #"+k).html(l);
		$("#calendar tbody #"+k).attr("month",mm);
		$("#calendar tbody #"+k).attr("year",year);
	}
	
	//put days for next month
	var begin=1;
	for(var i=0;i<42;i++){
		var s =$("#calendar tbody #"+i);
		
		if(!s.html()){
			
			s.html(begin);
			begin++;
			
			if(mm==11){
				
				s.attr("month",0);
				s.attr("year", year+1)
				//increment year
				
			}
			else{
				
				s.attr("month",(mm+1));
				s.attr("year",year);
			}
			
		}
		
	}
	
}

function makeCalendar(prev_start, prev_total_days, day_of_week, total_days, prevM, prevY, mm, year){
	//make blank cells and rows
	var table = document.getElementById("calendar").getElementsByTagName('tbody')[0];
	var row;

		for(i=0,h=0;i<7,h<42;i++){
		
		//for new rows.
		row=table.insertRow(i);
		//row.setAttribute("id",h);
		for(j=0;j<7;j++,h++){

		
			var cell=row.insertCell(j);
			cell.setAttribute("id",h); 
			cell.setAttribute("onclick", "test(this)");
		}
			
		
	}
	//alert("Previous start date: "+prev_start+"\nPrevious total days: "+prev_total_days +"\nDay of the week month starts on: "+day_of_week+"\nTotal amount of days: "+total_days)
	dateCalendar(prev_start, prev_total_days, day_of_week, total_days, prevM, prevY, mm, year);
	
}


function test(location){
	
	//alert($('#'+location.id).text()+"\n Month: "+$('#'+location.id).attr("month")+"\n Year: "+$('#'+location.id).attr("year"))
	
	/*document.getElementById('day').value = $('#'+location.id).text();
	document.getElementById('month').value = $('#'+location.id).attr("month");
	document.getElementById('year').value = $('#'+location.id).attr("year");*/
	g_day = Number($('#'+location.id).text());
	g_month = $('#'+location.id).attr("month");
	g_year = $('#'+location.id).attr("year");
	//$('input[name="fday"]').attr("value",$('#'+location.id).text());
	$('#d').val(Number($('#'+location.id).text()));
	$('#m').val(Number($('#'+location.id).attr("month")));
	$('#y').val(Number($('#'+location.id).attr("year")));
	//alert($("#d").val())
	$("#events").remove();
	
$.post("/get_events",
		{
			month: $('#'+location.id).attr("month"),
			day: $('#'+location.id).text(),
			year: $('#'+location.id).attr("year")
		}, function(data){
			
			//alert("Data: "+data.day)
			var source=$("#some-template").html();
			var template=Handlebars.compile(source);
			var test={event:data};
			$("body").append(template(test));
			
			//trying to get data before it's posted. 
			//alert("fin")
		});
		

	

}

function sub(){
	$('#events').remove();
	$.post("/new_event",
		{
			month: $('#m').val(),
			day: $('#d').val(),
			year: $('#y').val(),
			Title: $('#Title').val(),
			time: $('#time').val(),
			comments: $('#comments').val(),
			location: $('#location').val()
			
		}, function(data){
			clear_input();
			//alert("Data: "+data.day)
			var source=$("#some-template").html();
			var template=Handlebars.compile(source);
			var test={event:data};
			$("body").append(template(test));
			
			//trying to get data before it's posted. 
			//alert("fin")
		});
	
}

function clear_input(){
	
			$('#Title').val('');
			$('#time').val('');
			$('#comments').val('');
			$('#location').val('');
	
}

function clear(){
	
		clear_input();
		$('#m').val('');
		$('#y').val('');
		$('#d').val('');
		$("#events").remove();
	
}

function erase(id,day,month,year){
	$('#events').remove();
	$.post('/erase', {
		
		_id: id,
		day: day,
		month: month,
		year: year
		
	}, function(data){
			clear_input();
			//alert("Data: "+data.day)
			var source=$("#some-template").html();
			var template=Handlebars.compile(source);
			var test={event:data};
			$("body").append(template(test));
		});

	
}

function change_title(id, day, month, year){


     $('.title').editable('/modify_title', 
	 {
         submitdata : {day: day, month: month, year: year}
     });
	 

}

/*
function change_time(id){
	
	
	
}*/








	
