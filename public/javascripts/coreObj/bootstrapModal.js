function BootstrapModal(container) {
    this.container = container;
    this.jqModal = $('#myModal');
    this.configuration = undefined;
    this.showFunct = undefined;
    this.hideFunct = undefined;
    this.respFunct = undefined;
    var that = this;
    // SHOW
    this.jqModal.on('show.bs.modal', function (e) { });
    this.jqModal.on('shown.bs.modal', function (e) {
        if (that.showFunct !== undefined)
            that.showFunct();
    });
    // HIDE
    this.jqModal.on('hide.bs.modal', function (e) {
        if (that.hideFunct !== undefined)
            that.hideFunct();
    });
    this.jqModal.on('hidden.bs.modal', function (e) {
        if (that.respFunct !== undefined)
            that.respFunct();
        that.jqModal.find('.modal-body').empty();
    });
}

BootstrapModal.prototype.fill = function (conf, cb) {

    this.configuration = conf;
    var title = conf.title || "System Message";
    var body = conf.body || $('<p></p>');
    this.configuration["buttons"] = this.configuration.buttons || [];
    var classe = conf.classe || 'modal-md';

    if (conf.status)
        title = "<span class='glyphicon glyphicon-" + conf.status + "-sign'></span> " + title;

    this.jqModal.find('.modal-title').html(title);
    this.jqModal.find('.modal-body').empty().append(body);
    this.jqModal.find('.modal-footer').empty();
    var b;
    for (b in this.configuration.buttons)
        this.jqModal.find('.modal-footer').append(this.configuration.buttons[b]);

    this.jqModal.find('.modal-dialog').removeClass('modal-sm').removeClass('modal-md').removeClass('modal-lg');

    if (Array.isArray(classe)) 
        for (var c in classe)
            this.jqModal.find('.modal-dialog').addClass(classe[c]);
    else
        this.jqModal.find('.modal-dialog').addClass(classe);

    (this.configuration.buttons.length > 0) ? this.jqModal.find('.modal-footer').show() : this.jqModal.find('.modal-footer').hide();
    if (cb) { cb(); }
    return this;
};

BootstrapModal.prototype.show = function (showFunct, hideFunct) {
    var that = this;
    this.showFunct = showFunct;
    this.hideFunct = hideFunct;
    this.jqModal.modal({ backdrop: 'static' }, { 'show': true });
    if (this.configuration.autoClose !== undefined) {
        this.startAutoAction();
    }
};
BootstrapModal.prototype.startAutoAction = function () {
    var that = this;
    if (this.configuration.autoClose.time > 0) {
        that.configuration.buttons[that.configuration.autoClose.button].find('span').text("(" + this.configuration.autoClose.time + ")")
        this.configuration.autoClose.time = this.configuration.autoClose.time - 1;
        setTimeout(function () {
            that.startAutoAction();
        }, 1000);
    }
    else
        that.configuration.buttons[that.configuration.autoClose.button].trigger('click');
};

BootstrapModal.prototype.hide = function (callback) {
    this.respFunct = callback;
    this.jqModal.modal('hide');
};