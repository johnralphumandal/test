function DailyElaboration(container){
	this.container = container;
	this.jqEl = {
		table : undefined
	};
};

DailyElaboration.prototype.init = function() {
	this.jqEl.table = this.container.find('table');

	this.eventList();
};

DailyElaboration.prototype.eventList = function() {
	var that = this;
	this.jqEl.table.find('th[rel="elaborate"] input[type="checkbox"]').on('change',function(){
		var inputCheckboxes = that.jqEl.table.find('tbody tr td input[type="checkbox"]');
		if($(this).is(':checked')){
			inputCheckboxes.prop('checked', true);
			console.log('Selezione totale')
		}
		else{
			inputCheckboxes.prop('checked', false);
			console.log('Deselezione totale')
		}
	});
};

$(document).ready(function(){
	page = new DailyElaboration($('#pageContainer'));
	page.init();
});