<?php
class ConcretePrototype {
    protected $x;

    public function __construct($x) {
        $this->x = (int) $x;
    }

    public function printX() {
        echo sprintf('Value: %5d' . PHP_EOL, $this->x);
    }

    public function setX($x) {
        $this->x *= (int) $x;
    }

    public function __clone() {
        /*
         * This method is not required for cloning, although when implemented,
         * PHP will trigger it after the process in order to permit you some
         * change in the cloned object.
         *
         * Reference: http://php.net/manual/en/language.oop5.cloning.php
         */
        // $this->x = 1;
    }
}

/**
 * Client code
 */
$prototype = new ConcretePrototype(1000);

foreach (range(1, 10) as $i) {
    $tempotype = clone $prototype;
    $tempotype->setX($i);
    $tempotype->printX();
}

/*
 **Code output**

Value:  1000
Value:  2000
Value:  3000
Value:  4000
Value:  5000
Value:  6000
Value:  7000
Value:  8000
Value:  9000
Value: 10000
*/