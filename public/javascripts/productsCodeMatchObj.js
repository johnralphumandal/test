$(document).ready(function(){
    globals["modal"] = new BootstrapModal($('body'));
    var p = new ProductsCodeMatchObj();
    p.bindFunction();
});



/* Oggetto che gestisce la pagina degli indirizzi e contatti */
function ProductsCodeMatchObj(){ 
	this.container = $('body #pageContainer');
	this.sidebar = globals.sidebar.jqEl;
	this.productsListContainer = globals.sidebar.jqEl.find('.products-list');
	this.btnShowResult = globals.sidebar.jqEl.find('.btnShowResult');
	this.btnSaveAssoc =  $(this.container.find('#btnSaveModification'));
}

/* binda tutte le funzioni necessarie per il funzionamento della pagina*/
ProductsCodeMatchObj.prototype.bindFunction = function() {
	var that = this;
	/* Gestione tabs nella pabina */
	this.productsListObj = new SelectableList(this.productsListContainer, {selectFunction: function(){ console.log("asd"); }});
	this.btnShowResult.bind('click', function(){ that.checkSelection(); });
	this.container.find('.itemSelected').bind('click', function(event){	globals.sidebar.open();	});
	this.btnSaveAssoc.bind('click', function(){ that.fillModalSave(); globals.modal.show(); });
};

/* controlla i parametri selezionati */
ProductsCodeMatchObj.prototype.checkSelection = function() {
	if (this.productsListContainer.find('ul .active').length > 0) {
		$(".itemSelected a").html(this.productsListContainer.find('.active').text());
		
		this.container.find('.searchContainer').fadeIn();

		globals.noteManager.hide();
		globals.sidebar.close();
	}
};

ProductsCodeMatchObj.prototype.fillModalSave = function(){
	globals.modal.fill({
		title: "Salva Modifiche",
        body: $("<p>Sei sicuro di voler salvare le modifiche?</p>"),
        buttons: [
	        $("<button class='btn btn-sm btn-default'>Annulla</button>").on('click', function(){ globals.modal.hide() }), 
	        $("<button class='btn btn-sm btn-success'>Salva</button>").on('click', function(){ globals.modal.hide() })
        ],
        classe: "modal-sm"
    });
};