var inherit = (function () {

    var F = function () {};
    return function (C, P) {
        F.prototype = P.prototype;
        /* C.prototype = new F(); // Если до этого в прототипе наследника уже были какие-то свойства
        (т.е прототип наследника был переопределен до вызова функции inherit) - они затрутся */

        // Переносим определенные свойства прототипа наследника в объект, который будет новым прототипом наследника
        var f = new F();
        for (var prop in C.prototype) f[prop] = C.prototype[prop];
        C.prototype = f;

        C.superclass = P.prototype;
        C.prototype.constructor = C;

        // После вызова функции inherit прототип наследника уже нельзя переопределять
        // (Child.prototype = {newProp : 'newPropValue'}), так как потеряются свойства унаследованые с прототипа родителя.
        // Новые свойства нужно подмешивать в прототип Child.prototype.newProp = newPropValue или использовать функцию extend(mixin)
    }
}());

// копирует все свойства из src в dst,
// включая те, что в цепочке прототипов src до Object
function mixin(dst, src){
    // tobj - вспомогательный объект для фильтрации свойств,
    // которые есть у объекта Object и его прототипа
    var tobj = {}
    for(var x in src){
        // копируем в dst свойства src, кроме тех, которые унаследованы от Object
        if((typeof tobj[x] == "undefined") || (tobj[x] != src[x])){
            dst[x] = src[x];
        }
    }
    // В IE пользовательский метод toString отсутствует в for..in
    if(document.all && !document.isOpera){
        var p = src.toString;
        if(typeof p == "function" && p != dst.toString && p != tobj.toString &&
            p != "\nfunction toString() {\n    [native code]\n}\n"){
            dst.toString = src.toString;
        }
    }
}

function Parent(name) {
    this.name = name || 'Adam';
}

Parent.prototype = {
    prototypeProp : 'parentPrototypeVal',
    say : function () {
        console.log('My name is ' + this.name);
    }
}

function Child(name) {
    Child.superclass.constructor.apply(this, arguments); // или Parent.apply(this, arguments);
    // но не this.superclass.constructor... так как может возникнуть рекурсия при наследовании в несколько уровней
    /*
         function foo() {}
         foo.prototype.identify = function() {
            return "I'm a foo";
         }

         function bar() {}
         extend(bar, foo)
         bar.prototype.identify = function() {
            return "I'm a bar and " +
            this.constructor.superclass.identify.apply(this, arguments);
         }

         function zot() {}
         extend(zot, bar)
         zot.prototype.identify = function() {
            return "I'm a zot and " +
            this.constructor.superclass.identify.apply(this, arguments);
         }

         f = new foo();

         alert(f.identify()); // "I'm a foo"

         b = new bar();

         alert(b.identify()); // "I'm a bar and I'm a foo"

         z = new zot();

         alert(z.identify()); // stack overflow

        Последний вызов приведет к ошибке "too much recursion", т.к zot.identify() вызывает метод identify из родителя(bar),
        но в этом методе в родителе используется ссылка this (this.constructor.superclass.identify.apply(this, arguments)),
        которая в этом методе указывает не на текущий объект bar(родитель), а объект с которого идет вызов(zot).
        В результате bar.identity вызывает сама себя в бесконечной рекурсии.
     */
    this.surname = 'Manachyn';
}

Child.prototype = {
    prototypeProp : 'childPrototypeVal',
    sayHello : function () {
        console.log('Hello from ' + this.name + ' ' + this.surname);
    },
    'constructor' : Child
};

inherit(Child, Parent);



var parent = new Parent();
var child = new Child('Ivan');
parent.say();
child.say();
child.sayHello();


// Extend like backbone

// Extend a given object with all the properties in passed-in object(s).
_extend = function(obj) {
    var sources = Array.prototype.slice.call(arguments, 1);
    for (var i = 0; i < sources.length; ++i) {
        for (var prop in sources[i]) {
            obj[prop] = sources[i][prop];
        }
    }
    return obj;
};


var extend = function(protoProps, staticProps) {
    var parent = this; // Функция-конструктор родителя
    var child; // Должны получить функцию-конструктор для наследника

    // The constructor function for the new subclass is either defined by you
    // (the "constructor" property in your `extend` definition), or defaulted
    // by us to simply call the parent's constructor.
    // Функцию-конструктор для наследника берем либо со свойства constructor, либо создаем новую функцию, которая в себе
    // вызывает функцию-конструктор родителя
    if (protoProps && Object.prototype.hasOwnProperty.call(protoProps, 'constructor')) {
        child = protoProps.constructor;
    } else {
        child = function(){ return parent.apply(this, arguments); };
    }

    // Add static properties to the constructor function, if supplied.
    // Добавляем статические свойства с аргумента(staticProps) и функции-конструктора родителя(parent) в
    // функцию-конструктор наследника
    _extend(child, parent, staticProps);

//    child_obj = new child();
//    console.log(child_obj.staticProperty); // Doesn't work
//    console.log(child.staticProperty); // Work


    // Set the prototype chain to inherit from `parent`, without calling
    // `parent`'s constructor function.
    // Создаем объект в трототип которого прописываем прототип родителя. Сохраняем этот объект в свойство prototype
    // новой функции-конструктора наследника. При этом сохраняется цепочка прототипов.
    var F = function(){ this.constructor = child; };
    F.prototype = parent.prototype;
    child.prototype = new F;

    // Add prototype properties (instance properties) to the subclass,
    // if supplied.
    // Добавляем свойства к прототипу
    if (protoProps) _extend(child.prototype, protoProps);

    // Set a convenience property in case the parent's prototype is needed
    // later.
    // Сохраняем ссылку на прототип родителя
    child.superclass = parent.prototype;

    //
    //child.prototype.constructor = child; // Не нужно так как устанавливается через this.constructor = child;

    // Возвращаем функцию-конструктор для наследника
    return child;
};

var BParent = function() {
    this.name = 'Adam';
    //this.initialize.apply(this, arguments);
};

BParent.parentStaticProperty = 'parentStaticValue';

// Добавляем функцию как статический метод к функции-конструктору
BParent.extend = extend;

var BChild = BParent.extend({

    // New constructor
//    constructor: function() {
//        this.name = 'Ivan';
//    },

//    // Default constructor
//    constructor: function() {
//        return parent.apply(this, arguments);
//    },

    initialize: function() {
        console.log('initialize');
    }
},
{
    childStaticProperty: 'childStaticValue'
});

var bchild = new BChild();
console.log(bchild);
console.log(bchild.hasOwnProperty('constructor')); // false
console.log(bchild.__proto__.hasOwnProperty('constructor')); // true - Конструктор в прототипе

