var router = express.Router();

router.get('/ctrlPanel/', function(req, res, next) {
	res.locals.title = 'Pannello di Controllo';
	res.locals.sidebarConf.isVisible = false;
	res.locals.menu = req.navMenuWEBConf.getMenuConf("controlPanel");
  	res.render('management-ctrlPanel');
});

router.get('/warehouse/', function(req, res, next) {
	res.locals.title = 'Anagrafica magazzino';
	res.locals.menu = req.navMenuWEBConf.getMenuConf("warehouse");
  	res.render('management-ctrlPanel');
});



router.get('/addressAndContact/', function(req, res, next) {
	res.locals.title = 'Anagrafica Utenti';
	res.locals.menu = req.navMenuWEBConf.getMenuConf("addressAndContact");
	res.locals.usersList = [
		{"id": 1,"name" : 'CAMARDO RORIO', canDelete: false}, 
		{"id": 2,"name" : 'RUSSO FRANCSCO', canDelete: false}, 
		{"id": 3,"name" : 'SANGIOVANNI LUCA', canDelete: false}];
		res.locals.notes = ["La ricerca può essere effetuata per Nome, Cognome, ID utente o Global ID"];
  	res.render('management-addressAndContact');
});




module.exports = router;
