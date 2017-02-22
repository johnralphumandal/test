var router = express.Router();

var division_list = [
	{"id": 1, "name": 'IT-CCARE 2011', canDelete: false}, 
	{"id": 2, "name": 'IT-CNS', canDelete: false}, 
	{"id": 3, "name": 'IT-NEUDE NORD', canDelete: false}, 
	{"id": 4, "name": 'IT-NEUDE', canDelete: false}, 
	{"id": 5, "name": 'IT-ONCOLOGY', canDelete: false}
];

var position_list = [
	{"id": 1,"name" : 'IT-CCARE 2011-NSMXXX OPEN POSITION ', canDelete: false}, 
	{"id": 2,"name" : 'IT-CCARE 2011-NSMYYY AGLIETTI SERENA ', canDelete: false}
];

var user_positions = [
		{ division: "IT-CCARE 2011", role: "National Sales Manager", position: "IT-CCARE 2011-NSMXXX", name:"OPEN POSITION"},
		{ division: "IT-CCARE 2011", role: "District Manager", position: "IT-CCARE 2011-DMXXX", name:"EVANGELISTA KATIA"},
		{ division: "IT-CCARE 2011", role: "Sales Rapresentative", position: "IT-CCARE 2011-SRXXX", name:"PROSSEN MARINA"},
		{ division: "IT-CCARE 2011", role: "Sales Rapresentative", position: "IT-CCARE 2011-SRXXX", name:"SUSINO TIZIANA"},
		{ division: "IT-CCARE 2011", role: "Sales Rapresentative", position: "IT-CCARE 2011-SRXXX", name:"DEL RIO CARLA"}
	];

var account = [
	{"id": 1, "name": '0000010002 - A O MAGGIORE DELLA CARITA', canDelete: false}, 
	{"id": 2, "name": '0000010003 - A O MELLINO MELLINI', canDelete: false}, 
	{"id": 3, "name": '0000010004 - A O FATEBENEFRATELLI', canDelete: false}, 
	{"id": 4, "name": '0000010005 - A O IST CLINICI DI PERFEZIONAMENTO', canDelete: false}, 
	{"id": 5, "name": '0000010006 - A O FATEBENEFRATELLI OFTALMICO', canDelete: false}
];

var account_positions = [
	{position: "IT-CCARE 2011-NSMXXX", name:"OPEN POSITION", percent:"100"}
];



var sales_rapresentative = [
	{"id": 1, "name": 'IT-CCARE 2011-SR0101 - DASSANO FRANCESCA', canDelete: false}, 
	{"id": 2, "name": 'IT-CNS-SRSR0101 - TOTO FABIO', canDelete: false}, 
	{"id": 3, "name": 'IT-NEUDE NORD-SRSR0101 - PERETTI GIULIO', canDelete: false}, 
	{"id": 4, "name": 'IT-NEUDE-SRSR0101 - PERETTI GIULIO', canDelete: false}, 
	{"id": 5, "name": 'IT-ONCOLOGY-SRSR0101 - PERETTI GIULIO', canDelete: false}
];

var user_list = [
		{"id": 1,"name" : 'CAMARDO ROSARIO', canDelete: false}, 
		{"id": 2,"name" : 'RUSSO FRANCESCO', canDelete: false}, 
		{"id": 3,"name" : 'SANGIOVANNI LUCA', canDelete: false}
];

/* GET users listing. */

router.get('/', function(req, res, next) {
	res.locals.title = 'Manage Positions';
	res.locals.division_list = division_list;
	res.locals.position_list = position_list; 
	res.locals.user_list = [
		{"id": 1,"name" : 'CAMARDO ROSARIO', canDelete: false}, 
		{"id": 2,"name" : 'RUSSO FRANCESCO', canDelete: false}, 
		{"id": 3,"name" : 'SANGIOVANNI LUCA', canDelete: false}];
	res.locals.menu = req.navMenuWEBConf.getMenuConf("positions");
  	res.render('area-positions');
});

router.get('/positions/', function(req, res, next) {
	res.locals.title = 'Manage Positions';
	res.locals.params = {
		'division_list':division_list,
		'position_list':position_list,
		'user_positions': user_positions,
		'user_list': user_list,
		'sales_rapresentative': sales_rapresentative,
		'account': account,
		'account_positions': account_positions
	}
	res.locals.notes = ["Se deve essere creata una nuova linea di vendita (Division) questa deve essere prima inserita a livello di National Sales Manager in OneLilly per poterla vedere in SFP", "Per una riorganizzazione territoriale si consiglia di inserire una struttura territoriale in OneLilly in modo da ereditarla dsu SFP e poi lavorarci"]
	res.locals.menu = req.navMenuWEBConf.getMenuConf("positions");
  	res.render('area-positions');
});

router.get('/workingToEffective/', function(req, res, next) {
	res.locals.title = 'Struttura Territoriale - Copia da Working ad Effective';
	res.locals.menu = req.navMenuWEBConf.getMenuConf("workingToEffective");
  	res.render('area-workingToEffective');
});

router.get('/division/', function(req, res, next) {
	res.locals.title = 'Creazione Nuova Divisione';
	res.locals.menu = req.navMenuWEBConf.getMenuConf("division");
  	res.render('area-division');
});

router.get('/exportAreaStruct/', function(req, res, next) {
	res.locals.title = 'Export Struttura Territoriale';
	res.locals.menu = req.navMenuWEBConf.getMenuConf("exportAreaStruct");
  	res.render('area-exportAreaStruct');
});

router.get('/userProfiles/', function(req, res, next) {
	res.locals.title = 'Gestione Profili Utenti';
	res.locals.menu = req.navMenuWEBConf.getMenuConf("userProfiles");
  	res.render('area-userProfiles');
});

module.exports = router;
