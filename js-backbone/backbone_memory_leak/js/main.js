var Model = Backbone.Model.extend({
    defaults: {
        text: 'Zombie'
    }
});

var View = Backbone.View.extend({

    tagName: 'li',

    className: 'zombie',

    template: _.template('<%= text %>'),

    initialize: function (options) {
        _.extend(this, _.pick(options, 'parent'));
//        this.model.on('change', this.render, this); // Event listener on model
//        this.parent.on('close:all', this.close, this); // Event listener on parent

        this.listenTo(this.model, 'change', this.render);
        this.listenTo(this.parent, 'close:all', this.close);

    },

    events: {
        'click': 'close'
    },

    render: function () {

        this.$el.html( this.template( this.model.toJSON() ) );

        return this;

    },

    // После удаления вида из DOM он всеравно остается в памяти, так как он остаются подписаными на изменения модели
    // (модель хранит ссылку на callback функцию вида)
//    close: function () {
//        console.log('Kill: ', this);
//        this.off(); // Unbind all local event bindings
//        this.remove(); // Remove view from DOM
//    }

    // Явно отписываем модели и другие виды от событий, обработчики которых хранятся в виде
//    close: function () {
//
//        //console.log('Kill: ', this);
//
//        this.off(); // Unbind all local event bindings
//        this.model.off( 'change', this.render, this ); // Unbind reference to the model
//        this.parent.off( 'close:all', this.close, this ); // Unbind reference to the parent view
//
//        this.remove(); // Remove view from DOM
//
//        // Не обязательно
//        //delete this.$el; // Delete the jQuery wrapped object variable
//        //delete this.el; // Delete the variable reference to this node
//
//    },


    // Используем вместо on - listenTo (Backbone 0.9.9)
    close: function () {
        console.log('Kill: ', this); // Если вызвать - ссылка на вид останется в каком-то объекте _idToWrappedObject и вид останется в памяти
        // В этом случае можно вызвать 2 последних метода
        // Console logging can cause caching of removed objects in Chrome and thus affect memory leak detection, so don’t forget to clear console before taking heap snapshot.
        // stopListening - вызывается автоматически
        this.remove(); // Remove view from DOM
//        delete this.$el;
//        delete this.el;
    }

});


var AppView = Backbone.View.extend({

    el: '#app',

    events: {

        'click #add': 'addView',
        'click #remove-all': 'closeAll'

    },

    addView: function () {

        var model = new Model();
        var view = new View({
            model: model,
            parent: this // A reference to the parent view
        });

        $('#bin').append(view.render().el);

    },

    closeAll: function () {

        this.trigger('close:all');

    }

});

$(function() {
    var appView = new AppView();
});
