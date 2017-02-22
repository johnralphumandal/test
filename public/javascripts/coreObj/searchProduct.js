function SearchProduct(container, list_object){
	this.container = container;
	this.jqEl = {
		search_input: undefined,
		button: undefined
	}

	this.list_object = list_object;
}

SearchProduct.prototype.init = function() {
	this.jqEl.search_input = this.container.find('input');
	this.jqEl.button = this.container.find('button');

	console.log(this.jqEl)
	this.startEventListeners();
};

SearchProduct.prototype.startEventListeners = function() {
	var that = this;


	this.jqEl.button.on('click',function(){
		if(that.jqEl.search_input.val()==''){
			console.error("ricerca vuota");
			that.list_object.draw(that.list_object.list_elements);
			return;
		}
		var match_elements = [];
		var regex = new RegExp(that.jqEl.search_input.val(), 'ig') ;
		$.each(that.list_object.list_elements, function(index, element_list){
			if($(element_list).text().match(regex)){
				match_elements.push(element_list);
			}
		});

		that.list_object.draw(match_elements);
	});
};
