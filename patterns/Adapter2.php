<?php
// Целевой интерфейс, клиент умеет работать только с ним
interface iTarget {
    public function query();
}

// Адаптируемый интерфейс. Клиент с ним не умеет работать, но очень хочет
interface iAdaptee {
    public function request();
}


// Класс, реализующий адаптирумым интерфейс
class Adaptee implements iAdaptee {
    public function request() {
        return __CLASS__ . "::" . __METHOD__;
    }
}

class Adapter implements iTarget {
    protected
        $adaptee = null;

    public function __construct() {
        $this -> adaptee = new Adaptee();
    }

    public function query() {
        return $this -> adaptee->request();
    }
}

$Target = new Adapter();
print $Target->query(); // "Adaptee::request"