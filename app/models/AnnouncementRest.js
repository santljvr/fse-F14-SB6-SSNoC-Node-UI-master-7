//var bcrypt = require('bcrypt-nodejs');
var request = require('request');
var rest_api = require('../../config/rest_api');

function Announcement(title, content, author, locationDesc, postAt, announcementID)
	{
	this.local = {
			title : title,
			content : content,
			author : author,
			locationDesc : locationDesc,
			postAt : postAt,
			announcementID : announcementID
			};
		}
module.exports = {
		
getAllAnnouncements:function(callback) {
    	request.get(rest_api.getAllAnnouncements, {json:true}, function(err, res, body) 
    		{
		    if (err)
		    {
		      callback(err,null);
		      //callback(null);
		      return;
		    }
		    if (res.statusCode === 200) 
		    {
		    	
		    	var announcements = body.map(function(item, idx, arr)
		    			{
		    				return new Announcement(item.title, item.content, item.author, item.locationDesc, item.postAt, item.announcementID);
		    			});
		    		callback(null, announcements);
		    		//callback(announcements);
		    		return;
		    }
		    if (res.statusCode !== 200) 
		    {
		      callback(null, null);
		      //callback(null);
		      return;
		    }
		  });
},

insert_announcement:function(postBody, callback) {

    var options = {
        url : rest_api.insert_announcement,
        body : postBody,
        json: true
    };

    request.post(options, function(err, res, body) {
        if (err){
            callback(err,res);
            return;
        }
        if (res.statusCode === 200) {
            callback(null, body);
            return;
        }
        if (res.statusCode !== 200) {
            callback(null, null);
            return;
        }
    });
}

}




    /*Announcement.insert_announcement = function(title, content, callback) {

        var options = {
            url : rest_api.insert_announcement,
            body : {title : title, content : content},
            json: true
        };

	    request.post(options, function(err, res, body) {
            if (err){
                callback(err,res);
                return;
            }
            if (res.statusCode === 200) {
                callback(null, body);
                return;
            }
            if (res.statusCode !== 200 && res.statusCode !==201) {
                callback(null, null);
                return;
            }
        });
	}

*/

