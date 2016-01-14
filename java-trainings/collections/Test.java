package collections;

import java.util.*;

class User implements Comparable<User>{
    int age;
    String name;

    User(int age, String name) {
        this.age = age;
        this.name = name;
    }

    @Override
    public int compareTo(User that) {
        return this.age - that.age;
    }

    @Override
    public String toString() {
        return "User{age=" + age + ", name='" + name + "'}";
    }
}

public class Test {
    public static void main(String[] args) {
        Set<User> set = new TreeSet<User>();
        set.add(new User(27, "Ivan"));
        set.add(new User(20, "Vasia"));
        set.add(new User(10, "Mike"));
        System.out.println(set);
    }
}
