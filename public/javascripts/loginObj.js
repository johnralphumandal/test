$(document).ready(function(){
    globals["modal"] = new BootstrapModal($('body'));
    var p = new LoginObj();
    p.bindFunction();
});




/* Oggetto che gestisce la pagina dei prodotti*/
function LoginObj(){
	this.container = $('body');
	this.usernameIn = this.container.find('input#inputPassword');
	this.passwordIn = this.container.find('input#inputUsername');
	this.wrongAccess_msg = this.container.find('p.wrongAccess_msg');
}
LoginObj.prototype.inputKeyUp = function(input, event) {
	input.closest('.form-group').removeClass('has-error')
	this.wrongAccess_msg.html("").hide();
}

LoginObj.prototype.loginCheck = function() {

	var that = this,
		err_msg = "",
		error = false;
	if (this.usernameIn.val().length === 0){
		this.usernameIn.closest('.form-group').addClass('has-error');
		error = true;
	}
	if (this.passwordIn.val().length === 0){
		this.passwordIn.closest('.form-group').addClass('has-error');
		error = true;
	}
	if (error){
		err_msg = "Inserisci tutti i campi";
		this.wrongAccess_msg.html(err_msg).show();
		return;
	} 


	if ( this.usernameIn.val() ===  "admin" && this.passwordIn.val() === "admin")
		this.redirectToApp();
	else {
		globals.loader.show(function(){
			setTimeout(function(){
				err_msg = "Accesso non valido. Inserisci un utente ed una password valide";
				that.wrongAccess_msg.html(err_msg).show();
				globals.loader.hide();		
			}, 1000);
		});
	}

}
LoginObj.prototype.redirectToApp = function() {
	globals.loader.show(function(){
		setTimeout(function(){
			window.location = "/home";
		}, 1500);
	});
}
LoginObj.prototype.bindFunction = function() {
	/* bindo il click al bottone che consente l'inserimento di un record in un dato livello (generico)*/
	var that = this;
	this.usernameIn.bind('keyup', function(event){
		that.inputKeyUp($(this), event)
	});
	this.passwordIn.bind('keyup', function(event){
		that.inputKeyUp($(this), event)
	});

	this.container.find('.btn-login').bind('click', function(event){
		that.loginCheck();
	});

	this.container.find('a.loginAccessDenied').bind('click', function(){
			globals.modal.fill({
				title: "Login Info",
                body: $("<div><div>")
                			.append(
                				"<p class='text-bold'>Tutte le informazioni contenute in questo sito sono da considerarsi confidenziali e sono disponibili per il personale Eli Lilly Italia S.p.A. ed eventuale personale esterno autorizzato</p>",
                				"<p>Per problemi relativi alla procedura di login contattare l'helpdesk</p>"),
                buttons: []
            }).show();
	});
};
