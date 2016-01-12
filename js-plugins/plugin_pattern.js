/*!
 * Шаблон простого плагина1
 *   http://habrahabr.ru/sandbox/39442/
 *
 */

(function ($, undefined) {


    "use strict"; // jshint ;_;

    var Cliplog = function (element, options) {
        this.init(element, options)
    }

    Cliplog.prototype = {

    }


    $.fn.cliplog = function (option) {

    }

    $.fn.cliplog.Constructor = Cliplog;

    $.fn.cliplog.defaults = {
    }

}(window.jQuery));