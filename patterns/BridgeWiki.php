<?php
/**
 * http://ru.wikipedia.org/wiki/%D0%9C%D0%BE%D1%81%D1%82_%28%D1%88%D0%B0%D0%B1%D0%BB%D0%BE%D0%BD_%D0%BF%D1%80%D0%BE%D0%B5%D0%BA%D1%82%D0%B8%D1%80%D0%BE%D0%B2%D0%B0%D0%BD%D0%B8%D1%8F%29
 */
interface IDrawer
{
    public function drawCircle($x, $y, $radius);
}

class SmallCircleDrawer implements IDrawer
{
    const RADIUS_MULTIPLIER = 0.25;

    public function drawCircle($x, $y, $radius)
    {
        echo 'Small circle center = ( '.$x.', '.$y.' ) radius = '.($radius * self::RADIUS_MULTIPLIER).'<br>';
    }
}

class LargeCircleDrawer implements IDrawer
{
    const RADIUS_MULTIPLIER = 10;

    public function drawCircle($x, $y, $radius)
    {
        echo 'Large circle center = ( '.$x.', '.$y.' ) radius = '.($radius * self::RADIUS_MULTIPLIER).'<br>';
    }
}

abstract class Shape
{
    protected $drawer;

    protected function __construct(IDrawer $drawer)
    {
        $this->drawer = $drawer;
    }

    abstract public function draw();
    abstract public function enlargeRadius($multiplier);
}

class Circle extends Shape
{
    private $x;
    private $y;
    private $radius;

    public function __construct($x, $y, $radius, IDrawer $drawer)
    {
        parent::__construct($drawer);
        $this->x = $x;
        $this->y = $y;
        $this->radius = $radius;
    }

    public function draw()
    {
        $this->drawer->drawCircle($this->x, $this->y, $this->radius);
    }

    public function enlargeRadius($multiplier)
    {
        $this->radius *= $multiplier;
    }
}

$circle = new Circle(5, 10, 10, new LargeCircleDrawer());
$circle->draw();        // Large circle center = ( 5, 10 ) radius = 100
$circle = new Circle(20, 30, 100, new SmallCircleDrawer());
$circle->draw();        // Small circle center = ( 20, 30 ) radius = 25