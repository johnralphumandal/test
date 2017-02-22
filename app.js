
express = require('express'); // variabile pubblica

var path = require('path'),
	favicon = require('serve-favicon'),
	logger = require('morgan'),
	cookieParser = require('cookie-parser'),
	bodyParser = require('body-parser'),
	appConfig = require('./appConfig.json'),	// configurazione dei parametri necessari all'applicazione
	ITDictionary = require('./dictionaries/ITDictionary.json');	// dizionario ITA


app = express();	// variabile pubblica
NavMenu_lib = require('./appModules/navigationMenu.js');	// variabile pubblica

app.locals.customConfig = {
	location: (appConfig.test)?appConfig.testLocation:appConfig.location
};

var index = require('./routes/index'),
	home = require('./routes/home'),
	management = require('./routes/management'),
	products = require('./routes/products'),
	area = require('./routes/area');
	report = require('./routes/report');

var middlewareObj = require('./middleware/middleware.js')
var middleware = new middlewareObj();
middleware.setDictionary( ITDictionary );
// view engine setup (express standard)
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
// carica i file che si trovano nella directory public
app.use( express.static(path.join(__dirname, 'public')) );
// definizione del middleware
app.use( function(req, res, next){ middleware.midFunction(req, res, next)} );
// definizione dei vari routes
app.use('/', index);
app.use('/home', home);
app.use('/products', products);
app.use('/management', management);
app.use('/area',area);
app.use('/reportManagement', report);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
	console.log("generic error handle")
	var err = new Error('Not Found');
	err.status = 404;
	next(err);
});
// error handler
app.use(function(err, req, res, next) {
	console.log("custom error handler");
	next(err);
});
app.use(function(err, req, res, next) {
	// respond with html page
	if (req.accepts('html')) {
		// set locals, only providing error in development
		res.locals.message = err.message;
		res.locals.error = req.app.get('env') === 'development' ? err : {};
		// render the error page
		res.status(err.status || 500);
		res.render('error');
		return;
	}
	// respond with json
	if (req.accepts('json')) {
	    res.send({ error: 'Not found' });
	    return;
	}
	// default to plain-text. send()
	res.type('txt').send('Not found');
});

module.exports = app;