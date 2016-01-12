define(["dep1", "dep2"], function (dep1, dep2) {
    return function () {
        return dep1 + dep2;
    };
});


// UMD - универсальная обертка под все виды модулей
(function (root, factory) {
    if (typeof exports === 'object') {
        // Формат 1: CommonJS
        factory(exports, require('dep1'), require('dep2'));
    } else if (typeof define === 'function' && define.amd) {
        // Формат 2: AMD (анонимный модуль)
        define(['exports', 'dep1', 'dep2'], factory);
    } else {
        // Формат 3: Экспорт в глобалы
        factory(window, root.dep1, root.dep2);
    }
})(this, function (exports, dep1, dep2) {

    // Экспортируем
    exports.moduleName = function () {
        return dep1 + dep2;
    };
});


$(function(){

    // ядро объявлено в пространстве core,
    // которое мы сперва кешируем
    var core = $.core;

    // затем вызовем встроенную функцию,
    // и покрасим все дивы желтым
    core.highlightAll();

    // вызовем функцию плагина ядра,
    // который подгружен в пространство plugin:

    // покрасим бэкграунд первого дива зеленым.
    core.plugin.setGreen("div:first");
    // здесь используется метод ядра 'highlight'
    // из самого плагина

    // красим последний див в цвет свойства 'errorColor',
    // которое определено в ядре
    core.plugin.setRed('div:last');
});

// Ядро модуля
// замечание: обертка вокруг кода ядра позволяет нам работать с разными форматами
// и спецификациями, предоставляя аргументы в требуемом виде.
// код реализации ядра находится ниже обертки, в нем представлены
// примеры организации свойств и экспорта модуля
// Обратите внимание, что зависимости модуля могут быть с лёгкостью объявлены
// при необходимости, и будут работать, как в предыдущих примерах AMD реализаций.

(function ( name, definition ){
    var theModule = definition(),
    // данный подход считается "безопасным":
        hasDefine = typeof define === 'function' && define.amd,
    // hasDefine = typeof define === 'function',
        hasExports = typeof module !== 'undefined' && module.exports;

    if ( hasDefine ){ // модуль AMD
        define(theModule);
    } else if ( hasExports ) { // модуль Node.js
        module.exports = theModule;
    } else { // Объявляем модуль в нашем пространстве, или же в глобальном (window)
        (this.jQuery || this.ender || this.$ || this)[name] = theModule;
    }
})( 'core', function () {
    var module = this;
    module.plugins = [];
    module.highlightColor = "yellow";
    module.errorColor = "red";

    // далее идет реализация логики модуля, и экспорт его API

    // этот метод используется ядровым методом highlightAll()
    // и другими расширениями ядра, раскрашивая наши элементы
    // разными цветами
    module.highlight = function(el,strColor){
        if(this.jQuery){
            jQuery(el).css('background', strColor);
        }
    }
    return {
        highlightAll:function(){
            module.highlight('div', module.highlightColor);
        }
    };

});