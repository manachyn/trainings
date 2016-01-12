// Цепочка прототипов

// Свойство __proto__ или в спецификации [[prototype]] - ссылка одного объекта на другой, который называется его прототипом

// При обращении к любому свойству объекта, оно в первую очередь ищется в самом объекте. Но если его там нет, поиск
// происходит в свойстве __proto__. Если его нет и там, оно ищется дальше по цепочке:
// obj.__proto__.__proto__ - цепочка прототипов (prototype chain).

// Прототипы обектов разных типов
// (0).__proto__ === Number.prototype
// false.__proto__ === Boolean.prototype
// "string".__proto__ === String.prototype
// (new Date).__proto__ === Date.prototype
// (function(){}/* new Function */).__proto__ === Function.prototype (Любая функция это тоже объект)

// Все типы данных наследуются от Object:
// Number.prototype.__proto__ === Object.prototype

// И наконец, завершение цепочки:
// Object.prototype.__proto__ === null


// Свойство prototype - обычное свойство любой функции(объекта-функции).
// Оно по умолчанию является объектом с единственным свойством constructor, которое ссылается на саму функцию.
// Свойство prototype используется при создании новых объектов оператором new.

function myFunc() {

}

myFunc.prototype = {

};

obj = new myFunc();

// Вызов new делает

// 1) Создает пустой объект:
// var obj = {};

// 2) Устанавливает __proto__ этому объекту ссылкой на prototype функции-конструктора:
// obj.__proto__ = myFunc.prototype;

// 3) Применяет функцию-конструктор к нашему новосозданному объекту:
// (т.е. исполняет функцию FnClass, передавая ей instance в качестве this и аргументы в виде массива arguments)
// constructorReturns = myFunc.apply(obj, arguments);

// 4) Возвращает экземпляр функции-класса, но если myFunc нам вернул обьект, тогда его:
// return constructorReturns instanceof Object ? constructorReturns : obj;

//http://habrahabr.ru/post/140810/

/* ================================================================================================================== */

// Разбор функции наследования
function extend(Child, Parent) {
    var F = function() { } //(1)
    F.prototype = Parent.prototype //(2)
    Child.prototype = new F() //(3)
    Child.prototype.constructor = Child //(4)
    Child.superclass = Parent.prototype //(5)
}

// Разница свойств __proto__ и prototype.
// __proto__ - свойство любого объекта, в котором хранится ссылка на его прототип(другой объект)
// prototype - свойство только обектов-функций (функций конструкторов). Содержит объект. При создании нового объекта через
// эту функцию-конструктор ссылка на объект из свойтва prototype функции прописывается в свойство __proto__ нового объекта.

// 1) Создание функции-конструктора - объект типа Function
// В этот момент в свойтво __proto__ объекта F заносится знечение свойства prototype функции-конструктора этого объекта
// F.__proto__ = Function.prototype
// F - это новая функция конструктор, которая как и все фунции имеет свойство prototype. В этой функции(объекте) это
// свойсво равно пустому объекту с одним свойством constructor которое указывает на саму функцию
// F.prototype = new Object();
var F = function() {}; // Эквивалентно F = new Function()

// Теперь мы можем создавать объекты с пом. этой функции
// obj.__proto__ = F.prototype
var obj = new F();


// 2) Меняем свойство prototype функции-конструктора F (изначально оно равно new Object). Старый new Object() перестал
// быть доступен - ни одна ссылка на него не ведет. Поэтому сборщик мусора убивает его.
F.prototype = Parent.prototype

// 3) Создаем объект с помощью новой функции. В прототип этого объекта попадает объект из функуции-конструктора
// (new F).__proto__ = (т.к F.prototype==Parent.prototype) = Parent.prototype
// Потом этот объект устанавливается значением свойства prototype функции-конструктора Child (наследника)
// т.е получится такая цепочка присвоения
// Child.prototype = (new F)
// Child.prototype.__proto__ = (new F).__proto__ = Parent.prototype
// Иначе говоря, у нас получилось, что
// Child.prototype = [объект,  прототип которого - Parent.prototype]
Child.prototype = new F();

// Собственно, наследование уже работает.
child = new Child(); // В этот момент child.__proto__ = Child.prototype.

// Поиск свойств, не найденных в child будет идти по
// child.__proto__ = Child.prototype = new F().
// Если там не нашли, то интерпретатор будет искать в new F().__proto__ = F.prototype = Parent.prototype, то есть, в конечном счете:
// child -> Child.prototype -> Parent.prototype

// 4) Свойство Child.prototype.constructor осталось старое (F.prototype.constructor = Parent.prototype.constructor = Parent),
// и его нужно поправить строкой:
Child.prototype.constructor = Child

// 5) Добавим в класс явную ссылку на родительский класс для удобного обращения к его методам.
// Понадобится для вызова конструктора родителя или если родительский метод был перекрыт в потомке.
Child.superclass = Parent.prototype;



// Свойство constructor
//function Rabbit() {
//    //this.constructor = Rabbit;
//}
//
//Rabbit.prototype = { jumps: true } ;
//
//var rabbit = new Rabbit();
//
//console.log(rabbit.hasOwnProperty('constructor'));
//console.log(Rabbit.prototype.hasOwnProperty('constructor'));
//
//console.log(rabbit.constructor == Rabbit);



