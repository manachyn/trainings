/**
 * Инициализации приложения
 * Настройка шаблона по умолчанию, обработчиков событий и рутера
 */
App = Ember.Application.create();

/**
 * Задаем карту роутеров
 * Роутер использует URL, для того чтобы зупустить нужный роутер
 */
App.Router.map(function() {

    // Определяем путь для index роутера(делать не обязательно, так как index роутер срабатывает по умолчанию)
    //this.resource( 'index', { path: '/' } );

    this.resource('news', { path: '/' } );
});


/**
 * INDEX PAGE
 */

/**
 * Настройка роутера index
 */
App.IndexRoute = Ember.Route.extend({
    model: function() {
        return ['red', 'yellow', 'blue'];
    }
    // Эквивалентно (в шаблоне можено использовать model и content равнозначно)
//    setupController: function(controller) {
//        controller.set('content', ['red', 'yellow', 'blue']);// Здесь массив это model
//    }
});


/**
 * В контроллерах можно определять статические данные,
 * которые будут доступны на протяжении всего цикла жизни приложения.
 * Создание нового контроллера для маршрута и шаблона index
 */
App.IndexController = Ember.ObjectController.extend({
    headerName: 'Home page',
    appVersion:  2.1
});


/**
 * NEWS PAGE
 */

/**
 * Настройка роутера news
 */
App.NewsRoute = Ember.Route.extend({
    model: function() {
        return App.News.all();
    }
});


/**
 * Модели - это объекты, представляющие из себя источник данных для вашего приложения.
 * Модели могут быть в виде массива, или динамического ответа от стороннего сервера в формате JSON
 */
App.News = Ember.Object.extend();

App.News.reopenClass({
    all: function() {
        return $.getJSON("http://api.ihackernews.com/page?format=jsonp&callback=?").then(function(response) {
            var items = [];
            response.items.forEach( function (item) {
                items.push(App.News.create(item) );
            });
            return items;
        });

    }
});

App.NewsController = Ember.ObjectController.extend({
    headerName: 'News page',
    appVersion:  2.1,
    logoUrl: 'img/news.png'
});
