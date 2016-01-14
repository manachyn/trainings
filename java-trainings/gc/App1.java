package gc;

/**
 * Created by vanik on 02.07.14.
 */
public class App1 {
    public static void main(String[] args) {
        Object[] ref = new Object[1];
        while (true) {
            ref = new Object[]{ref};
        }
    }

}
