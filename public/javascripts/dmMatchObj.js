$(document).ready(function(){
    globals["modal"] = new BootstrapModal($('body'));
    var p = new DmMatchObj();
    p.bindFunction();
});



/* Oggetto che gestisce la pagina degli indirizzi e contatti */
function DmMatchObj(){ 
	this.container = $('body #pageContainer');
	this.divisionList = globals.sidebar.jqEl.find('.divisionList');
	this.marketList = globals.sidebar.jqEl.find('.marketList');
	this.btnShowResult = globals.sidebar.jqEl.find('.btnShowResult');
	this.btnSaveAssoc = this.container.find('.saveAssoc');
	this.btnRemoveAssoc = this.container.find('.removeAssoc');
}
/* controlla i parametri selezionati */
DmMatchObj.prototype.checkSelection = function() {
	if (this.divisionList.find('.active').length > 0 && this.marketList.find('.active').length > 0 ) {
		globals.noteManager.hide();
		this.container.find('.searchContainer').fadeIn();
		globals.sidebar.close();
	}
};
/* binda tutte le funzioni necessarie per il funzionamento della pagina*/
DmMatchObj.prototype.bindFunction = function() {
	var that = this;
	/* Gestione Liste selezionabili  */
	var divisionList_conf = {
		selectFunction: function(){ console.log("sel") }
	};
	var marketList_conf = {
		selectFunction: function(){ console.log("sel") }
	};
	this.divisionListObj = new SelectableList(this.divisionList, divisionList_conf );
	this.marketListObj = new SelectableList(this.marketList, marketList_conf );
	this.btnShowResult.bind('click', function(){
		that.checkSelection();
	});
	this.btnSaveAssoc.bind('click', function(){
		globals.modal.fill({
			title: "Salva Modifiche",
            body: $("<p>Sei sicuro di voler salvare le modifiche?</p>"),
            buttons: [$("<button class='btn btn-sm btn-default'>Annulla</button>"), $("<button class='btn btn-sm btn-success'>Salva</button>")],
            classe: "modal-sm"
        }).show();
	});
	this.btnRemoveAssoc.bind('click', function(){		
		globals.modal.fill({
			title: "Rimuovi Associazione",
            body: $("<p>Sei sicuro di voler rimuovere l'associazione divisione/mercato?</p>"),
            buttons: [$("<button class='btn btn-sm btn-default'>Annulla</button>"), $("<button class='btn btn-sm btn-success'>Rimuovi</button>")],
            classe: "modal-sm"
        }).show();
	});
	this.container.find('.itemSelected').bind('click', function(event){
		globals.sidebar.open();
	});
};