<?php
/*
 * http://ru.wikipedia.org/wiki/%D0%9D%D0%B0%D0%B1%D0%BB%D1%8E%D0%B4%D0%B0%D1%82%D0%B5%D0%BB%D1%8C_(%D1%88%D0%B0%D0%B1%D0%BB%D0%BE%D0%BD_%D0%BF%D1%80%D0%BE%D0%B5%D0%BA%D1%82%D0%B8%D1%80%D0%BE%D0%B2%D0%B0%D0%BD%D0%B8%D1%8F)
 */

/*
 * Интерфейс Observer(наблюдатель), с помощью которого наблюдатель получает оповещение.
 * Этот интерфейс должен реализовать каждый конкретный наблюдатель.
 */
interface Observer{
    function notify($obj);
}

/*
 * Observable (наблюдаемый)
 * Интерфейс(в этом примере интерфейс не отделен, а сразу реализован) в ConcreteObservable
 * определяющий методы для добавления, удаления и оповещения наблюдателей.
 */




/*
 * ConcreteObservable - конкретный класс, который реализует интерфейс Observable.
 * (В этом примере наблюдаемый класс реализован как singleton)
 */
class ExchangeRate{
    static private $instance = NULL;
    private $observers = array();
    private $exchange_rate;

    private function __construct(){}
    private function __clone(){}

    static public function getInstance(){
        if(self::$instance == NULL){
            self::$instance = new ExchangeRate();
        }
        return self::$instance;
    }

    public function getExchangeRate(){
        return $this->exchange_rate;
    }

    public function setExchangeRate($new_rate){
        $this->exchange_rate = $new_rate;
        $this->notifyObservers();
    }

    /*
     * Добавление наблюдателей
     */
    public function registerObserver(Observer $obj){
        $this->observers[] = $obj;
    }

    /*
     * Оповещение наблюдателей
     */
    function notifyObservers(){
        foreach($this->observers as $obj){
            $obj->notify($this);
        }
    }
}

/*
 * ConcreteObserver(конкрентый наблюдатель) — конкретный класс, который реализует интерфейс Observer.
 * Реализует метод через который получает оповещения
 * (как параметр передается измененный объект)
 */
class ProductItem implements Observer{

    public function __construct(){
        ExchangeRate::getInstance()->registerObserver($this);
    }

    public function notify($obj){
        if($obj instanceof ExchangeRate) {
            // Update exchange rate data
            print "Received update!\n";
            var_dump($obj);
        }
    }
}

$product1 = new ProductItem();
$product2 = new ProductItem();

ExchangeRate::getInstance()->setExchangeRate(4.5);