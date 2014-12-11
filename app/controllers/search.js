
var express = require('express')
//var SearchRest = require('../models/SearchRest');
var User = require('../models/UserRest');
var tempUser = require('../models/UserRest');
var PublicMessages = require('../models/ExchangeInformationRest');
//var SearchChats = require('../models/SearchRest');
var PrivateMessages = require('../models/ExchangeInformationRest');
var Announcements = require('../models/AnnouncementRest');
//var Status = require('../models/ShareStatusRest');
//var People = require('../controllers/people.js');
//var pagination = require('../../node_modules/pagination');
//var paginate = require('../../node_modules/express-paginate');
//var pagination = require('pagination');
//var paginate = require('express-paginate')
var peoplelist = require('../controllers/people.js');
var jade=require('jade');



module.exports = function(_, io, participants, passport) {
	
	return{
		//		Call the model for wall to hit database
		
		searchResult: function(req, res) {
			var searchBy = req.body.option;
			var searchInput = req.body.searchInput;
			var userResults = [];
			var sortedUserResults = [];
			var user_name = req.session.passport.user.user_name;
			var statusResults = [];
			var publicMessageResults = [];
			var privateMessageResults = [];
			var user1 = req.body.author;
			var user2 = req.body.target;
			var AnnouncementResults = [];
			var AnnouncementResultsArray = [];
			var AnnouncementResultsList = [];
			var userlist = [];
			//var GREEN = "GREEN";
			//var RED = "RED";
			//var YELLOW = "YELLOW";
			var stopwords = ["a","able","about","across","after","all","almost","also","am","among","an","and","any","are","as","at","be","because","been","but","by","can","cannot","could","dear","did","do","does","either","else","ever","every","for","from","get","got","had","has","have","he","her","hers","him","his","how","however","if","in","into","is","it","its","just","least","let","like","likely","may","me","might","most","must","my","neither","no","nor","not","of","off","often","on","only","or","other","our","own","rather","said","say","says","she","should","since","so","some","than","that","the","their","them","then","there","these","they","this","tis","to","too","was","us","wants","was","we","were","what","when","where","which","while","who","whom","why","will","with","would","yet","you","your"];
			var onlinepeople = [];
			var onlineuserslist = [];
			var offlineuserslist = [];
			//var finallist = [];		
			
			var temp=0;
			var temz=0; 

			
			
//			user name
			if(searchBy === "username"){
				
				
				User.getAllUsers(function(err, result){
					for(var i=0; i<result.length; i++)
						{
						if (result[i].local.name.search(searchInput)>-1)
							{
							console.log(result[i]);
							userResults.push(result[i]);
							}
						}
					 
					console.log("...........userResults.........");
					console.log(userResults);
					console.log(".............................");
					
					//res.render("search",{userResults:userResults});
				
				for(var key in participants.online){
					if(participants.online.hasOwnProperty(key))
						{
						onlinepeople.push(participants.online[key].userName);
						}
				}
				
				console.log("............olinepeopleque..............");
				console.log(onlinepeople);
				console.log(".............................");

				
				
				for (var r=0; r<userResults.length; r++)
					{
					for (var btr=0; btr<onlinepeople.length; btr++)
						{
					
						if (userResults[r].local.name===onlinepeople[btr])
						{
							onlineuserslist[temp]=userResults[r];
							temp=temp+1;
						}
						}
					}
				var btrt=0;
				
					for (var vrt=0; vrt<userResults.length; vrt++)
					{
					for (var tmz=0; tmz<onlineuserslist.length; tmz++)
						{
						if (userResults[vrt].local.name!==onlineuserslist[tmz].local.name)
						{
							offlineuserslist[btrt]=userResults[vrt];
							btrt=btrt+1;
						}
						}
					}
				btrt=0;
					
				console.log("test.......online....test..test...test");

				console.log(onlineuserslist);
				
				console.log(".............................");

				
				console.log("test.......offline...test...test");
				
				console.log(offlineuserslist);
				
				console.log(".............................");

				
			
				
				//res.render("search",{onlineuserslist:onlineuserslist});
				
				res.render("search",{onlineuserslist:onlineuserslist,offlineuserslist:offlineuserslist});
				
				
				
				for (var mnt=0; onlineuserslist.length<mnt; mnt++)
					{
				onlineuserslist[mnt]=undefined;
					}
				for (var tmn=0; offlineuserslist.length<tmn; tmn++)
					{
				offlineuserslist[tmn]=undefined;
					}
				for (var lp=0; onlinepeople.length<lp;lp++)
					{
					onlinepeople[lp]=undefined;
					}
				
				
				});
				
			}
			
			if(searchBy ==="announcement"){
				Announcements.getAllAnnouncements(function(err, result) {
					
					var Flag=searchInput;
					
					for(var n=0; n<result.length; n++)
						{
						for(var q=0; q<stopwords.length; q++)
						{
						if(searchInput===stopwords[q])
						Flag=undefined;
						}
						searchInput=Flag;
						
						if (searchInput!=undefined && (result[n].local.title.search(searchInput)>-1))
							{
							console.log(result[n]);
							AnnouncementResults.push(result[n]);
							}
						}
					//var count = AnnouncementResults.length;
					
					//var  nopages=Math.ceil(count/10);
					//var currentpage;
					//console.log(nopages);
					//var pageset1 = [];
					//var pageset2 = [];
					//var pageset3 = [];
					//var pageset4 = [];
					
					//for(var currentpage=0; currentpage<nopages; currentpage++)
						//{
						//for (var s=0; s<10; s++)
						//{
							//pageset1[s]=AnnouncementResults[s];	
						//}
						//for (var s=10; s<20; s++)
						//{
							//pageset2[s]=AnnouncementResults[s];
						//}
						//}
						
						
					
					//var pagination = require('pagination');
					//var paginator = new pagination.AnnouncementResults({prelink:'/', current: 10, rowsPerPage: 200, totalResult: 10020});
					//console.log(paginator.render());
					/*var count=AnnouncementResults.length;
					var  nopages=Math.ceil(count/10);
					var currentpage=1;
					console.log(nopages);
					while (count>0)
						{
						AnnouncementResultsArray.push(AnnouncementResults.splice(0, 10));
						}
					if (typeof req.query.page !=='undefined')
						{
						currentPage = +req.query.page;
						}
					AnnouncementResultsList = AnnouncementResultsList[+currentpage-1];
						
					res.render("search", {list:AnnouncementResultsList, nopages: nopages, AnnouncementResults:AnnouncementResultsList });
					console.log(list);
					console.log(nopages);*/
						
					//var paginator = pagination.create('AnnouncementResults', {prelink:'/',current: 1,
						//rowsPerPage:10,totalResult: 1000});
					//console.log(panginator.render());
					
					res.render("search",{AnnouncementResults:AnnouncementResults});
					
					//res.render("search",{pageset2:pageset2});
					
					//var paginator = pagination.create('search', {prelink:'/search', current: 1, rowsPerPage: 5, AnnouncementResults: 10020});
					//console.log(paginator.render());
					
				});
			}
					//AnnouncementResults.use(paginate.middleware(10,50));
					 //AnnouncementResults.paginate({}, req.query.page, req.query.limit, function(err, pageCount, AnnouncementResults, itemCount) {

						    //if (err) return next(err);

						    //res.format({
						      //html: function() {
						        //res.render('AnnouncementResults', {
						        	//AnnouncementResults: AnnouncementResults,
						          //pageCount: pageCount,
						          //itemCount: itemCount
						        //});
						      //},
						      //json: function() {
						        // inspired by Stripe's API response for list objects
						        //res.json({
						          //object: 'listofAnnouncements',
						          //has_more: paginate.hasNextPages(req)(pageCount),
						          //data: AnnouncementResults
						        //});
						      //}
						    //});
				
					 //});
			
			
				if(searchBy==="status")
					
					{
					
					User.getAllUsers(function(err, result){
						
						for(var j=0; j<result.length; j++)
							{	
							if(searchInput==="i need help" || searchInput==="need help" || searchInput==="HELP")
								{
							var colour = "YELLOW";
								}
							if(searchInput==="i am ok" || searchInput==="I am OK" || searchInput==="I AM OK" || searchInput==="OK")
								{
								var colour = "GREEN";
								}
							if(searchInput==="emergency" || searchInput==="facing threatening emergency" ||searchInput==="Facing Threatening Emergency" || searchInput==="Emergency" || searchInput==="threat")
								{
								var colour = "RED"
								}
						
						if (result[j].local.userStatusCode.search(colour)>-1)
							{
							console.log(searchInput);
							console.log(colour);
							console.log(result[j]);
							statusResults.push(result[j]);
							}
						}
				res.render("search", {statusResults:statusResults});
					});
				}
			
			
				if(searchBy==="publicMessage"){
					
					PublicMessages.getPublicMessages(function(err, result)
						{
						var Flag=searchInput;
						for(var k=0; k<result.length; k++)
							{
							for(var q=0; q<stopwords.length; q++)
								{
								if(searchInput===stopwords[q])
								Flag=undefined;
								}
								searchInput=Flag;
							
						if(searchInput!=undefined && (result[k].local.content.search(searchInput)>-1))
							{
							console.log(result[k]);
							publicMessageResults.push(result[k]);
							}
						}
				res.render("search", {publicMessageResults:publicMessageResults});
					});
				}
				
				
				if(searchBy ==="chats"){
					console.log("testing1");
					tempUser.getAllUsers(function(err, result){
						for(var it=0; it<result.length; it++)
							{
							console.log(result[it]);
							userlist.push(result[it]);
							}
					});
					console.log("testing2");
					
					PrivateMessages.getPrivateMessages(user_name,"katie",function(err, result)
							{
						var Flag=searchInput;
							for(var l=0; l<result.length; l++)
							   {
								for(var q=0; q<stopwords.length; q++)
								 {
							      if(searchInput===stopwords[q])
							        Flag=undefined;
							        }
							        searchInput=Flag;

						if (searchInput!=undefined && (result[l].local.content.search(searchInput)>-1))
							{
							console.log(result[l]);
							privateMessageResults.push(result[l]);
							}
						}
				res.render("search", {privateMessageResults:privateMessageResults});
					});
					
			}
		},
	
		getSearch: function(req, res){
			
			res.render("search");
		}

    }
}
			


