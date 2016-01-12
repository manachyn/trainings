package interfaces;

/**
 * Created by IntelliJ IDEA.
 * User: Vanik
 * Date: 04.03.12
 * Time: 14:17
 * To change this template use File | Settings | File Templates.
 */
public class Adventure {
    public static void t(CanFight x){
        x.fight();
    }
    public static void u(CanSwim x){
        x.swim();
    }
    public static void v(CanFly x){
        x.fly();
    }
    public static void w(ActionCharacter x){
        x.fight();
    }
    public static void main(String[] args){
        Hero h = new Hero();
        t(h);
        u(h);
        v(h);
        w(h);

        /**
         * Отсечение лишней функциональности от объекта
         */
        CanFly bird = new Hero();
        bird.fly();
        //bird.fight(); Ошибка
        //bird.swim(); Ошибка
    }


}
