$(document).ready(function(){
    globals["modal"] = new BootstrapModal($('body'));
    var p = new ProductMacroGroupPageObj();
    p.bindFunction();
});



/* Oggetto che gestisce la pagina degli indirizzi e contatti */
function ProductMacroGroupPageObj(){ 
	this.container = $('body #pageContainer');

	/* ELEMENTI SULLA SIDEBAR*/
	this.sidebar = globals.sidebar.jqEl;
	this.btnShowResult = globals.sidebar.jqEl.find('.btnShowResult');
	this.btnNewGroup = globals.sidebar.jqEl.find('.btnNewGroup');

	this.groupListContainer = globals.sidebar.jqEl.find('.groups-product-list');
	this.groupListObj = undefined;

	this.productInListContainer = this.container.find('.products-in-group-list');
	this.productInListObj = undefined;

	this.productListContainer = this.container.find('.search-product-list');
	this.productListObj = undefined;

	this.btnAddProduct = $('#btnAddProd');
	this.btnRemoveProduct = $('#btnRemoveProd')
	this.btnRemoveGroup = $('#btnRemoveGroup');
	this.btnSaveAssoc = $(this.container.find('#btnSaveModification'));

	this.radioBtnGroupType = $(this.container.find('#group_type_input'));

};


/* binda tutte le funzioni necessarie per il funzionamento della pagina*/
ProductMacroGroupPageObj.prototype.bindFunction = function() {
	var that = this;
	/* Gestione tabs nella pabina */
	this.groupListObj = new SelectableList(this.groupListContainer, {selectFunction: function(){ console.log("asd"); }});
	this.productInListObj = new SelectableList(this.productInListContainer, {selectFunction: function(){ console.log("asd"); }, isMultiselect: true});
	this.productListObj = new SelectableList(this.productListContainer, {selectFunction: function(){ console.log("asd"); }, isMultiselect: true});

	this.btnShowResult.bind('click', function(){ that.checkSelection(); });

	this.btnSaveAssoc.bind('click', function(){ that.fillModalSave(); globals.modal.show(); });
	this.container.find('.info-group-name').on('click', function(){ globals.sidebar.open(); });

	this.btnNewGroup.on('click', function(){ that.newPanelGroup(); });
	this.btnAddProduct.on('click', function(){ that.moveProducts(that.productInListObj, that.productListObj);})
	this.btnRemoveProduct.on('click', function(){ that.moveProducts(that.productListObj, that.productInListObj);})
	this.btnRemoveGroup.on('click', function(){ that.fillModalRemove(); globals.modal.show(); });
	this.radioBtnGroupType.find('a').on('click', function(){ that.radioBtnGroupType.find('a').removeClass('active'); $(this).addClass('active')})
};

/* Blocchi di codice riportati per rendere il codice leggibile */
ProductMacroGroupPageObj.prototype.fillModalSave = function(){
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

/* controlla i parametri selezionati */
ProductMacroGroupPageObj.prototype.checkSelection = function() {
	if (this.groupListContainer.find('.active').length > 0) {
		this.productInListContainer.find('li').removeClass('active');
		this.productListContainer.find('li').removeClass('active');
		this.container.find('.info-group-name').text(this.groupListContainer.find('.active').text());
		this.container.find('.itemSelected').removeClass('hidden');
		this.container.find('input.info-group-name').closest('.form-group').addClass('hidden');
		this.btnRemoveGroup.removeClass('hidden');
		globals.noteManager.hide();
		this.container.find('.searchContainer').fadeIn();
		globals.sidebar.close();
	}
};

ProductMacroGroupPageObj.prototype.newPanelGroup = function(){
	this.container.find('.itemSelected').addClass('hidden');
	this.container.find('input.info-group-name').closest('.form-group').removeClass('hidden');
	this.btnRemoveGroup.addClass('hidden');

	this.productInListContainer.find('ul').empty();

	this.container.find('.emptySearch').hide();
	this.container.find('.searchContainer').fadeIn();
	globals.sidebar.close();
}

///         A  <---  B
ProductMacroGroupPageObj.prototype.moveProducts = function(ObjA, ObjB){
	var elements_to_move = ObjB.container.find('li.active');
	ObjA.pushElements(elements_to_move);
	$(elements_to_move).removeClass('active');
}

ProductMacroGroupPageObj.prototype.fillModalRemove = function(jqEl){
	var that = this;

	globals.modal.fill({
		title: "Rimuovi Associazione",
        body: $("<p>Sei sicuro di voler rimuovere il gruppo selezionato? ["+that.groupListContainer.find('.active').html()+"]</p>"),
        buttons: [
	        $("<button class='btn btn-sm btn-default'>Annulla</button>").on('click', function(){ globals.modal.hide(); }), 
	        $("<button class='btn btn-sm btn-success'>Rimuovi</button>").on('click', function(){ 
	        	$(that.groupListContainer.find('.active')).remove();
	        	console.error("Eliminato gruppo"); 
	        	that.container.find('.searchContainer').fadeOut(); 
	        	globals.noteManager.show();
				globals.modal.hide(); 
				globals.sidebar.open();
	        })
	    ],
        classe: "modal-sm"
    });
};