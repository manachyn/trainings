<?php

class FlyweightFactory
{
    protected static $_flyweigths = array();

    /**
     * @param string $key
     * @return Flyweight
     */

    public static function getFlyweight($key)
    {
        // key может быть не только строкой, но и любым другим типом,
        // в таком случае необходим иной способ поиска созданных приспособленцев

        if (! isset(self::$_flyweigths[$key])) {
            // здесь могут быть условия, когда создавать обычного приспособленца,
            // а когда возвращать неделимого

            self::$_flyweigths[$key] = new ConcreteFlyweight();
        }

        return self::$_flyweigths[$key];
    }
}

abstract class Flyweight
{
    /**
     * @var mixed внутреннее состояние
     */

    protected $_intrinsicState = null;

    /**
     * @param mixed $extrinsicState
     *  внешнее состояние, передаваемое в приспособленец (контекст)
     */

    public function Operation($extrinsicState)
    {
        //....
    }
}

class ConcreteFlyweight extends Flyweight {}
class UnsharedFlyweight extends Flyweight {}