/* DEFINIZIONE VARIABILE GLOBALS */
var globals = {
    baseUrl: "http://localhost:3000/",
	functions: {
		ajax: function(data, controller, success, error){
 			$.ajax({
                    url: globals.baseUrl+controller,
//                    url: "http://testolino-testolino.paas-poc.am.lilly.com/"+controller,
                    type: "POST",
                    data: data,
                    dataType: "json",
                    success: function (resp) {
                        success(resp)
                    },
                    fail: function (jqXHR, textStatus) {
                        (error !== undefined) ? error() : alert("Request failed: " + textStatus);
                        return;
                    },
                    error: function (jqXHR, textStatus, errorThrown) {
                        (error !== undefined) ? error() : alert('error ' + textStatus + " " + errorThrown);
                        return;
                    }
                });
		}
	}
};


/* OGGETTO SLIDER */ 
function CustomSidebar(){
    this.jqEl = $('.customSidebar');
    this.buttonShowHide = this.jqEl.find('.customSidebar-icon');
    this.buttonLockSidebar = this.jqEl.find('.lockSidebar');
    this.init();
}
CustomSidebar.prototype.init = function() {
    var that = this;
    console.log(this)
    this.buttonLockSidebar.bind("change", function(){
        if($(this).is(':checked')) {
            that.jqEl.addClass('lockedSidebar');
        } else {
            that.jqEl.removeClass('lockedSidebar');
        }
    });
    this.buttonShowHide.bind('click', function(event){
        if (!that.jqEl.hasClass('lockedSidebar')){
            that.jqEl.toggleClass('open');
            $("#pageContainer").toggleClass('page_lockedSidebar');
        }
    });
};
CustomSidebar.prototype.close = function() {
    if (!this.jqEl.hasClass('lockedSidebar')){
        this.jqEl.removeClass('open');
        $("#pageContainer").removeClass('page_lockedSidebar');
    }
};
CustomSidebar.prototype.open = function() {
    if (!this.jqEl.hasClass('lockedSidebar')) {
        this.jqEl.addClass('open');
        $("#pageContainer").addClass('page_lockedSidebar');
    }
};
/*
CustomSidebar.prototype.openSidebar = function() {
    var that = this;
    this.jqEl.animate({
            left: '0px'
        }, 'fast', function(){
            that.jqEl.addClass('open');
        });
};
CustomSidebar.prototype.closeSidebar = function() {
    var that = this;
    this.jqEl.animate({
            left: "-260px"
        }, 'fast', function(){
            that.jqEl.removeClass('open');
        });
};
*/
/* OGGETTO LOADER */ 
function CustomLoader(elem) {
    this.jqEl = elem;
}
CustomLoader.prototype.show = function(callback) {
    var that = this;
    this.jqEl.fadeIn(200, function(){
        $(that.jqEl.children(0)).addClass('activespin');
        if (callback !== undefined)
            callback();
    });
};
CustomLoader.prototype.hide = function() {
    this.jqEl.fadeOut();
};




function HeaderNoteMng(){
    this.infoBtn = $('.pageTitleContainer > div.infoBtn');
    this.pageNotesH = $('div.pageNotesNew');
    this.init();
}
HeaderNoteMng.prototype.init = function(first_argument) {
    var that = this;
    this.infoBtn.bind('click', function(){
        if (that.pageNotesH.is(':visible'))
            that.hide();
        else
            that.show();
    });
};
HeaderNoteMng.prototype.show = function(first_argument) {
    this.pageNotesH.fadeIn();
};
HeaderNoteMng.prototype.hide = function(first_argument) {
    this.pageNotesH.fadeOut();
};

$(document).ready(function(){
    globals.sidebar = new CustomSidebar();
    globals.loader = new CustomLoader($('.customLoader'));
    globals.noteManager = new HeaderNoteMng();

    $('.fontChooser span').bind('click', function(){
        $('body').removeClass("fontSmall fontMedium fontBig").addClass($(this).attr('rel'));
        document.cookie = "fontSize=" + $(this).attr('rel') + ";path=/";
    });


});

