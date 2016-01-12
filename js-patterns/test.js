function MyObj(i) {
    var privateCounter = "I am the instantiated object " + i + " .";
    this.publicCounter = 'Public';
    this.counter = function() {
        return privateCounter;
    };
}

MyObj.prototype.setX = function(x) {
    this.x = x;
}

//var MyObjList = [],
//    ObjLitList = [];
//for (var i = 0; i < 10; i++) {
//    MyObjList.push(new MyObj(i));
//    ObjLitList.push({counter: "I am the literal object number " + i + "."});
//}
//
//console.log(MyObjList);
//console.log(ObjLitList);

var obj1 = new MyObj(1);
var obj2 = new MyObj(2);
console.log(obj1.privateCounter);
console.log(obj1.publicCounter);
obj1.publicCounter = 'Public2';
obj1.setX('111');
console.log(obj1.x);
console.log(obj2.privateCounter);
console.log(obj2.publicCounter);
console.log(obj2.x);
