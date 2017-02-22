function SelectableList(container, config){
	this.container = container;
	this.conf = {
		isMultiselect: config.isMultiselect || false,
		selectFunction: config.selectFunction
	};
	this.inputSearch = undefined;
	this.searchTimeout = undefined;
	this.init();
}

SelectableList.prototype.init = function() {
	var that = this;
	if (this.container.find('.searchable-list-filter').length >0) {
		this.inputSearch = this.container.find('.searchable-list-filter input').bind('keyup', function (event) {
            var input = $(this);
            if (that.searchTimeout !== undefined)
                clearTimeout(that.searchTimeout);
            that.searchTimeout = setTimeout(function () {
                that.matchInList(input.val());
            }, 200);
        });
	}

	this.container.find('ul li').bind('click', function(event){
		if (!that.conf.isMultiselect) {
			$(this).parent().children().each(function(){ $(this).removeClass('active'); })
			$(this).addClass('active');
		} else 
			$(this).toggleClass('active');

		if (that.conf.selectFunction !== undefined)
			that.conf.selectFunction(event);
	});
};

SelectableList.prototype.matchInList = function(content) {
	this.container.find('li').each(function(){
		if ($(this).text().toUpperCase().indexOf(content.toUpperCase()) >= 0)
			$(this).show();
		else
			$(this).hide();
	});
};

SelectableList.prototype.pushElements = function(array_of_elements){
	$list_content = this.container.find('ul');
	for(var i=0; i<array_of_elements.length; i++){
		$list_content.append(array_of_elements[i]);
	}
	$list_content.removeClass('active');
}