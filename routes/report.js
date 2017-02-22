var router = express.Router();
var reports = require('../public/json/daily-report.json'),
	reports_cvp = require('../public/json/reports_parameters_cvp.json'),
	reports_monthly = require('../public/json/reports_parameters_monthly.json'),
	reports_trend = require('../public/json/reports_parameters_trend.json'),
	reports_its = require('../public/json/reports_its.json'),
	reports_its_new = require('../public/json/reports_its_new.json');

router.get('/parameters/', function(req, res, next) {
	res.locals.title = 'Gestione dei parametri e della pubblicazione dei Report';
	res.locals.notes = [res.locals.dictionary.phrase2];
	res.locals.menu = req.navMenuWEBConf.getMenuConf("parameters");
	res.locals.reports_cvp = reports_cvp;
	res.locals.reports_monthly = reports_monthly;
	res.locals.reports_trend = reports_trend;
	res.locals.sidebarConf.isVisible = false;
  	res.render('report-parameters');
});

router.get('/parametersITS/', function(req, res, next) {
	res.locals.title = 'Gestione Parametri ITS';
	res.locals.menu = req.navMenuWEBConf.getMenuConf("parametersITS");
	res.locals.reports = reports_its_new;
	res.locals.sidebarConf.isVisible = false;
  	res.render('report-parameterIts');
});

router.get('/dailyElaboration/', function(req, res, next) {
	res.locals.title = 'Gestione elaborazione report per divisioni';
	res.locals.menu = req.navMenuWEBConf.getMenuConf("dailyElaboration");
	res.locals.reports = reports;
	res.locals.sidebarConf.isVisible = false;
  	res.render('report-dailyElaboration');
});

// POST method route
router.post('/', function (req, res) {
  res.send({asd: "lol"});
});

module.exports = router;