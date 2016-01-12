(function(){

    var root = this;
    var MYAPP;
    MYAPP = root.MYAPP = {};
    MYAPP.VERSION = '1.0.0';
    MYAPP.$ = root.jQuery;

    // Retrieve the names of an object's properties.
    // Delegates to **ECMAScript 5**'s native `Object.keys`
    MYAPP.keys = Object.keys || function(obj) {
        if (obj !== Object(obj)) throw new TypeError('Invalid object');
        var keys = [];
        for (var key in obj) if (MYAPP.has(obj, key)) keys.push(key);
        return keys;
    };

    // The cornerstone, an `each` implementation, aka `forEach`.
    // Handles objects with the built-in `forEach`, arrays, and raw objects.
    // Delegates to **ECMAScript 5**'s native `forEach` if available.
    var each = MYAPP.each = MYAPP.forEach = function(obj, iterator, context) {
        if (obj == null) return;
        if (Array.prototype.forEach && obj.forEach === Array.prototype.forEach) {
            obj.forEach(iterator, context);
        } else if (obj.length === +obj.length) {
            for (var i = 0, length = obj.length; i < length; i++) {
                if (iterator.call(context, obj[i], i, obj) === {}) return;
            }
        } else {
            var keys = MYAPP.keys(obj);
            for (var i = 0, length = keys.length; i < length; i++) {
                if (iterator.call(context, obj[keys[i]], keys[i], obj) === {}) return;
            }
        }
    };

    // Extend a given object with all the properties in passed-in object(s).
    MYAPP.extend = function(obj) {
        each(Array.prototype.slice.call(arguments, 1), function(source) {
            if (source) {
                for (var prop in source) {
                    obj[prop] = source[prop];
                }
            }
        });
        return obj;
    };

    // Shortcut function for checking if an object has a given property directly
    // on itself (in other words, not on a prototype).
    MYAPP.has = function(obj, key) {
        return Object.prototype.hasOwnProperty.call(obj, key);
    };

    // Helper function to correctly set up the prototype chain, for subclasses.
    // Similar to `goog.inherits`, but uses a hash of prototype properties and
    // class properties to be extended.
    var extend = function(protoProps, staticProps) {
        var parent = this;
        var child;

        // The constructor function for the new subclass is either defined by you
        // (the "constructor" property in your `extend` definition), or defaulted
        // by us to simply call the parent's constructor.
        if (protoProps && MYAPP.has(protoProps, 'constructor')) {
            child = protoProps.constructor;
        } else {
            child = function(){ return parent.apply(this, arguments); };
        }
        console.log(new child);

        // Add static properties to the constructor function, if supplied.
        MYAPP.extend(child, parent, staticProps);

        // Set the prototype chain to inherit from `parent`, without calling
        // `parent`'s constructor function.
        var Surrogate = function(){ this.constructor = child; };
        Surrogate.prototype = parent.prototype;
        child.prototype = new Surrogate;

        // Add prototype properties (instance properties) to the subclass,
        // if supplied.
        if (protoProps) MYAPP.extend(child.prototype, protoProps);

        // Set a convenience property in case the parent's prototype is needed
        // later.
        child.__super__ = parent.prototype;

        return child;
    };

    MYAPP.Parent = function(name) {
        this.name = name || 'Vasia';
    }

    MYAPP.Parent.prototype.say = function () {
        console.log(this.name);
    };

    MYAPP.Parent.extend = extend;

    MYAPP.Child = MYAPP.Parent.extend({
        'surname' : 'Manachyn'
    });

//    MYAPP.Model = function(attributes, options) {
//        this.initialize.apply(this, arguments);
//    };
//
//    // Attach all inheritable methods to the Model prototype.
//    MYAPP.extend(MYAPP.Model.prototype, {}, {
//        // Initialize is an empty function by default. Override it with your own
//        // initialization logic.
//        initialize: function(){}
//    });
//
//    MYAPP.Model.extend = extend;
//
//    MYAPP.ExModel = MYAPP.Model.extend({'test_opt' : 'test_val'}, {'statp' : 'sss'});

}).call(this);


//var model = new MYAPP.Model();
//console.log(model);
//
//var ex_model = new MYAPP.ExModel();
//console.log(ex_model);


var ivan = new MYAPP.Child();
console.log(ivan.surname);
ivan.say();
