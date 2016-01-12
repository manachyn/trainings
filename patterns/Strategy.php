<?php
/**
 * Strategy pattern example
 *
 */

namespace patterns\Strategy;

interface StrategyInterface
{
    public function algorithm();
}

class FirstConcreteStrategy implements StrategyInterface
{
    public function algorithm()
    {
        echo 'first strategy algorithm';
    }
}

class SecondConcreteStrategy implements StrategyInterface
{
    public function algorithm()
    {
        echo 'second strategy algorithm';
    }
}

class Context
{
    protected $strategy;

    public function __construct(StrategyInterface $strategy)
    {
        $this->strategy = $strategy;
    }

    public function executeStrategy()
    {
        return $this->strategy->algorithm();
    }
}

$context = new Context(new FirstConcreteStrategy());
$context->executeStrategy();

$context = new Context(new SecondConcreteStrategy());
$context->executeStrategy();