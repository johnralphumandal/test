$(document).ready(function(){
    globals["modal"] = new BootstrapModal($('body'));
    var p = new ProductContributionObj();
    p.init();
});



/* Oggetto che gestisce la pagina Prodotti > Product Contribution */
function ProductContributionObj(){ 
	var that = this;
	this.container = $('body #pageContainer');

	/* Per tenere conto degli input da visualizzare*/
	/*
	this.info = {
		container: this.container.find('.info-group')
	};
	this.info.input_product = this.info.container.find('#product'),
	this.info.input_division = this.info.container.find('#division'),
	this.info.input_value = this.info.container.find('#value')
	*/
	/* Fine*/

	this.sidebar = globals.sidebar.jqEl;
	this.groupListContainer = globals.sidebar.jqEl.find('.group-list');
	this.groupListObj = undefined;
	this.divisionListContainer = this.container.find('.division');
	this.divisionListObj = undefined;
	this.btnShowResult = globals.sidebar.jqEl.find('.btnShowResult');
	this.btnCreateAssociation = this.container.find('#btnCreateAssoc');
	this.btnSaveAssoc = this.container.find('#btnSaveModification');
	this.btnDeleteAssoc = this.container.find('.btnDeleteAssoc');

	console.log(this)
}

ProductContributionObj.prototype.init = function(){
	var that = this;
	this.groupListObj = new SelectableList(this.groupListContainer, {});
	this.divisionListObj = new SelectableList(this.divisionListContainer, { selectFunction: function(){ console.log('asd') } });

	this.bindFunction();
};

/* controlla i parametri selezionati */
ProductContributionObj.prototype.checkSelection = function() {
	if (this.groupListContainer.find('ul .active').length > 0) {
		$(".itemSelected a").html(this.groupListContainer.find('.active').text());
		this.container.find('.searchContainer').fadeIn();

		globals.noteManager.hide();
		globals.sidebar.close();
	}
};

/* binda tutte le funzioni necessarie per il funzionamento della pagina*/
ProductContributionObj.prototype.bindFunction = function() {
	var that = this;

	this.btnShowResult.bind('click', function(){ that.checkSelection(); });

	$(this.btnCreateAssociation).bind('click', function(){ that.fillModalAddAssoc(); globals.modal.show(); });
	$(this.btnSaveAssoc).bind('click', function(){ that.fillModalSave(); globals.modal.show(); });
	$(this.btnDeleteAssoc).bind('click', function(){ that.fillModalRemove($(this)); globals.modal.show(); });
	this.container.find('.itemSelected').bind('click', function(event){	globals.sidebar.open();	});
};

ProductContributionObj.prototype.loadInfo = function(){
	this.info.input_product.val();
	this.info.input_division.val();
	this.info.input_value.val();
};

/* carica la lista prima di generare l'oggetto nella divisione */
ProductContributionObj.prototype.loadDivisions = function(){

};

/* -----------------Blocchi di codice riportati per rendere il codice leggibile ----------------------*/
ProductContributionObj.prototype.fillModalSave = function(){
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

ProductContributionObj.prototype.fillModalRemove = function(jqEl){

	globals.modal.fill({
		title: "Rimuovi Associazione",
        body: $("<p>Sei sicuro di voler rimuovere l'associazione divisione/prodotto?</p>"),
        buttons: [
	        $("<button class='btn btn-sm btn-default'>Annulla</button>").on('click', function(){ globals.modal.hide() }), 
	        $("<button class='btn btn-sm btn-success'>Rimuovi</button>").on('click', function(){ jqEl.closest('tr').remove(); console.error("Eliminata assoc"); globals.modal.hide() })
	    ],
        classe: "modal-sm"
    });
};

/* Per l'aggiunta della nuova associazione */
ProductContributionObj.prototype.fillModalAddAssoc = function(){
	var that = this;

	/*genera lista attraverso una struttura json*/
	$.get('http://localhost:3000/json/productList.json', function(data){
		var $body = $('<div class=""></div>');
		$body.append(
			$('<div class="form-group"></div>').append(
				$('<label></label>').html("Prodotto"),
				$('<input type="text" class="form-control" readonly>').val(that.groupListContainer.find('.active').html())
			));

		//////////////////COSTRUZIONE LISTA/////////////////////////
		var $list_searchbar = $('<div class="input-group searchable-list-filter"></div>');
		
		$list_searchbar.append(
			$('<span class="input-group-addon"><span>').append($('<span class="glyphicon glyphicon-search"></span>')),
			$('<input type="text" class="input-sm form-control" placeholder="Ricerca...")/>')
		);

		var rows = 10; // righe visualizzabili
		var list_height = 31*rows-(rows+1);
		var $list_content = $('<div class="list-container" style="height: '+list_height+'px"></div>');
		if(true) // searchable?
			$list_content.addClass('searchable-list');

		var $list = $('<ul class="list-group noselect"></ul>')
		
		for(var i=0; i<data.length; i++){
			var $list_element = $('<li class="list-group-item"></li>').html(data[i].name).attr('data-value', data[i].id);
			if(data[i].canDelete)
				$list_element.append($('<span class="pull-right glyphicon glyphicon-trash"></span>'));
			$list.append($list_element);
		}
		$list_container = $('<div class="form-group group-list noselect"></div>').append($('<label></label>').text('Divisioni'));

		$list_content.append($list);
		$list_container.append($list_searchbar);
		$list_container.append($list_content);

		$body.append($list_container);

		///////////////////FINE COSTRUZIONE LISTA////////////////////////
		$body.append(
			$('<div class="form-group"></div>').append(
				$('<label></label>').html("Valore (%)"),
				$('<input type="text" class="form-control">')
			)
		);

		var buttons = [
			$('<button class="btn btn-sm btn-success">Crea Associazione</button>').on('click', function(){ console.error("Creata assoc"); globals.modal.hide() })
		];
		
		globals.modal.fill({
			title: "Nuova associazione",
			body: $body,
			buttons: buttons,
			classe: "modal-sm"
		});

		this.divisionListModal = new SelectableList($list_container, {isMultiselect: false});
	});
};