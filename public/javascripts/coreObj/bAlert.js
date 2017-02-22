function BootstrapAlert( container ){
	this.container = container;
	this.isVisible = false;
	this.currentContent = undefined;
    this.init()
}

BootstrapAlert.prototype.init = function () {
    var that = this;
    
};

BootstrapAlert.prototype.show = function (configuration, timeout) {
    var that = this;
	if ( !this.isVisible ) {
		this.isVisible = true;
		this.currentContent = $(	'<div style = "width: 100%; height: 100%; top: 0; left: 0;position: absolute; z-index: 1050;">' +
										'<div class="alert myAlert ' + configuration.classe + '" role="alert" style="position: relative; margin: auto; margin-top: ' + ((window.scrollY || window.pageYOffset) + window.innerHeight / 3) + 'px;">' +
											'<div></div>' +
											'<button type="button" class="close" data-dismiss="alert" aria-label="Close" style="position: absolute; top:4px; right: 4px;"><span aria-hidden="true">&times;</span></button>' +
										'</div>' +
									'</div>'
								);
	}
	this.currentContent.find( 'div.alert > div' ).empty().append( $('<div></div>').append( configuration.body || "" ) );
	var button = this.currentContent.find( 'div.alert > button' );
	var buttonEvents = $._data( button[0], 'events' );
	var that = this;
	if (buttonEvents !== undefined && buttonEvents['click'] )
	    button.unbind('click');

	button.bind('click', function () {
		that.hide();
	});
	
	this.container.append(this.currentContent);

	$(document).one('click', function () {
        
	    that.hide();
	});

	if (timeout)
	    setTimeout(function () { that.hide() }, timeout);
};

BootstrapAlert.prototype.hide = function () {

    var that = this;
    if (this.currentContent !== undefined)
        this.currentContent.fadeOut(400, function () {
            that.currentContent.remove();
        });
    	
	this.isVisible = false;
};
