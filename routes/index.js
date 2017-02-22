var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  	res.render('index', {baseUrl: app.locals.customConfig.location + "./home/"});
});

module.exports = router;
