<?php
abstract class Component {
    abstract public function Operation();
}

class ConcreteComponent extends Component {
    public function Operation() {
        return 'I am component';
    }
}

abstract class Decorator extends Component {
    protected $_component = null;

    public function __construct(Component $component) {
        $this->_component = $component;
    }

    protected function getComponent() {
        return $this->_component;
    }

    public function Operation() {
        return $this->getComponent()->Operation();
    }
}

class ConcreteDecoratorA extends Decorator {
    public function Operation() {
        return '<A>' . parent::Operation() . '</A>';
    }
}

class ConcreteDecoratorB extends Decorator {
    public function Operation() {
        return '<B>' . parent::Operation() . '</B>';
    }
}

// Example
$Element = new ConcreteComponent();
$ExtendedElement = new ConcreteDecoratorA($Element);
$SuperExtendedElement = new ConcreteDecoratorB($ExtendedElement);

print $SuperExtendedElement -> Operation(); // <B><A>I am component</A></B>