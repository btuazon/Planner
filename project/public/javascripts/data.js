
/*My attempt at adding dynamic items.*/
$(document).ready(function(){
	
	
	
	$.getJSON('/user', function(data){
		var source=$("#some-template").html();
		var template=Handlebars.compile(source);
		var test={users:data};
		
		$("body").append(template(test));
		
	
		
	});
	
	
	
	
});

//onclick function for text


function change_email(ident){
	
	var temail=$("#myTable #"+ident+" td:eq(1)");
	temail.editable("/modify_email");
   
}
  
function change_username(ident){
	
	var tuser=$("#myTable #"+ident+" td:eq(0)");
	tuser.editable("/modify_username");
	
}
 
  
function erase(id){
	
	$.post('/remove', 
			{
				_id: id,
				day: 5
			},
			function(data,status){
				location.reload();
				//alert('nope');
			}); 
	
}
		