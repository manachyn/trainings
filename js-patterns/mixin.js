// Backbone like
// Retrieve the names of an object's properties.
// Delegates to **ECMAScript 5**'s native `Object.keys`
_keys = Object.keys || function(obj) {
    if (obj !== Object(obj)) throw new TypeError('Invalid object');
    var keys = [];
    for (var key in obj) if (_has(obj, key)) keys.push(key);
    return keys;
};

// The cornerstone, an `each` implementation, aka `forEach`.
// Handles objects with the built-in `forEach`, arrays, and raw objects.
// Delegates to **ECMAScript 5**'s native `forEach` if available.
var each = _each = _forEach = function(obj, iterator, context) {
    console.log(typeof  obj);
    if (obj == null) return;
    if (Array.prototype.forEach && obj.forEach === Array.prototype.forEach) {
        obj.forEach(iterator, context);
    } else if (obj.length === +obj.length) {
        for (var i = 0, length = obj.length; i < length; i++) {
            if (iterator.call(context, obj[i], i, obj) === {}) return;
        }
    } else {
        var keys = _keys(obj);
        for (var i = 0, length = keys.length; i < length; i++) {
            if (iterator.call(context, obj[keys[i]], keys[i], obj) === {}) return;
        }
    }
};

// Shortcut function for checking if an object has a given property directly
// on itself (in other words, not on a prototype).
_has = function(obj, key) {
    return Object.prototype.hasOwnProperty.call(obj, key);
};

// Extend a given object with all the properties in passed-in object(s).
_extend = function(obj) {
    each(Array.prototype.slice.call(arguments, 1), function(source) {
        if (source) {
            for (var prop in source) {
                obj[prop] = source[prop];
            }
        }
    });
    return obj;
};

var test_obj = {a: 'a', b: 'b'}
console.log(_extend(test_obj, {a: 'A', c: 'C'}));



function extend(object) {
    var mixins = Array.prototype.slice.call(arguments, 1);
    for (var i = 0; i < mixins.length; ++i)
    {
        for (var prop in mixins[i])
        {
            if (typeof object.prototype[prop] === "undefined")
            {
                object.prototype[prop] = mixins[i][prop];
            }
        }
    }
}

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


function extend(destination, source) {
    for (var k in source) {
        if (source.hasOwnProperty(k)) {
            destination[k] = source[k];
        }
    }
    return destination;
}

function extend(target) {
    slice.call(arguments, 1).forEach(function(source) {
        Object.getOwnPropertyNames(source).forEach(function (name) {
            target[name] = source[name]
        })
    })
    return target
}


// build a mixin function to take a target that receives the mixin,
// a source that is the mixin, and a list of methods / attributes to
// copy over to the target

function mixInto(target, source, methodNames){

// ignore the actual args list and build from arguments so we can
// be sure to get all of the method names
    var args = Array.prototype.slice.apply(arguments);
    target = args.shift();
    source = args.shift();
    methodNames = args;

    var method;
    var length = methodNames.length;
    for(var i = 0; i < length; i++){
        method = methodNames[i];

// build a function with a closure around the source
// and forward the method call to the source, passing
// along the method parameters and setting the context
        target[method] = function(){
            var args = Array.prototype.slice(arguments);
            source[method].apply(source, args);
        }

    }

}