/*if (searchBy == "chats"){
searchChats(searchInput, function(err, result){

	if(err){
		res.render("search", {users: undefined, messages: undefined});
	}
	if(res.statusCode === 200 && res.statusCode === 201) {
		res.render("search", {users: undefined, messages: result.body});
		
		}
	else {
		res.render("search", {users: undefined, messages: undefined});
		
		}
});
}*/
			/**	
			if(searchBy ==="status"){
				User.getAllUsers(function(err, result)
					{
					for(var j=0; j<result.lenght; j++)
						{
						if (result[j].local.userStatusCode.search(searchInput)>-1)
							{
							console.log(result[j]);
							statusResults.push(result[j]);
							}
						}
					res.render("search", {statusResults:statusResults});
					});
				
					}
			},
		
			getSearch: function(req, res){
				res.render("search");
			}
		
	}
}
			
			
			//{
					
					//if(err){
						//console.log('error')
					//}
		/*			
			if(res.statusCode === 200 && res.statusCode === 201) {
						res.render("search", {users: result.body, messages: undefined});
					}
					else {
						res.render("search", {users: undefined, messages: undefined});
					}
				});
			
//			status
			else if (searchBy == "status")
				Search.searchByStatus(searchInput, function(err, result){
					if(err){
						res.render("search", {users: undefined, messages: undefined});
					}
					if(res.statusCode === 200 && res.statusCode === 201) {
						res.render("search", {users: result.body, messages: undefined});
						}
					else {
						res.render("search", {users: undefined, messages: undefined});
						}
				});
			
//			public messages
			else if (searchBy == "publicMessage")
				Search.searchPubMsg(searchInput, function(err, result){
					if(err){
						res.render("search", {users: undefined, messages: undefined});
					}
					if(res.statusCode === 200 && res.statusCode === 201) {
						res.render("search", {users: undefined, messages: result.body});
						}
					else {
						res.render("search", {users: undefined, messages: undefined});
					}
				});
			
//			announcement
			else if (searchBy == "announcement")
				Search.searchAnnouncement(searchInput, function(err, result){
					if(err){
						res.render("search", {users: undefined, messages: undefined});
					}
					if(res.statusCode === 200 && res.statusCode === 201) {
						res.render("search", {users: undefined, messages: result.body});
						}
					else {
						res.render("search", {users: undefined, messages: undefined});
						}
				});
				
//			chats
			else if (searchBy == "chats")
				Search.searchChats(searchInput, function(err, result){
				
				
				
					if(err){
						res.render("search", {users: undefined, messages: undefined});
					}
					if(res.statusCode === 200 && res.statusCode === 201) {
						res.render("search", {users: undefined, messages: result.body});
						
						}
					else {
						res.render("search", {users: undefined, messages: undefined});
						
						}
				});
		},
		

			*/
		
		
