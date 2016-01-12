package interfaces;

/**
 * Created by IntelliJ IDEA.
 * User: Vanik
 * Date: 04.03.12
 * Time: 14:13
 * To change this template use File | Settings | File Templates.
 */
public class Hero extends ActionCharacter implements CanFight, CanFly, CanSwim{

    @Override
    public void fly() {
        System.out.println("Fly");
    }

    @Override
    public void swim() {
        System.out.println("Swim");
    }
}
