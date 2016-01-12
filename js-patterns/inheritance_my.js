// Speed up calls to hasOwnProperty
var hasOwnProperty = Object.prototype.hasOwnProperty;

// Save bytes in the minified (but not gzipped) version:
var ArrayProto = Array.prototype, ObjProto = Object.prototype, FuncProto = Function.prototype;

// Create quick reference variables for speed access to core prototypes.
var slice            = ArrayProto.slice,
    concat           = ArrayProto.concat,
    unshift          = ArrayProto.unshift,
    toString         = ObjProto.toString,
    hasOwnProperty   = ObjProto.hasOwnProperty;

// Is a given array, string, or object empty?
// An "empty" object has no enumerable own-properties.
isEmpty = function(obj) {
    if (isArray(obj) || isString(obj)) return obj.length === 0;
    for (var key in obj) if (hasOwnProperty.call(obj, key)) return false;
    return true;
};

// Is a given value an array?
// Delegates to ECMA5's native Array.isArray
isArray = Array.isArray || function(obj) {
    return toString.call(obj) == '[object Array]';
};

// Is a given value a string?
isString = function(obj) {
    return toString.call(obj) == '[object String]';
};

copy = function(obj) {
//    var obj2 = {'sdfsad' : 'dsfdsf'};
    var objs = Array.prototype.slice.call(arguments, 1);
    //console.log(objs);
//    //console.log(Array.prototype.forEach)
//    //console.log(objs.forEach);
//    //console.log(objs.length);
//    //console.log(obj2.forEach);
//    if(objs.length === +objs.length){
//        //console.log(objs.length);
//    }
//
    objs.forEach(function(source) {
        if (source) {
            for (var prop in source) {
                //console.log(source[prop]);
                obj[prop] = source[prop];
            }
        }
    });
//
    return obj;
};

isEmpty = function(obj) {
    if (isArray(obj) || isString(obj)) return obj.length === 0;
    for (var key in obj) if (hasOwnProperty.call(obj, key)) return false;
    return true;
};

function extend(parent, child, staticProp){

    var extendedChild;

    // The constructor function for the new subclass is either defined by you
    // (the "constructor" property in your `extend` definition), or defaulted
    // by us to simply call the parent's constructor.
    if(child.prototype && Object.prototype.hasOwnProperty.call(child.prototype, 'constructor')){
        extendedChild = child.prototype.constructor;
    }
    else{
        extendedChild = function(){ return parent.apply(this, Array.prototype.slice.call(arguments, 1)); };
    }

    //copy(extendedChild, parent, staticProps);

    var Surrogate = function(){ this.constructor = extendedChild; };
    Surrogate.prototype = parent.prototype;
    extendedChild.prototype = new Surrogate;

    if (child.prototype) copy(extendedChild.prototype, child.prototype);

    extendedChild.__super__ = parent.prototype;

    //console.log(new extendedChild);

    return extendedChild;
}

var inherit = (function () {
    var F = function () {};
    return function (C, P) {
        F.prototype = P.prototype;
        C.prototype = new F();
        C.__super__ = P.prototype;
        C.prototype.constructor = C;
    }
}());

// родительский конструктор
function Parent(name) {
    this.name = name || 'Adam';
}
// добавление дополнительной функциональности в прототип
Parent.prototype.say = function () {
    console.log(this.name);
};

// пустой дочерний конструктор
function Child(name) {
    this.name = name;
    this.surname = 'manachyn';
}

Child.prototype = {
    constructor : Child,
    prototypeProp : 'prototypeVal'

};

//extend(Parent, Child, {'surname' : 'Manachyn'});
inherit(Child, Parent);
var ivan = new Child('ivan');
console.log(ivan);
ivan.say();
console.log(ivan.surname);
