var inherit = (function () {
    var F = function () {};
    return function (C, P) {
        F.prototype = P.prototype;
        C.prototype = new F(); // Но если до этого в прототипе наследника уже были какие-то свойства - они затрутся
        C.__super__ = P.prototype;
        C.prototype.constructor = C;
    }
}());

function Parent(name) {
    this.name = name || 'Adam';
}

//Parent.prototype.say = function () {
//    console.log(this.name);
//};

Parent.prototype = {
    'prototypeProp' : 'parentPrototypeVal',
    say : function () {
        console.log(this.name);
    }
}

function Child(name) {
    Parent.apply(this, arguments);
    //Parent.call(this, name);
    //this.name = name;
    this.surname = 'manachyn';
}

Child.prototype = {
    'prototypeProp' : 'childPrototypeVal',
    'constructor' : Child
};

inherit(Child, Parent);

var ivan = new Child('Ivan');
console.log(ivan);
ivan.say();
console.log(ivan.surname);
console.log(ivan.prototypeProp);


//function inherit_A(Child, Parent)
//{
//    var F = function () { };
//    F.prototype = Parent.prototype;
//
//    Child.prototype = new F();
//    Child.prototype.constructor = Child;
//    Child.super = Parent.prototype;
//}
//
//function inherit_B(Child, Parent)
//{
//    var F = function () { };
//    F.prototype = Parent.prototype;
//    var f = new F();
//
//    for (var prop in Child.prototype) f[prop] = Child.prototype[prop];
//    Child.prototype = f;
//    Child.prototype.super = Parent.prototype;
//}
//
//
//function Man(name) { this.name = name }
//Man.prototype =
//{
//    constructor: Man,
//    THOUGHTS: "wanna beer!",
//    say: function ()
//    {
//        console.log("My name is " + this.name + " and i think:'" + this.THOUGHTS + "'")
//    }
//}
//
//function Gentleman(name, prefered_beverage)
//{
//    Man.call(this, name);
//    this.prefered_beverage = prefered_beverage;
//}
//Gentleman.prototype = { constructor: Gentleman, THOUGHTS: "it's teatime!" }
//inherit_A(Gentleman, Man)
//
//function Programmer(name, prefered_lang)
//{
//    Gentleman.call(this, name, "Cofee");
//    this.prefered_lang = prefered_lang;
//}
//Programmer.prototype =
//{
//    constructor: Programmer,
//    THOUGHTS: "runtime error 138? wanna debug XD!"
//}
//inherit_A(Programmer, Gentleman)
//
//var man = new Man("Jack");
//var gentleman = new Gentleman("John", "Orange pekoe");
//var programmer = new Programmer("James", "C++");
//
//man.say();
//gentleman.say();
//programmer.say();