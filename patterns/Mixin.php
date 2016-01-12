<?php
// http://habrahabr.ru/company/alawar/blog/186196/

abstract class Mixin
{
    protected $mixedObject = null;

    public function setObject( MixedObject $object )
    {
        $this->mixedObject = $object;
    }

    abstract public function getName();
}

class MixedObject
{
    private $mixins = array();

    public function addMixin( Mixin $mixin )
    {
        $mixin->setObject( $this );
        $this->mixins[$mixin->getName()] = $mixin;
    }

    public function hasMixin( $mixinName )
    {
        return array_key_exists( $mixinName, $this->mixins );
    }

    public function __call( $name, $arguments )
    {
        foreach ($this->mixins as $mixin) {
            if (is_callable( array( $mixin, $name ) )) {
                return call_user_func_array( array( $mixin, $name ), $arguments );
            }
        }

        throw new \Exception('Unknown method call.');
    }
}


/* Пример использования: */

class Foo extends MixedObject
{
    public function objectFunc()
    {
        return 'FooName';
    }
}

class Debuggable extends Mixin
{
    public function getName()
    {
        return 'Debug';
    }

    public function getDebug()
    {
        return sprintf( "%s", $this->mixedObject->objectFunc() );
    }
}

class Loggable extends Mixin
{
    public function getName()
    {
        return 'Log';
    }

    public function getLog( $level )
    {
        return $this->mixedObject->hasMixin( 'Debug' )
            ? sprintf( "%s %s", $level, $this->mixedObject->getDebug() )
            : sprintf( "%s", $level );
    }
}

$foo = new Foo();
$foo->addMixin( new Debuggable() );
$foo->addMixin( new Loggable() );
print $foo->getDebug();
print $foo->getLog( 'info' );
