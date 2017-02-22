$(document).ready(function(){
    globals["modal"] = new BootstrapModal($('body'));
	globals['bAlert'] = new BootstrapAlert($('body'));
	globals.sidebar.jqEl.find('.lockSidebar').trigger('click');
    var p = new PositionObj();
    p.bindFunction();
});


/* Oggetto che gestisce la pagina gestione territorio - posizioni */
function PositionObj(){
	this.filters = {};
	this.container = $('body #pageContainer');
	this.divisionList = globals.sidebar.jqEl.find('.division-list');
	this.userList = globals.sidebar.jqEl.find('.user-list');
	this.typeList = globals.sidebar.jqEl.find('.type-list');
	this.userContainerFilters = globals.sidebar.jqEl.find('.user-container-filter').hide();
	this.accountContainerFilters = globals.sidebar.jqEl.find('.account-container-filter').hide();
	this.brickContainerFilters = globals.sidebar.jqEl.find('.brick-container-filter').hide();
	this.wrongInputMessage = globals.sidebar.jqEl.find('p.wrong-input-message').html("Tutti i filtri sono obbligatori.");
	this.btnShowResult = globals.sidebar.jqEl.find('.btn-show-result');
}
/* binda tutte le funzioni necessarie per il funzionamento della pagina*/
PositionObj.prototype.bindFunction = function() {
	var that = this;
	
	/*filtri di ricerca */
	/* DIVISION */
	var divisionList_conf = { 
		selectFunction: function(e){
			that.filters.division = $(event.target).text();
		}
	}
	this.divisionList_obj = new SelectableList(this.divisionList,divisionList_conf);
	
	/* USER */
	var userList_conf = {
		selectFunction: function(e){
			that.filters.user = $(event.target).text()
		}
	}
	this.userList_obj = new SelectableList(this.userList, userList_conf);

	/* ACCOUNT TYPE */
	this.accountContainerFilters.find('.btn-group a.btn').bind('click', function(event){
		$(this).siblings().removeClass('active');
		$(this).addClass('active');
		that.accountContainerFilters.find('div.tabs-cont').hide();
		that.accountContainerFilters.find('div#'+$(this).attr('rel') ).show();
	});

	var typeList_conf = {
		selectFunction: function(event){
			switch($(event.target).closest('div.tabs-cont').attr('id')){
				case("account-account-list-container-filter"):
					that.filters.account_type_account = $(event.target).text();
					break;
				case("account-sales-rapresentative-list-container"):
					that.filters.account_type_sr = $(event.target).text();
					break;
				default:

			}

		}
	}
	this.typeList_obj = new SelectableList(this.typeList, typeList_conf);


	this.btnShowResult.bind('click', function(){
		that.checkSelection();
	});

	this.container.find('h4.itemSelected a').bind("click",function(){
		globals.sidebar.open();
	});

	/* position-container-tab */
	/* gestione liste */
	this.nationalSalesManagerList = this.container.find("div#position-container-tab .national-sales-manager-list");
	var nationalSalesManagerList_conf = {selectFunction: function(){console.log("NSM_sel");}}
	this.nationalSalesManagerList_obj = new SelectableList(this.nationalSalesManagerList, nationalSalesManagerList_conf);

	this.districtSalesManagerList = this.container.find("div#position-container-tab .district-sales-manager-list");
	var districtSalesManagerList_conf = {selectFunction: function(){console.log("DSM_sel");}}
	this.districtSalesManagerList_obj = new SelectableList(this.districtSalesManagerList, districtSalesManagerList_conf);

	this.salesRapresentativeList = this.container.find("div#position-container-tab .sales-rapresentative-list");
	var salesRapresentativeList_conf = {selectFunction: function(){console.log("RS_sel");}}
	this.salesRapresentativeList_obj = new SelectableList(this.salesRapresentativeList, salesRapresentativeList_conf);


	
	/* Gestione tabs nella pabina */
	this.container.find('ul.nav.nav-tabs li').bind('click', function(){
		$(this).siblings().removeClass('active');
		$(this).addClass('active');
		that.container.find('.tabContainer > div').hide();
		that.container.find('.tabContainer > div#'+$(this).attr('rel') ).show();
		that.manageTabFilters($(this).attr('rel'));
	});

	this.container.find('div#position-container-tab div p.action-group button').bind('click',function(){
		globals.modal.fill(that.getModalConf($(this).attr('rel'))).show();
	});

	this.container.find('div#user-container-tab table.table-position tbody td.btn-add').bind('click',function(event){
		alert('confirm');
	});

	this.container.find('div#user-container-tab table.table-position tbody td.btn-remove').bind('click',function(event){
		alert('confirm');
	});
};

