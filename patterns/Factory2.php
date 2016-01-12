<?php
/*
 * http://mabp.kiev.ua/2007/07/25/pattern_factory/
 */
class Factory {
    private static $instance;

    /**
     * Constructor
     *
     */
    private function __construct(){
    }

    /**
     * Singleton inplementation
     *
     * @return object
     */
    public static function instance(){
        if (!isset(self::$instance))
            self::$instance = new self;
        return self::$instance;
    }

    /**
     * Craft new object
     *
     * @param string $name
     * @param array $params
     * @param string $func
     * @return object
     */
    public static function factory($name,$params=null,$func='__instance'){
        if (!class_exists($name) && is_callable("__autoload"))
            __autoload($name);

        if (class_exists($name)){
            if(is_callable(array($name,$func))){
                return call_user_func_array(array($name,$func),$params); // метод $name::$func вызван статично
            }else if(!$params){ // пытаемся сэкономить время
                return new $name();
            }else{
                $reflection = new ReflectionClass($name);
                return $reflection->newInstanceArgs($params);
            }
        }else{
            $factory = ucfirst($name)."Factory";

            if (!class_exists($factory) && is_callable("__autoload"))
                __autoload($factory);

            if(class_exists($factory) && is_callable(array($factory,"factory"),true)){
                return call_user_func_array(array($factory,"factory"),$params);
            }
        }
        // если мы до сюда дошли и ничего не вернули то бросаем исключение
        throw new FactoryException("Class '$name' doesn't declared and can't be loaded so does it's factory");
    }
}

class FactoryException extends Exception{
}

class Product1{
    public function __construct(){
        echo "Product1 <br/>\n";
    }
}

class Product2{
    public function __construct($a,$b,$c){
        echo 'Product2 ',$a,$b,$c," <br/>\n";
    }
}

class Product3{
    private static $instance;

    private function __construct(){
        echo "Product3 <br/>\n";
    }

    public static function __instance(){
        if (!isset(self::$instance)){
            self::$instance = new self;
        }
        return self::$instance;
    }
}

class Product4{
    private static $instance;

    private function __construct($a,$b,$c){
        echo 'Product4 ',$a,$b,$c," <br/>\n";
    }

    public static function __instance($a,$b,$c){
        if (!isset(self::$instance)){
            self::$instance = new self($a,$b,$c);
        }
        return self::$instance;
    }
}

class Product51{
    public function __construct(){
        echo "Product51 <br/>\n";
    }
}

class Product52{
    private static $instance;

    private function __construct($a,$b,$c){
        echo 'Product52 ',$a,$b,$c," <br/>\n";
    }

    public static function __instance($a,$b,$c){
        if (!isset(self::$instance)){
            self::$instance = new self($a,$b,$c);
        }
        return self::$instance;
    }
}

class Product5Factory{
    public static function factory($a=null,$b=null,$c=null){
        if($a&&$b&&$c)
            return Product52::__instance($a,$b,$c);
        return new Product51();
    }
}


$product1 = Factory::factory('Product1');
$product2 = Factory::factory('Product2',array('a','b','c'));
$product3 = Factory::factory('Product3',null,'__instance');
$product4 = Factory::factory('Product4',array('a','b','c'),'__instance');
$product51 = Factory::factory('Product5');
$product52 = Factory::factory('Product5',array('a','b','c'));