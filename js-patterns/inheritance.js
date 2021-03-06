// Шаблон 1 - Наиболее часто используемый базовый способ заключается в том, чтобы создать объект с помощью конструктора
// Parent() и присвоить этот объект свойству prototype конструктора Child()
function inherit(C, P) {
    C.prototype = new P();
}

// родительский конструктор
function Parent(name) {
    this.name = name || 'Adam';
}
// добавление дополнительной функциональности в прототип
Parent.prototype.say = function () {
    return this.name;
};
// пустой дочерний конструктор
function Child(name) {}

// здесь происходит магия наследования
inherit(Child, Parent);

var kid = new Child();
console.log(kid); // 'Adam'

// Недостатки
// - Дочерние объекты наследуют не только свойства прототипа родительского объекта, но и собственные свойства,
// добавленные к нему. В большинстве случаев наследовать собственные свойства нежелательно, потому что чаще всего они
// характерны для конкретного экземпляра и не могут повторно использоваться дочерними объектами.
// Главное правило при использовании конструкторов – повторно используемые члены должны добавляться в прототип.
// - Использование универсальной функции inherit() не позволяет передать параметры, полученные при вызове дочерним
// конструктором, от дочернего конструктора родительскому.
var s = new Child('Seth');
s.say(); // 'Adam'


// Шаблон 2 - Заимствование конструктора
// - Наследуются только свойства, добавляемые внутри родительского конструктора. Но свойства, добавленные в прототип,
// не наследуются.
// - Дочерние объекты получают копии унаследованных членов, в отличие от класси ческого шаблона No1, где они получают
// только ссылки.

function Child(a, c, b, d) {
    Parent.apply(this, arguments);
}


// родительский конструктор
function Article() {
    this.tags = ['js', 'css'];
}
var article = new Article();
// Объект сообщения в блоге наследует свойства объекта article через классический шаблон No1
function BlogPost() {}
BlogPost.prototype = article;
var blog = new BlogPost();


// Статическая страница наследует свойства объекта article через шаблон заимствования конструктора
function StaticPage() {
    // Объект page получает собственное свойство tags, копию родительского члена tags (а не ссылку на него).
    Article.call(this);
}
var page = new StaticPage();
console.log(article.hasOwnProperty('tags')); // true
console.log(blog.hasOwnProperty('tags')); // false
console.log(page.hasOwnProperty('tags')); // true


// родительский конструктор
function Parent(name) {
    this.name = name || 'Adam';
}
// добавление дополнительной функциональности в прототип
Parent.prototype.say = function () {
    return this.name;
};
// дочерний конструктор
function Child(name) {
    Parent.apply(this, arguments);
}
var kid = new Child('Patrick');
kid.name; // 'Patrick'
typeof kid.say; // 'undefined'

// Недостатки
// - Не наследуются свойства прототипа, тогда как прототип является местом, куда следует добавлять совместно используемые
// методы и свойства, которые не должны создаваться отдельно для каждого экземпляра.
// Преимущества
// - Дочерние объекты получают настоящие копии собственных свойств родительских объектов, благодаря чему исключается риск
// случайного изменения значения родительского свойства.

// Шаблон 3 - Заимствование и установка прототипа
// Необходимо сначала заимствовать конструктор, а затем сохранить в свойстве prototype дочернего объекта ссылку на
// новый экземпляр конструктора

// Преимущества
// Дочерний объект получает копии собственных членов родительского объекта и ссылку на функциональные возможности
// родительского объекта (реализованные в  виде членов прототипа). Дочерний объект также может передавать любые аргументы
// родительскому конструктору.

// Недостатки
// - Необходимо дважды вызывать родительский конструктор, что снижает эффективность. В результате этого собственные свойства
// (такие как name в данном случае) наследуются дважды.

// родительский конструктор
function Parent(name) {
    this.name = name || 'Adam';
}
// добавление дополнительной функциональности в прототип
Parent.prototype.say = function () {
    return this.name;
};
// дочерний конструктор
function Child(name) {
    Parent.apply(this, arguments);
}
Child.prototype = new Parent();
var kid = new Child('Patrick');
kid.name; // 'Patrick'
kid.say(); // 'Patrick'
delete kid.name;
kid.say(); // 'Adam'