PositionObj.prototype.checkSelection = function(){
	var that = this;
	if (globals.sidebar.jqEl.find('div.filter-container:visible').length === globals.sidebar.jqEl.find('div.filter-container:visible ul:visible li.active').length) {
		this.wrongInputMessage.css("visibility","hidden");
		this.container.find('.emptySearch').hide();
		this.container.find('.searchContainer').fadeIn();
		var filterParams = "";

		globals.sidebar.jqEl.find('div.filter-container:visible ul:visible li.active').each(function(){
			filterParams += $(this).text() + " - ";
		});


		globals.loader.show(function(){
			setTimeout(function(){
				filterParams = filterParams.substring(0,filterParams.length-2);
				var destinationTabID = that.container.find('ul.nav.nav-tabs li.active').attr('rel');
				var destinationTab = that.container.find("div#"+destinationTabID);
				destinationTab.find("h4.itemSelected a").text(filterParams).fadeIn(500,destinationTab.find('.tab-note').hide().next().fadeIn(1000));
				
				globals.sidebar.close();		
				globals.loader.hide();		
			}, 500);
		});

		
	} else {
		this.wrongInputMessage.css("visibility","visible");
	}
}


PositionObj.prototype.manageTabFilters = function(rel){
	var that = this;
	this.accountContainerFilters.hide();
	this.userContainerFilters.hide();
	this.brickContainerFilters.hide();
	switch (rel) {
		case 'brick-container-tab':
			this.brickContainerFilters.fadeIn();
			break;
		case 'user-container-tab':
			this.userContainerFilters.fadeIn();
			break;
		case 'account-container-tab':
			this.accountContainerFilters.fadeIn();
			break;
		default:
			break;
	}

	globals.sidebar.open();

}

PositionObj.prototype.getModalConf = function(rel){
	
	var myModalConf = {
		title: "" ,
		body: $("<div></div>"),
		buttons: [$('<button class="btn btn-success btn-sm">Salva</button>')],
		classe: 'modal-sm'
	};

	switch (rel){
		case "national-sales-manager-container":
			myModalConf.title = "National Sales Manager";
			myModalConf.body.append(
					$('<div></div>').addClass('form-group').append("<label for='input-division'>Divisione</label>", "<input type='text' class='form-control input-sm' id='input-division' value='IT-CCARE 2011' disabled>"),
					$('<div></div>').addClass('form-group').append("<label for='inputt-position'>Posizione</label>").append("<div class='input-group'><span class='input-group-addon'>IT-CCARE 2011-NSM</span><input type='text' class='form-control input-sm' id='inputt-position' placeholder='position'></div>")
			);
			break;
		case "district-sales-manager-container":
			myModalConf.title = "District Sales Manager";
			myModalConf.body.append(
					$('<div></div>').addClass('form-group').append("<label for='input-division'>Divisione</label>", "<input type='text' class='form-control input-sm' id='input-division' value='IT-CCARE 2011' disabled>"),
					$('<div></div>').addClass('form-group').append("<label for='input-national-sales-manager'>National Sales Manager</label>","<input type='text' class='form-control input-sm' id='input-national-sales-manager'  disabled value='IT-CCARE 2011-NSMXXX'>"),
					$('<div></div>').addClass('form-group').append("<label for='inputt-position'>Posizione</label>").append("<div class='input-group'><span class='input-group-addon'>IT-CCARE 2011-DSM</span><input type='text' class='form-control input-sm' id='inputt-position' placeholder='position'></div>")
			);
			break;
		case "sales-rapresentative-container":
			myModalConf.title = "Sales Rapresentative";
			myModalConf.body.append(
					$('<div></div>').addClass('form-group').append("<label for='input-division'>Divisione</label>", "<input type='text' class='form-control input-sm' id='input-division' value='IT-CCARE 2011' disabled>"),
					$('<div></div>').addClass('form-group').append("<label for='input-national-sales-manager'>National Sales Manager</label>","<input type='text' class='form-control input-sm' id='input-national-sales-manager'  disabled value='IT-CCARE 2011-NSMXXX'>"),
					$('<div></div>').addClass('form-group').append("<label for='input-district-sales-manager'>District Sales Manager</label>","<input type='text' class='form-control input-sm' id='input-district-sales-manager'  disabled value='IT-CCARE 2011-DSMXXX'>"),
					$('<div></div>').addClass('form-group').append("<label for='inputt-position'>Posizione</label>").append("<div class='input-group'><span class='input-group-addon'>IT-CCARE 2011-SR</span><input type='text' class='form-control input-sm' id='inputt-position' placeholder='position'></div>")
			);
			break;
		default:
			break;
	}

	return myModalConf;
}