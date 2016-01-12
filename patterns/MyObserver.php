<?php

namespace patterns\Observer;

/*
 * Интерфейс Observer(наблюдатель), с помощью которого наблюдатель получает оповещение.
 * Этот интерфейс должен реализовать каждый конкретный наблюдатель.
 */
interface Observer {
    public function update(Observable $observable_in);
}

/*
 * Observable (наблюдаемый)
 * Интерфейс определяющий методы для добавления, удаления и оповещения наблюдателей.
 */
interface Observable {
    public function attach(Observer $observer_in);
    public function detach(Observer $observer_in);
    public function notify();
}

/*
 * ConcreteObserver(конкрентый наблюдатель) — конкретный класс, который реализует интерфейс Observer.
 * Реализует метод через который получает оповещения
 * (как параметр передается измененный объект)
 */
class ConcreteObserver implements Observer {
    public function __construct() {
    }
    public function update(Observable $observable_in) {
        echo  "Received update!\n";
        var_dump($observable_in->getState());
    }
}

/*
 * ConcreteObservable - конкретный класс, который реализует интерфейс Observable.
 */
class ConcreteObservable implements Observable {
    private $state = NULL;
    private $observers = array();
    function __construct() {
    }
    function attach(Observer $observer_in) {
        //could also use array_push($this->observers, $observer_in);
        $this->observers[] = $observer_in;
    }
    function detach(Observer $observer_in) {
        //$key = array_search($observer_in, $this->observers);
        //or
        //$this->observers = array_diff($this->observers, array($observer_in));
        //or
        foreach($this->observers as $okey => $oval) {
            if ($oval == $observer_in) {
                unset($this->observers[$okey]);
            }
        }
    }
    function notify() {
        foreach($this->observers as $obs) {
            $obs->update($this);
        }
    }

    function updateState($newState) {
        $this->state = $newState;
        $this->notify();
    }
    function getState() {
        return $this->state;
    }
}


$observable = new ConcreteObservable();
$observer = new ConcreteObserver();
$observable->attach($observer);
$observable->updateState('state1');
$observable->updateState('state2');
$observable->detach($observer);
$observable->updateState('state3');