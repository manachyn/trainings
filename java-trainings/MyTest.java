/**
 * Created with IntelliJ IDEA.
 * User: Vanik
 * Date: 30.03.13
 * Time: 14:30
 * To change this template use File | Settings | File Templates.
 */
public class MyTest {
    static int mNoTDefined;

    public static void main (String [] args) {

        // Преобразование типов с потерей точности
        int i = 123456789;
        float f = i;
        System.out.println(f);//1.23456792E8

        // Локальные переменные нужно обязательно инициализировать.
        // Переменные класса инициализируются значениями по умолчанию
        int localNotDefined;
        // System.out.print(localNotDefined); //Ошибка
        System.out.println(mNoTDefined); // 0

        // Строки
        String s = "Hello";
        int length = s.length(); // Длина
        int cpCont = s.codePointCount(0, length); //Число кодовых точек
        System.out.println(length);// 5
        System.out.println(cpCont);// 5

        // Сравнение строк
        String s1 = "Hello";
        String s2 = "Hello";
        System.out.println(s1 == s2); // true

        String s3 = new String("Hello");
        String s4 = new String("Hello");
        System.out.println(s3 == s4); // false
        System.out.println(s3.equals(s4)); // true

        String s5 = String.valueOf("Hello");
        String s6 = String.valueOf("Hello");
        System.out.println(s5 == s6); // true

        String s7 = new String("Hello");
        String s8 = String.valueOf("Hello");
        System.out.println(s7 == s8); // false

        String s9 = "Hello";
        String s10 = String.valueOf("Hello");
        System.out.println(s9 == s10); // true

        Integer c = 10;
        Integer c2 = new Integer(10);
        Integer c3 = Integer.valueOf(10);
        System.out.println(c3);

        int [] f2 = new int[5];

    }
}
