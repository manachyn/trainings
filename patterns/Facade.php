<?php

// Various classes we want to shield the Client from.
class Adder {
    public function add($a, $b) {
        return $a + $b;
    }
}

class Subtractor {
    public function subtract($a, $b) {
        return $a - $b;
    }
}

class Multiplier {
    public function multiply($a, $b) {
        return $a * $b;
    }
}

class Divider {
    public function divide($a, $b) {
        if ($b == 0) {
            throw new Exception('Division by zero.');
        }
        return $a / $b;
    }
}

// Client code
$adder = new Adder();
echo '254 + 113 = ', $adder->add(254, 113), "\n";
$divider = new Divider();
echo '256 / 8 = ', $divider->divide(256, 8), "\n";


class CalculatorFacade
{
    public function __construct(Adder $adder, Subtractor $subtractor, Multiplier $multiplier, Divider $divider) {
        $this->_adder = $adder;
        $this->_subtractor = $subtractor;
        $this->_multiplier = $multiplier;
        $this->_divider = $divider;
    }

    public function calculate($expression) {
        list ($a, $operator, $b) = explode(' ', $expression);
        // eliminating switch constructs is not in the intent of this pattern
        switch ($operator) {
            case '+':
                return $this->_adder->add($a, $b);
                break;
            case '-':
                return $this->_subtractor->subtract($a, $b);
                break;
            case '*':
                return $this->_multiplier->multiply($a, $b);
                break;
            case '/':
                return $this->_divider->divide($a, $b);
                break;
        }
    }
}

class CalculatorFactory {
    public function getCalculator() {
        return new CalculatorFacade(new Adder(), new Subtractor(), new Multiplier(), new Divider());
    }
}

// Client code
$calculatorFactory = new CalculatorFactory;
$calculator = $calculatorFactory->getCalculator();
echo '254 + 113 = ', $calculator->calculate('254 + 113'), "\n";
echo '256 / 8 = ', $calculator->calculate('256 / 8'), "\n";
