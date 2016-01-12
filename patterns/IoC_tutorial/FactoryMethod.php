<?php
/**
 * Factory Method
 * Вместо инициализации объекта в конфигурации, мы можем выделить логику создания объектов в другой класс,
 * у которого можно будет «попросить» построить необходимый нам объект.
 * Классы, которые отвечают за создание объектов называют фабриками. А шаблон проектирования называется Factory Method.
 */

class Grabber
{
    public function get($url) {/** returns HTML code or throws an exception */}
}

class HtmlExtractor
{
    public function filter($html, $selector) {/** returns array of filtered elements */}
}

class GoogleFinder
{
    private $grabber;
    private $filter;

    public function __construct(Grabber $grabber, HtmlExtractor $filter)
    {
        $this->grabber = $grabber;
        $this->filter = $filter;
    }

    public function find($searchString) { /** returns array of founded results */}
}

/*
class Factory
{
    public function getGoogleFinder()
    {
        return new GoogleFinder($this->getGrabber(), $this->getHtmlExtractor());
    }

    private function getGrabber()
    {
        return new Grabber();
    }

    private function getHtmlExtractor()
    {
        return new HtmlFiletr();
    }
}
*/

/**
 * Как правило делают фабрики которые отвечают за создание одного типа объектов.
 * Иногда фабрика может создавать группу связанных объектов.
 * Мы можем использовать кэширование в свойство, чтобы избежать повторного создания объектов.
 */
class Factory
{
    private $finder;

    public function getGoogleFinder()
    {
        if (null === $this->finder) {
            $this->finder = new GoogleFinder($this->getGrabber(), $this->getHtmlExtractor());
        }

        return $this->finder;
    }

    private function getGrabber()
    {
        return new Grabber();
    }

    private function getHtmlExtractor()
    {
        return new HtmlFiletr();
    }
}


/**
 * Мы можем параметризировать метод фабрики и делегировать инициализацию другим фабрикам в зависимости от входящего параметра.
 * Это уже будет шаблон Abstract Factory.
 * Если появится необходимость разбить приложение на модули, мы можем потребовать, чтобы каждый модуль предоставлял свои фабрики.
 */

/**
 * Использование
 */
class Controller
{
    private $factory;

    public function __construct(Factory $factory)
    {
        $this->factory = $factory;
    }

        public function action()
    {
        /* Some stuff */

        $results = $this->factory->getGoogleFinder()->find('search string');

        /* Do something with results */
    }
}

/**
 * Преимущества
 * 1. Простота. Объекты создаются явно, и Ваша IDE легко приведет Вас к месту, в котором это происходит.
 * Мы также решили проблему Registry и объекты в памяти будут создаваться только тогда, когда мы «попросим» фабрику об этом.
 * Недостатки
 * Но мы пока не решили, как поставлять контроллерам нужные фабрики. Тут есть несколько вариантов. Можно использовать статические методы. Можно предоставить контроллерам самим создавать нужные фабрики и свести на нет все наши попытки избавиться от копипаста. Можно создать фабрику фабрик и передавать в контроллер только ее. Но получение объектов в контроллере станет немного сложнее, да и нужно будет управлять зависимостями между фабриками. Кроме того не совсем понятно, что делать, если мы хотим использовать модули в нашем приложении, как регистрировать фабрики модулей, как управлять связями между фабриками из разных модулей. В общем, мы лишились главного преимущества фабрики – явного создания объектов. И пока все еще не решили проблему «неявного» интерфейса контроллера.
 */