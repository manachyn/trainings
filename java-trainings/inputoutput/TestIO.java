package inputoutput;

import java.io.*;

/**
 * Created by IntelliJ IDEA.
 * User: Vanik
 * Date: 08.03.12
 * Time: 20:09
 * To change this template use File | Settings | File Templates.
 */
public class TestIO {
    private static int tmp;

    public static void main(String[] args) throws IOException {
        System.out.println("dfd");
        File f = new File("D:/test.txt");
        System.out.println(f.getAbsolutePath());

        //Входной поток из байтов; Источник -  файл
        InputStream f1 = new FileInputStream("D:/test.txt");

        //или
        InputStream f2 = new FileInputStream(f);

        tmp = f1.read();//Возвращает байт, напр символ "a" - 97(код ASCII), что в двоичном виде 01100001(1 байт)
        while (tmp != -1) {
            System.out.println(tmp);
            tmp = f1.read();
        }
        f1.close();

        //Считывание в масив байт
        int bytesAvailable = f2.available();
        byte[] data = new byte[bytesAvailable];
        f2.read(data);
        for (int i = 0; i < data.length; i++){
            System.out.println((char)data[i]);
        }
        f2.close();

        //Считываем в массив со смещением
        InputStream f3 = new FileInputStream(f);
        bytesAvailable = f3.available();
        data = new byte[bytesAvailable];
        f3.read(data, 2, 3);
        System.out.println("----------");
        for (int i = 0; i < data.length; i++){
            System.out.println((char)data[i]);
        }
        f3.close();

        InputStream f4 = new FileInputStream("D:/test2.txt");
        DataInputStream din = new DataInputStream(f4);
        double ds = din.readDouble();
        System.out.println("ds = " + ds);
        din.close();

    }
}
