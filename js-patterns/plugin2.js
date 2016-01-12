;(function($, window, document, undefined){

    var Plugin = function( elem, options ){
        this.elem = elem;
        this.$elem = $(elem);
        this.options = options;
        this.metadata = this.$elem.data('plugin-options');
    };

    Plugin.prototype = {
        defaults: {
            message: 'Hello world!'
        },
        init: function() {
            this.config = $.extend({}, this.defaults, this.options, this.metadata);

            this.sampleMethod();
            return this;
        },
        sampleMethod: function() {
            console.log(this.config.message);
        }
    }

    Plugin.defaults = Plugin.prototype.defaults;

    $.fn.plugin = function(options) {
        return this.each(function() {
            new Plugin(this, options).init();
        });
    };

})(jQuery, window , document);

$('#product-form').plugin({message: 'Goodbye World!'});
var p = new Plugin(document.getElementById('product-form'), {message: 'Goodbye World!'}).init();
Plugin.defaults.message = 'Goodbye World!';
p.sampleMethod();


;(function($, window, document, undefined){


    // The actual plugin constructor
    var Plugin = function(elem, options) {
        this.init(elem, options);
    };

    Plugin.prototype = {
        defaults: {
            message: 'Hello world!'
        },
        init: function(elem, options) {
            this.elem = elem;
            this.$elem = $(elem);
            this.options = $.extend({}, this.defaults, options);
            return this;
        },
        sampleMethod: function() {
            console.log('sampleMethod');
        }
    };

    Plugin.defaults = Plugin.prototype.defaults;

    Plugin.staticMethod = function () {
        return 'Static method';
    };

    $.fn.plugin = function(options) {
        return this.each(function() {
            new Plugin(this, options).init();
        });
    };

    $('#product-form').plugin({message: 'Goodbye World!'});
    var p = new Plugin(document.getElementById('elem'), {message: 'Goodbye World!'}).init();
    Plugin.defaults.message = 'Goodbye World!';
    p.sampleMethod();

})(jQuery, window , document);