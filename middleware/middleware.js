function MiddlewareObj(){
	this.dictionary;
}

MiddlewareObj.prototype.setDictionary = function(dictionary) {
	this.dictionary = dictionary;
};
MiddlewareObj.prototype.getCurrentTime = function() {
	console.log('Time:', Date.now());
};

MiddlewareObj.prototype.midFunction = function(req, res, next){
	console.log("Middleware Function");
	console.log(" cookie");
	console.log(req.headers.cookie);
	this.getCurrentTime();
	var cookie = this.parseCookies(req.headers.cookie);
	console.log(cookie);

	if (req.method === "GET") {
		res.locals.sidebarConf = { isVisible: true, isBlocked: false };
		res.locals.siteURL = app.locals.customConfig.location;
		res.locals.userCookie = cookie;
		res.locals.dictionary = this.dictionary;
		req.navMenuWEBConf =  new NavMenu_lib(app.locals.customConfig.location);
		req.mobileDetector = this.addCheckMobile(req);
	}

	next();	
};

MiddlewareObj.prototype.addCheckMobile = function(req) {
	var ua = req.headers['user-agent'],
    	mobile_detector = {};
	if (/mobile/i.test(ua))
	    mobile_detector.isMobile = true;
	if (/like Mac OS X/.test(ua)) {
	    mobile_detector.iOS = /CPU( iPhone)? OS ([0-9\._]+) like Mac OS X/.exec(ua)[2].replace(/_/g, '.');
	    mobile_detector.iPhone = /iPhone/.test(ua);
	    mobile_detector.iPad = /iPad/.test(ua);
	}
	if (/Android/.test(ua))
	    mobile_detector.Android = /Android ([0-9\.]+)[\);]/.exec(ua)[1];
	return mobile_detector;
};


MiddlewareObj.prototype.parseCookies = function(rc) {
    var list = {};
    rc && rc.split(';').forEach(function( cookie ) {
        var parts = cookie.split('=');
        list[parts.shift().trim()] = decodeURI(parts.join('='));
    });
    return list;
};

module.exports = MiddlewareObj;

