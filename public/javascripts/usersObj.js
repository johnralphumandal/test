
$(document).ready(function(){
    globals["modal"] = new BootstrapModal($('body'));
    var p = new ProductPageObj();
    p.bindFunction();
});




/* Oggetto che gestisce la pagina dei prodotti*/
function ProductPageObj(){ }
/* binda tutte le funzioni necessarie per il funzionamento della pagina*/
ProductPageObj.prototype.bindFunction = function(first_argument) {
	/* bindo il click al bottone che consente l'inserimento di un record in un dato livello (generico)*/
	$('#btn_addProduct').bind('click', function(){
			globals.modal.fill({
				title: "Inserimento ",
                body: $("<p>Form inserimento</p>"),
                buttons: [],
                classe: 'modal-sm'
            }).show();
	});
	// binda gli eventi su una data tabella (la prima in questo caso)
	this.bindTableEvent( $('table.productsTable').data("tableLevel", 1) )
};
/* metodo generico per bindare le funzioni sulle tabelle che compongono i livelli */
ProductPageObj.prototype.bindTableEvent = function(table) {
	var that = this;
	table.find('.advancedControllers button').bind('click', function(event){
		that.openLinkDialog($(this).closest('table').data('tableLevel'), {code: $($(this).closest('tr').children()[0]).text() });
	});
	/* click sul bottone di modifica recod tabellari (in base al livello)*/
	table.find('tr td.editProduct button').bind('click', function(){
		var body = $('<div></div>');
		body.append(
					$('<div></div>').addClass('form-group').append("<label for='inputProdCode'>Codice Prodotto</label>", "<input type='text' class='form-control input-sm' id='inputProdCode' placeholder='code' disabled>"),
					$('<div></div>').addClass('form-group').append("<label for='inputProdDescr'>Descrizione</label>", "<textarea class='form-control input-sm' id='inputProdDescr' rows='3' placeholder='Descrizione' ></textarea>"),
					$('<div></div>').addClass('form-group').append("<label for='inputProdLv'>Livello</label>", "<input type='text' class='form-control input-sm' id='inputProdLv' placeholder='livello' disabled>"),
					$('<div></div>').addClass('form-group').append("<label for='inputType'>Tipo</label>", "<select type='text' class='form-control input-sm' id='inputType' ><option>Market</option></select>"),
					$('<div></div>').addClass('form-group').append("<label for='inputStatus'>Stato</label>", "<select type='text' class='form-control input-sm' id='inputStatus' ><option>Active</option><option>Inactive</option></select")
			);
		globals.modal.fill({
				title: "Modifica " + $($(this).closest('tr').children()[0]).text(),
                body: body,
                buttons: [$('<button class="btn btn-sm btn-default">Annulla</button>'), $('<button class="btn btn-sm btn-success">Modifica</button>')],
                classe: 'modal-md'
            }).show();
	});
	/* bind sulle celle che compongono ciascuna riga: causa il collapse e la richiesta al server del livello successivo */
	if (table.data('tableLevel') < 5)
		table.find('tr td').not('.editProduct, .advancedControllers').bind('click', function(){
			var tathJqEl = this;
			if ($(this).parent().hasClass('levelSelected')) {
				$(this).parent().removeClass('levelSelected');
				$(this).closest('tbody').find('tr').show();
				console.log($(this).closest('.tableLevel').nextAll().filter('.tableLevel'))
				$(this).closest('.tableLevel').nextAll().filter('.tableLevel').empty().remove();
			} else {
				$(this).parent().addClass('levelSelected').siblings().hide();
//				globals.functions.ajax({id: 2,asd: "lol"}, 'products/',function(resp){
					that.generateTable($(tathJqEl).closest('table').data("tableLevel")+1, $(tathJqEl).closest('.tableLevel').clone())
//				});
			}
		});
};

