var View = Backbone.View.extend({

    el: '#app',

    className: 'zombie',

    template: _.template('Hello'),

    render: function () {
        this.$el.html(this.template());
        return this;
    },

    events: {
        'click': 'sayHello'
    },

    sayHello: function () {
        console.log('Hello');
    }

});

$(function() {
    $('body').on('click', function(){
        $(this).trigger('click:body');
    });
    var appView = new View();
    appView.render();
    //appView.remove();
});
