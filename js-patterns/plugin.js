// Основные паттерны плагинов jQuery
// http://habrahabr.ru/sandbox/39442/
// http://addyosmani.com/resources/essentialjsdesignpatterns/book/
// http://jqueryboilerplate.com/


(function($){

    var methods = {
        init : function(params) {
            var options = $.extend({}, $.fn.myPlugin.defaults, params);

            //$(document).on('click.myplugin', 'selector', $.proxy(this.addKeywords, this))

            return this.each(function(){
                var $this = $(this),
                    data = $this.data('myplugin');


//                $this.on('click.myplugin', function(){
//                    console.log('Click');
//                });

                $this.bind('click.myplugin', methods.click);

                if(!data) {
                    $(this).data('myplugin', {
                        target : $this
                        //...
                    });
                }
            });
        },
        destroy : function() {
            return this.each(function(){
                var $this = $(this);

                $this.unbind('.myplugin');
                $this.removeData('myplugin');
            });
        },
        click : function(e) {
            console.log(e);
            console.log('Click');
        }
    }

    // Plugin definition.
    $.fn.myPlugin = function(method) {
        if(methods[method]) {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof method === 'object' || !method) {
            return methods.init.apply(this, arguments);
        } else {
            $.error('Метод с именем ' +  method + ' не существует для jQuery.myPlugin');
        }
    };

    // Plugin defaults – added as a property on our plugin function because we need to be able change them globally
    // $.fn.myPlugin.defaults.var1 = 'New default value';
    $.fn.myPlugin.defaults = {
        'var1' : 'Default value'
    }

})(jQuery);

/**
 * Simple plugin
 */
(function($){
    // Plugin definition.
    $.fn.hilight = function(options) {

        // Extend our default options with those provided.
        // Note that the first argument to extend is an empty
        // object – this is to keep from overriding our "defaults" object.
        var opts = $.extend({}, $.fn.hilight.defaults, options);

        // Our plugin implementation code goes here.
        // Iterate and reformat each matched element.
        return this.each(function() {
            var $this = $(this);
            var markup = $this.html();
            // Call our format function.
            markup = $.fn.hilight.format(markup);
            $this.html(markup);
            opts.onInit.call(this);
        });
    };

    // Define our format function.
    $.fn.hilight.format = function(txt) {
        return "<strong>" + txt + "</strong>";
    };

    // Plugin defaults – added as a property on our plugin function.
    $.fn.hilight.defaults = {
        foreground: "red",
        background: "yellow",
        // Callback. We define an empty anonymous function so that
        // we don't need to check its existence before calling it.
        onInit : function() {}
    };

})(jQuery);


$(document).ready(function() {
    $('div').myPlugin();
    //$('div').myPlugin('destroy');

    // Override plugin default foreground color.
//    $.fn.hilight.defaults.foreground = 'blue';
//
//    // Invoke plugin using new defaults.
//    $('div').hilight();
//
//    // Override default by passing options to plugin method.
//    $('green').hilight({
//        foreground: 'green'
//    });
});