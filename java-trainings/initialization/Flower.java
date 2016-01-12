package initialization;
import static ua.be.util.Print.*;
/*
 * Вызов конструктора из конструктора
 * При использовании ключевого слова this со списком аргументов внутри конструктора
 * вызывается конструктор с соответствующим списком аргументов.
 * Вызов конструктора внутри конструктора можно произвести только один раз
 * и опрерация вызова другого конструктора должна быть первой операцией в конструкторе
 */
public class Flower {
  int petalCount = 0;
  String s = "initial value";
  Flower(int petals) {
    petalCount = petals;
    print("Конструктор с параметром int, petalCount= "
      + petalCount);
  }
  Flower(String ss) {
    print("Конструктор с параметром String, s = " + ss);
    s = ss;
  }
  Flower(String s, int petals) {
    this(petals);
//!    this(s); // Can't call two!
    this.s = s; // Another use of "this"
    print("Аргументы String и int");
  }
  Flower() {
    this("Привет", 47);
    print("Конструктор по умолчанию (без аргументов)");
  }
  void printPetalCount() {
//! this(11); // Not inside non-constructor!
    print("petalCount = " + petalCount + " s = "+ s);
  }
  public static void main(String[] args) {
    Flower x = new Flower();
    x.printPetalCount();
  }
} /* Output:
Constructor w/ int arg only, petalCount= 47
String & int args
default constructor (no args)
petalCount = 47 s = hi
*///:~
