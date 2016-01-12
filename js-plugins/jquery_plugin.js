/**
 * Сравнение реализаций функции через jQuery и jQuery.fn
 */

sayHello = function() {
    console.log(this); // Window
}

/*
 Если задать функцию через jQuery, то к ней можно обратиться только через глобальный объект jQuery.
 В таком случае контекст функции будет указывать на глобальный объект window.
 */
jQuery.sayHello = function() {
    console.log(this); // function
};

//jQuery('div').sayHello(); // Not work

jQuery.sayHello2 = function(elem) {
    console.log(elem); // jQuery object
};

/*
 Если задать функцию через jQuery.fn (или $.fn), то она будет работать с элементами найденными через функцию jQuery() (или $()).
 Контекст этой функции будет содержать выбранные элементы;
 jQuery.fn = jQuery.prototype
 */
jQuery.fn.sayHello = function() {
    console.log(this); // jQuery object
};

// Вызовы
//sayHello();
//jQuery.sayHello();
//jQuery.sayHello2(jQuery('div'));
//jQuery('div').sayHello();


/*
 Вывод:
 Если нужно применить функцию к выбранными объектами (коллекции jQuery), то нужно ее оформлять как плагин через jQuery.fn.
 Если нам неважно какие элементы страницы были выбраны, то лучше создавать функцию через jQuery.
 */


/**
 * jQuery плагин
 */

/*
 JQuery плагин - это просто новый метод, который мы используем, чтобы расширить прототип JQuery объекта.
 Расширяя прототип объекта, мы даем возможнось всем JQuery объектам унаследовать методы, которые мы добавляем.
 При обращении JQuery() создается новый JQuery объект, со всеми методами, которые унаследовала JQuery.
 Идея плагина - сделать что-то с коллекцией элементов.
 */

(function($) {
    // $('div') - возвращает jQuery объект() - коллекцию найденных элементов DOM в соответствии селектору,
    // или созданный элемент, если параметр строка, напр $('<div>').
    // Этот объект может использовать все методы, которые он получил от своего прототипа $.fn
    console.log($());
    console.log($.fn);
    //$('div').css('color', 'red');


    // First
    $(document).ready(function() {});
    // Second (equivalent first)
    $(function() {}); // shortcut for the first

    // All three of the following syntaxes are equivalent:
    $(document).ready(handler)
    $().ready(handler) // this is not recommended
    $(handler)


})(jQuery);


