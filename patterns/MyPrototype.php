<?php
/*
 * Назначение
 * Задаёт виды создаваемых объектов с помощью экземпляра-прототипа и создаёт новые объекты путём копирования этого прототипа.
 * Проще говоря, это паттерн создания объекта через клонирование другого объекта вместо создания через конструктор.
 *
 * Применимость
 * Паттерн используется чтобы:
 * - избежать дополнительных усилий по созданию объекта стандартным путем (имеется в виду использование ключевого слова 'new',
 * когда вызывается конструктор не только самого объекта, но и конструкторы всей иерархии предков объекта),
 * когда это непозволительно дорого для приложения.
 * - избежать наследования создателя объекта (object creator) в клиентском приложении, как это делает паттерн abstract factory.
 *
 * Пример взят с http://dizballanze.com/PHP/prototype-prototip/
 */


/*
 * Иерархия классов которая буде отвечать за стиль отображения страницы документа.
 * Ограничимся настройкой стилей параграфов, заголовков и списков.
 * Для каждого из элементов у нас будет своя иерархия классов которая позволит выводить данный элемент скажем на принтер и браузер
 */

/*
 * Абстрактные классы элементов(Paragraph, Header, Lists)
 */
abstract class Paragraph{
    abstract public function format($data);
}

abstract class Header{
    abstract public function header_big($data);
    abstract public function header_small($data);
}

abstract class Lists{
    abstract public function numeric($data);
    abstract public function alpha($data);
}

/*
 * Классы реализации элементов для печати
 */
class PrintedParagraph extends Paragraph{
    public function format($data){
        // Some operations
    }
}

class PrintedHeader extends Header{
    public function header_big($data){
        // Some operations
    }
    public function header_small($data){
        // Some operations
    }
}

class PrintedLists extends Lists {
    public function numeric($data){
        // Some operations
    }

    public function alpha($data) {
        // Some operations
    }
}

/*
 * Классы реализации элементов для вывода в браузер
 */
class BrowsedParagraph extends Paragraph{
    public function format($data){
        // Some operations
    }
}

class BrowsedHeader extends Header{
    public function header_big($data){
        // Some operations
    }
    public function header_small($data){
        // Some operations
    }
}

class BrowsedLists extends Lists {
    public function numeric($data){
        // Some operations
    }

    public function alpha($data) {
        // Some operations
    }
}

/*
 * DocumentPrototype - паттерн прототип, прототип докуиента.
 * Данный класс принимает в конструкторе эталонные экземпляры классов-элементов документа
 * и потом умеет создавать их копии при помощи соответствующих методов.
 */
class DocumentPrototype {
    protected $_paragraph;
    protected $_header;
    protected $_list;

    public function __construct(Paragraph $paragraph, Header $header, Lists $list) {
        $this->_paragraph = $paragraph;
        $this->_header = $header;
        $this->_list = $list;
    }

    public function getParagraph(){
        return clone $this->_paragraph;
    }

    public function getHeader(){
        return clone $this->_header;
    }

    public function getList(){
        return clone $this->_list;
    }
}

// Использование прототипа
// Мы получаем возможность создавать объекты без поддержки дополнительных иерархий классов
$document = new DocumentPrototype(new BrowsedParagraph(), new BrowsedHeader(), new BrowsedLists());
$list = $document->getList();
$list->numeric(array('first','second', 'third'));
$header = $document->getHeader();
$header->header_big('Test');

// Теперь давайте представим, что нам нужно создать документ у которого бы параграфы выводились так,
// как если бы они выводились на печать, а заголовки и списки, так, как на web-странице.
// Всё довольно просто, мы всего лишь заменили один аргумент конструктора на другой и получили такой отличный результат
$document = new DocumentPrototype(new PrintedParagraph(), new BrowsedHeader(), new BrowsedLists());