ProductPageObj.prototype.generateTable = function(lv, tableCont) {
	tableCont.find('label').html('Livello '+lv);
	tableCont.find('table').attr("rel", "lv"+lv)
	tableCont.find('table').data("tableLevel", lv).find('tbody').empty();
	var that = this,
		voices = [];
	var hasAdvCtrl = false;
	switch(lv){
		case 2: 
			voices.push({ code: "IT-SBMKT-NEU", descr: "Sub Mercato Neurolettici", lv: lv, type: 'Sub-Market', status: 'Active' });
		break;
		case 3: 
			voices.push({ code: "IT-BRAC-ABIL", descr: "Abilify", lv: lv, type: 'Competitor', status: 'Active', semaphore: Math.floor((Math.random() * 3) + 1) });
			voices.push({ code: "IT-BRAC-LEPO", descr: "Leponex", lv: lv, type: 'Competitor', status: 'Active', semaphore: Math.floor((Math.random() * 3) + 1) });
			voices.push({ code: "IT-BRAC-OLA", descr: "Olanzapina Generico Lilly", lv: lv, type: 'Detail', status: 'Active', semaphore: Math.floor((Math.random() * 3) + 1) });
			voices.push({ code: "IT-BRAC-ZYP", descr: "Zyprexa", lv: lv, type: 'Detail', status: 'Active', semaphore: Math.floor((Math.random() * 3) + 1) });
			voices.push({ code: "IT-BRAC-ZIPAD", descr: "ZypAdhera", lv: lv, type: 'Detail', status: 'Active', semaphore: Math.floor((Math.random() * 3) + 1) });
			hasAdvCtrl = true;
		break;
		case 4: 
			voices.push({ code: "IT-BRAL-LLY-5MG", descr: "OLANZAPINA GENERICO LILLY ORODISPENSERS ZYDYS 5MG/28", lv: lv, type: 'Detail', status: 'Active' });
			voices.push({ code: "IT-OLAN-LLY-10MG", descr: "OLANZAPINA GENERICO LILLY ORODISPENSERS ZYDYS 10MG/28", lv: lv, type: 'Detail', status: 'Active' });
			voices.push({ code: "IT-OLANZ-TAB-LLY-10MG/28", descr: "OLANZAPINA GENERICO LILLY TABLETS 10MG/28", lv: lv, type: 'Detail', status: 'Active' });
			voices.push({ code: "IT-OLANZ-TAB-LLY-2,5MG/28", descr: "OLANZAPINA GENERICO LILLY TABLETS 2,5MG/28", lv: lv, type: 'Detail', status: 'Active' });
		break;
		case 5: 
			voices.push({ code: "IT-TA445415VITG", descr: "OLANZAPINA GENERICO LILLY ORODISPENSERS ZYDYS 10MG/28", lv: lv, type: 'Package', status: 'Active', semaphore: Math.floor((Math.random() * 2) + 1) });
			voices.push({ code: "IT-TA445415VITG1", descr: "OLANZAPINA GENERICO LILLY ORODISPENSERS ZYDYS 10MG/28", lv: lv, type: 'Sample', status: 'Active', semaphore: Math.floor((Math.random() * 2) + 1) });
			hasAdvCtrl = true;
		break;
	}
	for (var v = 0; v < voices.length; v++) {
		var adv_content = "&nbsp;";
		var chart_content = "&nbsp;";
		var chartClasses = ["0", "100", "50"];
		console.log(voices[v])
		if (hasAdvCtrl) {
			adv_content = $("<button class='btn btn-xs btn-default'><span class='glyphicon glyphicon-link'></span></button>")
			chart_content = $("<div class='semaphore semaphore-"+chartClasses[voices[v].semaphore-1]+"'></div>");
		}
		tableCont.find('tbody').append(
			$('<tr></tr>').append(
				$("<td></td>").html(voices[v].code),
				$("<td></td>").html(voices[v].descr),
				$("<td></td>").html(voices[v].lv),
				$("<td></td>").html(voices[v].type),
				$("<td></td>").html(voices[v].status),
				$("<td></td>").addClass("text-center editProduct").html('<button class="btn btn-default btn-xs"><span class="glyphicon glyphicon-edit"></span></button>'),
				$("<td></td>").addClass('chartControllers').append(chart_content),
				$("<td></td>").addClass('advancedControllers').append(adv_content)
			)
		);
	}

	$('.tableLevelsContainer').append(tableCont);
	this.bindTableEvent(tableCont.find('table'))
};

ProductPageObj.prototype.openLinkDialog = function(level, row) {
	var body = $('<div><p class="help-block">Usa i link per collegarti alle sezioni relative e completare le associazioni</p></div>');
	switch(level.toString()){
		case "1":
			body.append(
						$('<p><a href="'+globals.baseUrl+'products/dmMatch/?elem=e">Associazione Divisione Mercato</a></p>')
				);
		break;
		case "3":
			body.append(
						$('<p><a href="'+globals.baseUrl+'products/productContribution/?elem=e">Product Contribution</a></p>'),
						$('<p><a href="'+globals.baseUrl+'products/productCodeMatch/?elem=e">IMS - OneLilly Product Code Match</a></p>')
				);
		break;
		case "5":
			body.append(
						$('<p><a href="'+globals.baseUrl+'products/factorConversionAndAvgPrice/?elem=e">Fattori di Conversione e Prezzo Medio</a></p>')
				);
		break;
	}
	globals.modal.fill({
			title: row.code,
            body: body,
            buttons: [],
            classe: 'modal-sm'
        }).show();
};