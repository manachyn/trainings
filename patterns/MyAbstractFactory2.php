<?php
/**
 * Паттерн Abstract Factory на примере инициализации ORM компонента web приложения
 * в зависимости от настроек приложения
 * http://andrey.moveax.ru/patterns/oop/creational/abstract-factory/
 */

/**
 * Интерфейс фабрики
 */
interface ORMFactory {
    public function createDBConnection();
    public function createDBQueryBuilder();
    public function createDBSchema();
}

/**
 * Абстрактный класс фабрики
 * В этом примере он не обязателен, но может использоваться если в каждой конкретной фабрике есть какой-то общий функционал
 * (напр переменная $settings и конструктор который ее инициализирует)
 */
abstract class ORMAbstractFactory {

}

/** Конкретные фабрики */

/**
 * MySQL фабрика
 */
class MySQLFactory extends ORMAbstractFactory implements ORMFactory {
    public function createDBConnection() {
        return new MySQLDBConnection();
    }
    public function createDBQueryBuilder() {
        return new MySQLDBQueryBuilder();
    }
    public function createDBSchema() {
        return new MySQLDBSchema();
    }
}

/**
 * Oracle фабрика
 */
class OracleFactory extends ORMAbstractFactory implements ORMFactory {
    public function createDBConnection() {
        return new OracleDBConnection();
    }
    public function createDBQueryBuilder() {
        return new OracleDBQueryBuilder();
    }
    public function createDBSchema() {
        return new OracleDBSchema();
    }
}

/** Компоненты системы ORM */

/**
 * Абстрактный класс DB соединения
 */
abstract class AbstractDBConnection {
    abstract function getConnection();
}

/**
 * Реализация MySQL DB соединения
 */
class MySQLDBConnection extends AbstractDBConnection {
    public function getConnection() {
        echo 'MySQL connection', '<br>';
    }
}

/**
 * Реализация Oracle DB соединения
 */
class OracleDBConnection extends AbstractDBConnection {
    public function getConnection() {
        echo 'Oracle connection', '<br>';
    }
}

/**
 * Абстрактный класс Query Builder
 */
abstract class AbstractDBQueryBuilder {
    abstract function getQuery();
}

/**
 * Реализация MySQL Query Builder
 */
class MySQLDBQueryBuilder extends AbstractDBQueryBuilder {
    public function getQuery() {
        echo 'MySQL query', '<br>';
    }
}

/**
 * Реализация Oracle Query Builder
 */
class OracleDBQueryBuilder extends AbstractDBQueryBuilder {
    public function getQuery() {
        echo 'Oracle query', '<br>';
    }
}

/**
 * Абстрактный класс DB схемы
 */
abstract class AbstractDBSchema {
    abstract function getSchema();
}

/**
 * Реализация MySQL DB схемы
 */
class MySQLDBSchema extends AbstractDBSchema {
    public function getSchema() {
        echo 'MySQL schema';
    }
}

/**
 * Реализация Oracle DB схемы
 */
class OracleDBSchema extends AbstractDBSchema {
    public function getSchema() {
        echo 'Oracle schema';
    }
}

/**
 * Приложение
 * В зависимости от настроек или каких-то других факторов(контекст) определяется тип нужной фабрики и создается ее экземпляр
 * С помощью выбранной фабрики создаем нужные компоненты приложения
 * В данном примере фабрика создает компоненты ORM(Connection, QueryBuilder, Schema) в зависимости от указанного в настройках драйвера
 */
class MyApplication {
    private $_settings;
    private $_dbConnection;
    private $_dbQueryBuilder;
    private $_dbSchema;
    public function __construct($settings) {
        $this->_settings = $settings;

        switch($this->_settings['dbDriver']) {
            case 'mysql':
                $factory = new MySQLFactory();
                break;
            case 'oracle';
                $factory = new OracleFactory();
                break;
        }

        $this->_dbConnection = $factory->createDBConnection();
        $this->_dbQueryBuilder = $factory->createDBQueryBuilder();
        $this->_dbSchema = $factory->createDBSchema();
    }

    public function run() {
        $this->_dbConnection->getConnection();
        $this->_dbQueryBuilder->getQuery();
        $this->_dbSchema->getSchema();
    }
}

$myApp = new MyApplication(array('dbDriver' => 'mysql'));
$myApp->run();
