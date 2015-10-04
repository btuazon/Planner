var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();

//connect to database.
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);


//how to display items in the mongodb database.
/*mongoose.model('users',{username:String, email:String},'users');
app.get('/user', function(req,res){
	mongoose.model('users').find(function(err, users){
		res.send(users);
	});
});

//remove item on click.
app.post('/remove', function(req, res){
	//Since the javascript and FireFox had compatibility issues, this code only works
	//when the user refreshes it. 
	mongoose.model('users').findOne({_id:req.body._id}).remove( function(err, result) {
    if (err)
       res.send('Its no use!!!');
	else
	{
		res.redirect('/data.html');
		console.log(req.body.day);//do something.
	} 
		
	});
	
});*/
/*
//change email on click
app.post('/modify_email', function(req, res){
	mongoose.model('users').update({_id:req.body.id}, {$set:{email:req.body.value}}, function(err, result) {
    if (err)
       res.send('Its no use!!!');
	else
		res.send(req.body.value); //do something.
});
	
	console.log(req.body.value);
	console.log(req.body.id);
});

//change username on click (this needs a search for multiple username function, but that's not relevant for the calendar.)
app.post('/modify_username', function(req, res){
	mongoose.model('users').update({_id:req.body.id}, {$set:{username:req.body.value}}, function(err, result) {
    if (err)
       res.send('Its no use!!!');
	else
		res.send(req.body.value); //do something.
});
	
	console.log(req.body.value);
	console.log(req.body.id);
});

/*inserting stuff by making a new collection if it isn't already there.
var Schema = new mongoose.Schema({
	username: String,
	email: String
});

var user = mongoose.model('emp',Schema);*/

/*var user = mongoose.model('users');
//add user by filling out fields.
app.post('/new', function(req, res){
	new user({
		username: req.body.username,
		email   : req.body.email,
	}).save(function(err,doc){
		if(err) res.json(err);
		else res.redirect('/data.html');
		
	});
    
});*/

/*
//erase an item by typing out name.
app.post('/erase', function(req, res){
	
	mongoose.model('users').findOne({username: req.body.erase}, function(err, document) {
		  document.remove();
		  res.redirect('/data.html');
		});
	
});



//change by filling out fields.
app.post('/modify', function(req, res){
	mongoose.model('users').update({username:req.body.target}, {$set:{username:req.body.modify,email:req.body.modify_email}}, function(err, result) {
    if (err)
       res.send('Its no use!!!');
	else
		res.redirect('/data.html'); //do something.
});
});*/



//Calendar=======================================================
mongoose.model('events',{Title:String, comments:String,month:Number,day:Number, year:Number, time: Number, location:String},'events');
//get events with user information.
app.post('/get_events', function(req,res){
		mongoose.model('events').find({day:req.body.day, month:req.body.month, year:req.body.year}, function(err, events){
		res.json(events);
		//res.redirect('/home.html');
	});
});

var event = mongoose.model('events');
//add user by filling out fields.
app.post('/new_event', function(req, res){
	new event({
		//id might not be right.
		Title: req.body.Title,
		comments: req.body.comments,
		month: req.body.month,
		day: req.body.day,
		year: req.body.year,
		time: req.body.time,
		location: req.body.location
	}).save(function(err,doc){
		if(err) res.json(err);
		else {
			
		mongoose.model('events').find({day:req.body.day, month:req.body.month, year:req.body.year}, function(err, events){
		res.json(events);
			
		});//how to go back to the calendar and event post
		}
	});
  
});

//remove item on click.
app.post('/erase', function(req, res){
	//Since the javascript and FireFox had compatibility issues, this code only works
	//when the user refreshes it. 
	mongoose.model('events').findOne({_id:req.body._id}).remove(function(err, result) {
    if (err)
       res.send('Its no use!!!');
	else
	{
		mongoose.model('events').find({day:req.body.day, month:req.body.month, year:req.body.year}, function(err, events){
		res.json(events);}); 
		
	}
	
	});
	
});



//change email on click
app.post('/modify_title', function(req, res){
	mongoose.model('events').update({_id:req.body.id}, {$set:{Title:req.body.value}}, function(err, result) {
    if (err)
       res.send('Its no use!!!');
	else{
		res.send(req.body.value);
		
		}	
});
	
	/*console.log(req.body.value);
	console.log(req.body.id);*/
});



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