// Шаблон 4 - Совместное использование прототипа
// Доступ к повторно используемым членам обеспечивается прототипом, а не ссылкой this. То есть все, что должно
// наследоваться дочерними объектами, должно находиться в родительском прототипе. В этом случае достаточно просто
// присвоить родительский прототип дочернему прототипу
function inherit(C, P) {
    C.prototype = P.prototype;
}

// Преимущества
// - Образуется короткая цепочка прототипов, обеспечивающая высокую скорость поиска, так как все объекты фактически будут
// совместно использовать один и тот же прототип.
// Недостатки
// - В случае, если один из дочерних объектов, находящихся где-то в цепочке наследования, изменит прототип, это скажется
// на всех его родительских объектах, расположенных выше в цепочке наследования.

// Шаблон 5 - Временный конструктор
function inherit(C, P) {
    var F = function () {};
    F.prototype = P.prototype;
    C.prototype = new F();
}

// Поведение этого шаблона несколько отличается от поведения шаблона 1, потому что здесь потомок наследует только
// свойства прототипа
// Поведение этого шаб­ она несколько отличается от поведения шаб­ она
// Обычно это наиболее предпочтительное поведение, потому что прототип является местом сосредоточения повторно
// используемой функциональности. Все члены, добавляемые родительским конструктором, не наследуются потомками.
inherit(Child, Parent);
var kid = new Child();
// Если вы попытаетесь обратиться к свойству kid.name, то получите значение undefined. В данном примере свойство name
// является собственным свойством родительского объекта, а так как при такой организации наследования конструктор
// new Parent() не вызывается, это свойство не создается. При попытке вызвать метод kid.say() он не будет найден в
// объекте kid, и поиск будет продолжен в цепочке прототипов.

// Сохранение суперкласса
// Можно добавить ссылку на оригинального предка.
function inherit(C, P) {
    var F = function () {};
    F.prototype = P.prototype;
    C.prototype = new F();
    C.__super__ = P.prototype;
}

// Установка указателя на конструктор
// Установка указателя на функцию-конструктор, который может понадобиться в будущем.
// Если не переустановить указатель на конструктор, все дочерние объекты будут полагать, что их конструктором является
// Parent(), который не особо полезен. То есть, используя предыдущую реализацию функции inherit(), можно наблюдать
// следующее поведение объектов:

function Parent() {}
function Child() {}
inherit(Child, Parent);
// проверка
var kid = new Child();
kid.constructor.name; // 'Parent'
kid.constructor === Parent; // true
// Свойство constructor редко используется на практике, но оно может пригодиться для проведения интроспекции объектов
// во время выполнения. В это свойство можно записать ссылку на желаемый конструктор, не оказывая влияния на
// функциональные возможности, потому что это свойство используется исключительно для информирования.

function inherit(C, P) {
    var F = function () {};
    F.prototype = P.prototype;
    C.prototype = new F();
    C.__super__ = P.prototype;
    C.prototype.constructor = C;
}

// Усовершенствование
// Избавиться от необходимости создавать временный (промежуточный) конструктор всякий раз, когда потребуется организовать
// наследование. Вполне достаточно создать его однажды и  просто изменять его свойство prototype. Для этой цели можно
// использовать немедленно вызываемую функцию и  сохранять промежуточную функцию в замыкании.
var inherit = (function () {
    var F = function () {};
    return function (C, P) {
        F.prototype = P.prototype;
        C.prototype = new F();
        C.__super__ = P.prototype;
        C.prototype.constructor = C;
    }
}());


function Parent(name) {
    this.name = name || 'Adam';
}
Parent.prototype.say = function () {
    return this.name;
};
function Child(name) {
    //Parent.apply(this, arguments);
}
inherit(Child, Parent);
// проверка
var kid = new Child('Ivan');
console.log(kid.name);






























