package strings;

public class MyStart {
    public static void main(String[] args) {
        //Строка - последовательность символов типа char

        //Инициализация строк
        //Пустая строка
        String s1 = new String();

        /**
         * Способ 1 - Строка с масива символов
         * String(char chars[], int начальныйИндекс, int числоСимволов);
         */
        char chars2[] = { 'а', 'b', 'с' };
        String s2 = new String(chars2);
        System.out.println(s2);
        //Или
        char chars3[] = { 'a', 'b', 'с', 'd', 'e', 'f' };
        String s3 = new String(chars3, 2, 3);
        System.out.println(s3);

        /**
         * Способ 2 - Эквивалент способу 1
         */
        String s4 = "abc";
        System.out.println(s4);


        /**
         * Слияние строк
         * По определению каждый объект класса String не может изменяться. Нельзя ни вставить новые символы в уже существующую строку, ни поменять в ней одни символы на другие.
         * И добавить одну строку в конец другой тоже нельзя. Поэтому транслятор Java преобразует операции, выглядящие, как модификация объектов String, в операции с родственным классом StringBuffer.
         */
        String s5 = "My name is" + " Ivan.";
        System.out.println(s5);
        // Конструкция выше уже на этапе компиляции в байт коде(можно декомпилировать байт код и посмотреть) заменяется на аналогичную конструкцию
        //String s5 = "My name is Ivan.";

        String s6 = "My name is";
        String s7 = " Ivan.";
        // А конструкция
        String s8 = s6 + s7;
        // В байт коде заменяется на
        //String s8 = new StringBuilder().append(s6).append(s7).toString();
        System.out.println(s8);
        // Т.е нету смысла использовать StringBuilder в коде
        // Еще в последних версиях JVM появился замечательный оптимизационный флаг -XX:+OptimizeStringConcat,
        // который при вызове метода StringBuilder.toString() не будет копировать внутренний массив StringBuilder в новый String,
        // а будет использовать тот же массив, таким образом операция конкатенации будет проходить вообще без копирования массивов.

        // Однако стоить заметить, что в циклах JVM вам может и не заменить операцию "+" на StringBuilder.
        // Вернее она может заменить её на создание нового StringBuilder на каждом шаге цикла, т.е. код
        String s9 = "";
        for (int i = 0; i < 10; i++){
            s9 += i;
        }
        // может быть скомпилирован в
        /*
        String s9 = "";
        for (int i = 0; i < 10; i++){
            s9 = new StringBuilder().append(s9).append(i).toString();
        }
        */
        // Поэтому в циклах лучше делать так
        String s10 = "";
        StringBuilder sbl = new StringBuilder();
        for (int i = 0; i < 10; i++){
            s10 = sbl.append(s10).append(i).toString();
        }
        System.out.println(s10);

        // Возможен еще вариант но,
        // StringBuffer в пятой джаве теперь может работать даже медленнее, так как StringBuffer работает не быстрее чем StringBuilder.
        // Правда, проверка на java6 показала, что время почти не отличается, хотя на 5-й — почти на треть.
        StringBuffer sbf = new StringBuffer();
        sbf.append(s6);
        sbf.append(s7);
        String s12 = sbf.toString();
        // Или оптимизированная версия
        String s13 = new StringBuffer(s6).append(s7).toString();
        System.out.println(s13);

        // Способ с String.concat(String) - существенный прирост в производительности
        String s14 = s6.concat(s7);
        System.out.println(s14);

        /**
         *  Выводы
         *  Выбор метода зависит от количества строк
         *  Для соединения двух строк лучше использовать родной String.concat() при большем количестве — StringBuilder.
         */




    }
}
