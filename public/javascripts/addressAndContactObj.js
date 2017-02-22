$(document).ready(function(){
    globals["modal"] = new BootstrapModal($('body'));
    var p = new AddressAndContactPageObj();
    p.bindFunction();
});



/* Oggetto che gestisce la pagina degli indirizzi e contatti */
function AddressAndContactPageObj(){ 
	this.container = $('body .container');
}
/* binda tutte le funzioni necessarie per il funzionamento della pagina*/
AddressAndContactPageObj.prototype.bindFunction = function() {
	var that = this;
	/* Gestione tabs nella pabina */
	this.userListObj = new SelectableList(this.container.find('.usersList'), {selectFunction: function(){ console.log("asd"); }});
	this.container.find('ul.nav.nav-tabs li').bind('click', function(){
		$(this).siblings().removeClass('active');
		$(this).addClass('active');
		that.container.find('.tabContainer > div').hide();
		console.log(that.container.find('.tabContainer > div#'+$(this).attr('rel') ))
		that.container.find('.tabContainer > div#'+$(this).attr('rel') ).show();
	});
};