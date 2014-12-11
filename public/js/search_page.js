
 function init() {
	 
	 var searchInput;
	    var searchBy;
	    var announce_title;
	    var announce_content;
	    console.log("I'm ready!! get going!");
	    
	    searchInput = $('#searchInput').val();
		searchBy = $('#searchBy').val();
		
	    
	    $('#submit-search').click(function(){
	    	
			
			if(searchBy==="announcement") 
				{
				function getAnnouncementResults(){
			        $.ajax({
			            url:  '/search',
			            type: 'GET',
			            dataType: 'json'
			        }).done(function(data){
			            responseBody = data;
			            
			if(responseBody != "" && responseBody != null && responseBody != undefined){
				
				var postBodyParent = $('<div class="panel panel-primary" id = "resultContainer"></div>');
	            var postBodyHeader = $('<div class="panel-heading">Announcement</div>');
	               
	            postBodyParent.append(postBodyHeader);

	                responseBody.forEach(function(announceObj, index){
	                    var collaspeClass = "";
	                    if(index<1){
	                        collaspeClass = "panel-collapse collapse in";
	                    }
	                    else{
	                        collaspeClass = "panel-collapse collapse";
	                    }
	                    var postBody = $('<div class="panel-group" id="accordion"></div>');
	                    var hrefValue = "#collapse"+index;
	                    var collapseValue = "collapse"+index;
  
	                	});
				
					}
			   });
			        
			  }
			
				}
			
	       });
	    
     }
			$(document).on('ready', init);
				
				
			
/*
$(document).ready(function() 
		{
		
	console.log("I'm ready!! get going!");
	var searchInput;
	var searchBy;
	
//change();
	
	
	$('#submit-search').click(function(){
		//searchInput = $('#searchInput').val();
		//searchBy = $('#searchBy').val();
		
		$.ajax({
			 url:  'search',
	        type: 'POST',
	        dataType: 'json'
	    }).done(function(data){
	    	console.log("......tttttteeeeesssttt");
	        //console.log(data);
	        //console.log(searchBy);
	        //console.log(searchInput);
	        //if(searchBy==="status")
	        	//{
	      //if(searchInput==="i am ok")
	    	 // searchInput=="GREEN";}
	        //  alert(data);
	       // console.log(data);
	      });
	    });	
 });






/*
function change(){
	var option = document.getElementById('option');
	var search = document.getEelementById('search');
	var optionStatus = document.getElementById('optionStatus');
	var value=options.value;
	if(value=="status"){
		optionStatus.removeAttribute("hidden");
		search.setAttribute("hidden","hidden");
		search.setAttribute("class");
		consol.log("is it happening");
		
	} else {
		search.removeAttribute("hidden");
		search.setAttribute("class","form-control");
		optionStatus.setAttribute("hidden","hidden");
		console.log("else something is happeing");
	}
	
}

/*
$(document).ready(function() 
		{
		
	console.log("I'm ready!! get going!");
	var searchType;
	var searchString;
	$('.submit-search').click(function() {
		var option = $('option').val();
		var searchItem = $('searchItem').val();
			console.log("testing1")
		 $.ajax({
            url:  '/search',
            type: 'POST',
            dataType:'json',
            //data:{option: option, searchItem: searchItem}
            	//data: {options, searchItem}
        }).done(function(data){
        	console.log("testing");
        	searchcriteria = data;
            console.log(data);
            });
	});		
	
		});


	
/***
	$('.name').on('slect', function(r) {
		var searchtype; // to get the search of type username, status, wall, announcement, chat
		r.preventDefault();
		console.log('search type slected!!');
		url : 'search'
		type : 'POST'
		dataType : 'json'	
	}).done(function(){
		
		data=searchtype;
		console.log(searchtype);
		
	});
	****/
	