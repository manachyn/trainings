<?php
class Car {
    protected $tire;
    protected $engine;
    public function __construct(Tire $tire, Engine $engine) {
        $this->tire = $tire;
        $this->engine = $engine;
    }
}

class Tire {
    protected $bridgestone;
    public function __construct(Bridgestone $bridgestone) {
        $this->bridgestone = $bridgestone;
    }
}

class Engine {
    protected $turbo;
    public function __construct(Turbo $turbo) {
        $this->turbo = $turbo;
    }
}

class Bridgestone {
    public $tread;
    public function __construct(){
        $this->tread = 'Performance';
    }
}

class Turbo {
    public $stage;
    public function __construct(){
        $this->stage = 2;
    }
}