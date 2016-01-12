var test = (function () {
    return {
        testProp: 'test'
    };
}());

var obj1 = test;
var obj2 = test;
obj1.testProp = 'test1';
obj2.testProp = 'test2';
console.log(obj1);
console.log(obj2);