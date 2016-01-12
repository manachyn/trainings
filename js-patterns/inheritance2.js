// Универсальная функция наследования
Function.prototype.inheritsFrom = function(superClass) {
    var Inheritance = function(){};
    Inheritance.prototype = superClass.prototype;

    this.prototype = new Inheritance();
    this.prototype.constructor = this;
    this.superClass = superClass;
}

// функция-конструктор класса
var Class = function(){}

// описание свойств и методов класса
Class.prototype.method = function(){};

// функция-конструктор подкласса
var ClassSub = function(){
    ClassSub.superClass.apply(this, arguments);
}
// определение наследования
ClassSub.inheritsFrom(Class); // sic!

// описание свойств и методов подкласса
ClassSub.prototype.method = function(){
    //Если нам теперь захочется в подклассе поменять наш метод не целиком, а только расширить его, мы можем легко сделать это так:
    ClassSub.superClass.prototype.method.apply(this, arguments);
}
