var router = express.Router();

var product_contribution = require('../public/json/product_contribution.json');

/* esempio struttura dati*/
var products = [
		{ code: "IT-MKT-CARDIO", descr: "Mercato Cardio", lv: 1, type: 'Market', status: 'Active' },
		{ code: "IT-MKT-NEU", descr: "Mercato Neurolettici", lv: 1, type: 'Market', status: 'Active' },
		{ code: "IT-MKT-ONCO", descr: "Mercato Oncologici", lv: 1, type: 'Market', status: 'Active' },
		{ code: "IT-MKT-FITTIZIO", descr: "Mercato Fittizio", lv: 1, type: 'Market', status: 'Inactive' },
		{ code: "IT-MKT-INSU", descr: "Mercato Insuline", lv: 1, type: 'Market', status: 'Inactive' }
	];

var group_list = [
	{"id": 1,"name" : 'ALIMTA', canDelete: true}, 
	{"id": 2,"name" : 'ALIMTA 100MG', canDelete: true}, 
	{"id": 3,"name" : 'BYETTA', canDelete: true}, 
	{"id": 4,"name" : 'BYETTA INTEGRATO', canDelete: true}, 
	{"id": 5,"name" : 'CIALIS', canDelete: true}
];

var package_lvl5_list = [
	{"id": 1,"name" : 'ALIMTA', canDelete: false}, 
	{"id": 2,"name" : 'ALIMTA 100MG', canDelete: false}, 
	{"id": 3,"name" : 'BYETTA', canDelete: false}, 
	{"id": 4,"name" : 'BYETTA INTEGRATO', canDelete: false}, 
	{"id": 5,"name" : 'CIALIS', canDelete: false}
];

var products_list = [
	{"id": 1, "name": "3-I16IBMV2 - MED - Arzoxifene"}, 
	{"id": 2, "name": "3 - 1REZPR7-MED- Nessun Prodotto"}, 
	{"id": 3, "name": "3-285NS9I-MED-ZypAdhero"}, 
	{"id": 4, "name": "IT -- Sildenafil Gen"},
	{"id": 5, "name": "IT -- INT -SOUT - RAP - NOVORAPPENF"},
	{"id": 6, "name": "IT-ALIM-500MG ITS-Alimta 500G_ITS"},
	{"id": 7, "name": "IT-ALIM-100MG ITS-Alimta 100G_ITS"},
	{"id": 8, "name": "IT-MED-BRAL-BYE-MED-Byetta"},
	{"id": 9, "name": "IT-CAF-BRAL-BYE-CorpAff-Byetta"},
	{"id": 10, "name": "IT-BRAL-INT-BYE-Byetta Integrato"},
	{"id": 11, "name": "IT-CAF-BRAL-CIAL-CorpAff-Cialis"}
	];

var divisionsList = [
		{"id": 1,"name" : 'IT-BONE', canDelete: false}, 
		{"id": 2,"name" : 'IT-CARDIOLOGY', canDelete: false}, 
		{"id": 3,"name" : 'IT-CNS', canDelete: false},
		{"id": 4,"name" : 'IT-DUL', canDelete: false},
		{"id": 5,"name" : 'IT-NEUDE', canDelete: false},
		{"id": 6,"name" : 'IT-ONCOLOGY', canDelete: false},
		{"id": 7,"name" : 'IT-PEDIATRIC', canDelete: false}
	];

var marketsList = [
		{"id": 1,"name" : 'Mercato Antidepressivi', canDelete: false}, 
		{"id": 2,"name" : 'Mercato Byetta', canDelete: false}, 
		{"id": 3,"name" : 'Mercato Fittizio', canDelete: false},
		{"id": 4,"name" : 'Mercato Insuline', canDelete: false},
		{"id": 5,"name" : 'Mercato Neurolettici', canDelete: false},
		{"id": 6,"name" : 'Mercato Oncologici', canDelete: false}
	];



var marketsList = [
		{"id": 1,"name" : 'Mercato Antidepressivi', canDelete: false}, 
		{"id": 2,"name" : 'Mercato Byetta', canDelete: false}, 
		{"id": 3,"name" : 'Mercato Cardio', canDelete: false}, 
		{"id": 4,"name" : 'Mercato Fittizio', canDelete: false},
		{"id": 5,"name" : 'Mercato Insuline', canDelete: false},
		{"id": 6,"name" : 'Mercato Neurolettici', canDelete: false},
		{"id": 7,"name" : 'Mercato Oncologici', canDelete: false}
	];

