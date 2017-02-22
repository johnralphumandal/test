$(document).ready(function(){
    globals["modal"] = new BootstrapModal($('body'));
	globals.sidebar.jqEl.find('.lockSidebar').trigger('click');
    var p = new FactorConversionAndPrices();
    p.bindFunction();
});

function FactorConversionAndPrices(){ 
	this.container = $('body #pageContainer');
	this.product_list = globals.sidebar.jqEl.find('.product-list');
	this.btnShowResult = globals.sidebar.jqEl.find('.btn-show-result');
	this.btnSave = this.container.find('button.btn-save');
	this.itemSelectedObj = this.container.find('.itemSelected');
}

FactorConversionAndPrices.prototype.bindFunction = function(){
	var that = this;
	/* Gestione Liste selezionabili  */
	var product_list_conf = {
		selectFunction: function(){ console.log("sel") }
	};
	this.productListObj = new SelectableList(this.product_list, product_list_conf );
	
	this.btnShowResult.bind('click', function(){
		that.checkSelection();
	});

	this.btnSave.bind('click', function(){
		globals.modal.fill({
			title: "Salva Modifiche",
            body: $("<p>Sei sicuro di voler salvare le modifiche?</p>"),
            buttons: [$("<button class='btn btn-sm btn-default'>Annulla</button>"), $("<button class='btn btn-sm btn-success'>Salva</button>")],
            classe: "modal-sm"
        }).show();
	});

	this.itemSelectedObj.bind('click', function(event){
		globals.sidebar.open();
	});
}

FactorConversionAndPrices.prototype.checkSelection = function(){
	var that = this;
	if (this.product_list.find('.active').length > 0 ) {
		
		globals.loader.show(function(){
			globals.noteManager.hide();
			setTimeout(function(){
				that.container.find('.searchContainer').fadeIn();
				that.itemSelectedObj.find('a').text("IT-VL7510001T - " + that.product_list.find('.active').text());		
				globals.sidebar.close();		
				globals.loader.hide();		
			}, 500);
		});
		globals.sidebar.close();
	}
}


