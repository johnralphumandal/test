function ParameterManagement(container){
	this.container = container;
};

ParameterManagement.prototype.init = function() {
	this.eventList();
};

ParameterManagement.prototype.eventList = function() {
	var that = this;
	this.container.find('ul.nav.nav-tabs li').bind('click', function(){
		$(this).siblings().removeClass('active');
		$(this).addClass('active');
		that.container.find('.tabContainer > div').hide();
		console.log(that.container.find('.tabContainer > div#'+$(this).attr('rel') ))
		that.container.find('.tabContainer > div#'+$(this).attr('rel') ).show();
	});
};

$(document).ready(function(){
	page = new ParameterManagement($('#pageContainer'));
	page.init();
});