var macroGroupList = [
		{"id": 1,"name" : 'BYETTA', canDelete: false}, 
		{"id": 2,"name" : 'CARBOLITHIUM', canDelete: false}, 
		{"id": 3,"name" : 'CIALIS TOT', canDelete: false}, 
		{"id": 4,"name" : 'EUCREAS', canDelete: false},
		{"id": 5,"name" : 'FORSTEO', canDelete: false},
		{"id": 6,"name" : 'HUMATROPE', canDelete: false},
		{"id": 7,"name" : 'LEVITRA', canDelete: false}
];

var macroGroupListinASS = [
		{"id": 1,"name" : 'CIALIS 10/20mG', canDelete: false}
];



var assoc = [{"id": 1, "products": ['IT-']}];

/* GET users listing. */
router.get('/', function(req, res, next) {
	res.locals.title = 'Gestione Prodotti';
	res.locals.products = products;
	res.locals.sidebarConf.isVisible = false;
	res.locals.menu = req.navMenuWEBConf.getMenuConf("manageProduct");
  	res.render('products');
});


router.get('/productContribution/', function(req, res, next) {
	res.locals.title = 'Product Contribution';
	res.locals.notes = [
		res.locals.dictionary.phrase+" "+
		res.locals.dictionary.description+", "+
		res.locals.dictionary.name+", "+
		res.locals.dictionary.product_type+" "+
		res.locals.dictionary.or+" "+
		res.locals.dictionary.market
	];
	res.locals.sidebarConf.isVisible = true;
	res.locals.sidebarConf.isBlocked = true;
	res.locals.menu = req.navMenuWEBConf.getMenuConf("productContribution");
	res.locals.group_list = group_list;
	res.locals.product_list = products_list;
	res.locals.divisionsList = divisionsList;

	res.locals.product_contribution = product_contribution;

	res.render('products-contribution');
});

router.get('/macroGroup/', function(req, res, next) {
	res.locals.title = 'Macro Product Group - CVP';
	res.locals.menu = req.navMenuWEBConf.getMenuConf("macroProdGroup");
	res.locals.group_list = macroGroupList;
	res.locals.product_list = products_list;
	res.locals.its = false;
	res.locals.notes = [res.locals.dictionary.phrase_product_macrogroup, res.locals.dictionary.or_phrase];
	res.render('products-macrogroup');
});

router.get('/macroGroupITS/', function(req, res, next) {
	res.locals.title = 'Macro Product Group - ITS';
	res.locals.menu = req.navMenuWEBConf.getMenuConf("macroProdGroupITS");
	res.locals.group_list = macroGroupList;
	res.locals.product_list = products_list;
	res.locals.its = true;
	res.locals.notes = [res.locals.dictionary.phrase_product_macrogroup, res.locals.dictionary.or_phrase];
	res.render('products-macrogroup');
});


router.get('/dmMatch/', function(req, res, next) {
	res.locals.title = "Associazione Divisione-Mercato";
	res.locals.menu = req.navMenuWEBConf.getMenuConf("dmMatch");
	res.locals.divisionsList = divisionsList;
	res.locals.marketsList = marketsList;
	res.locals.macroGroupList = macroGroupList;
	res.locals.macroGroupListinASS = macroGroupListinASS;
	res.locals.notes = [res.locals.dictionary.dmMatch_note];

	res.render('products-dmMatch');
});

router.get('/productCodeMatch/', function(req, res, next) {
	res.locals.title = "IMS - OneLilly Product Code Match";
	res.locals.menu = req.navMenuWEBConf.getMenuConf("imsOneLillyProductCodeMatch");
	res.locals.product_list = products_list;
	res.locals.notes = [
		res.locals.dictionary.phrase+" "+
		res.locals.dictionary.description+", "+
		res.locals.dictionary.name+", "+
		res.locals.dictionary.product_type+" "+
		res.locals.dictionary.or+" "+
		res.locals.dictionary.market
	];

	res.locals.sidebarConf.isBlocked = true;
	res.render('products-productCodeMatch');
});

router.get('/factorConversionAndAvgPrice/', function(req, res, next) {
	res.locals.title = "Fattori di Conversione e Prezzo Medio";
	res.locals.menu = req.navMenuWEBConf.getMenuConf("factorConversionAndAvgPrice");
	res.locals.result_list = package_lvl5_list;
	res.locals.notes = ["La ricerca può essere effetuata per Descrizione, Nome, Tipo Prodotto Oppure Mercato"];
	res.render('products-factorConversionAndAvgPrice');
});


/* GET users listing. */
/* first */
router.get('/:id/:act', function(req, res, next) {
	console.log( "Params " + req.params.id );
	console.log( "Params " + req.params.act );
	if ( parseInt(req.params.id, 0) > 0 && parseInt(req.params.act, 0) > 0 )
		next('route'); // go to the second route
	else
		next();
},function(req, res, next){
	res.send("no params");
});


// POST method route
router.post('/', function (req, res) {
  res.send({asd: "lol"});
});

module.exports = router;