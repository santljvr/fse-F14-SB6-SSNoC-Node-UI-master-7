var express = require("express"),
  app = express(),
  http = require("http").createServer(app),
  io = require("socket.io").listen(http),
  _ = require("underscore"),
  passport = require('passport'),
  flash = require('connect-flash'),
  User = require('./app/models/UserRest');
  Message = require('./app/models/ExchangeInformationRest');
  
  var PeerServer = require('peer').PeerServer;
  var server = PeerServer({
        port: 9000,
        path: '/'
      });

  
var participants = {
  online : {},
  all : []
};

//var publicMessages = [];

process.chdir(__dirname);

require('./config/passport')(passport);

app.set("ipaddr", "0.0.0.0");

app.set("port", 8888);

app.set("views", __dirname + "/app/views");

app.set("view engine", "jade");

app.use(express.logger('dev'));

app.use(express.static("public", __dirname + "/public"));

app.use(express.bodyParser());

app.use(express.cookieParser());

app.use(express.session({secret : 'ssnocwebapplication', cookie : {maxAge : 3600000*24*10 }}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

User.getAllUsers(function(err, users) {
  if (!err) {
    users.forEach(function(user) {
      participants.all.push({userName : user.local.name, userStatusCode : user.local.userStatusCode, userLocationDesc: user.local.locationDesc, userLastPostTime: user.local.lastPostTime});//modified by feng for people page
      
    });
  }

  require('./app/routes')(app, _, io, participants, passport);
  require('./app/socket')(_, io, participants);
});

/*
Message.getPublicMessages(function(err, messages)
{
	if(!err)
	{
		messages.forEach(function(msg)
		{
			publicMessages.push({	
				content : msg.local.content,
				author : msg.local.author,
				messageType : msg.local.messageType,
				target : msg.local.target,
				postedAt : msg.local.postedAt,
				messageID : msg.local.messageID});
		});
	}
});
*/
http.listen(app.get("port"), app.get("ipaddr"), function() {
  console.log("Server up and running. Go to http://" + app.get("ipaddr") + ":" + app.get("port"));
});
