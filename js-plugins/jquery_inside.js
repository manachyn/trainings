/**
 * Как устроен jQuery
 * http://habrahabr.ru/post/118564/
 */

(function( window, undefined ) {

    var document = window.document,
        navigator = window.navigator,
        location = window.location;

    // [...] Основные исходники тут

    window.jQuery = window.$ = jQuery;

})(window);