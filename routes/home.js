var router = express.Router();

var oracledb = require('oracledb');
var oracleConf = { user: "", password: "", connectString: ""};

router.get('/', function(req, res, next) {
	console.log(req.mobileDetector);
	res.locals.menu = req.navMenuWEBConf.getMenuConf("home");
	res.locals.sidebarConf.isVisible = false;
	res.locals.user = "Francesco";
	res.locals.isMobile = req.mobileDetector.isMobile || false;


	oracledb.getConnection(oracleConf, function(err, connection){
		if (err) {
			console.error(err.message);
			
			return;
		}
		console.log(result.metaData);
		console.log(result.rows);
		connection.release(
			function(err) {
				if (err) {console.error(err.message);}
			}
		);
	});



  	res.render('home');
});

module.exports = router;
