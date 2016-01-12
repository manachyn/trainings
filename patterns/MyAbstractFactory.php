<?php
/*
 * Паттерн Abstract Factory на примере инициализации DB драйвера web приложения
 * в зависимости от настроек приложения
 */

/*
 * Интерфейс фабрики
 * Единственный метод, который возвращает экземпляр DB драйвера
 */
interface DBFactory {
    public function createInstance();
}

/*
 * Абстрактный класс фабрики
 * В этом примере он не обязателен, но может использоваться если в каждой конкретной фабрике есть какой-то общий функционал
 * (напр переменная $settings и конструктор который ее инициализирует)
 */
abstract class DBAbstractFactory {

}

class MySQLFactory extends DBAbstractFactory implements DBFactory {
    public function createInstance() {
        return new MySQLDriver();
    }
}

class MySQLiFactory extends DBAbstractFactory implements DBFactory {
    public function createInstance() {
        return new MySQLiDriver();
    }
}

/*
 * Абстрактный класс DB драйвера
 */
abstract class AbstractDBDriver {
    abstract function getConnection();
}

/*
 * Реализация MySQL драйвера
 */
class MySQLDriver extends AbstractDBDriver {
    public function getConnection() {
        echo 'MySQL connection';
    }
}

/*
 * Реализация MySQLi драйвера
 */
class MySQLiDriver extends AbstractDBDriver {
    public function getConnection() {
        echo 'MySQLi connection';
    }
}

/*
 * Приложение
 * В зависимости от настроек или каких-то других факторов определяется тип нужной фабрики и создается ее экземпляр
 * С помощью выбранной фабрики создаем нужные компоненты приложения (в примере DB драйвер)
 */
class MyApplication {
    private $_settings;
    private $_bd_driver;
    public function __construct($settings) {
        $this->_settings = $settings;
        switch($this->_settings['db_library']) {
            case 'mysql':
                $factory = new MySQLFactory();
                break;
            case 'mysqli';
                $factory = new MySQLiFactory();
                break;
        }
        $this->_bd_driver = $factory->createInstance();
    }

    public function run() {
        $this->_bd_driver->getConnection();
    }
}

$myApp = new MyApplication(array('db_library' => 'mysql'));
$myApp->run();
