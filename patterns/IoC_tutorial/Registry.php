<?php
/**
 * Шаблон Registry.
 * Создание объектов выносим в конфигурацию.
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

$registry = new ArrayObject();

$registry['grabber'] = new Grabber();
$registry['filter'] = new HtmlExtractor();
$registry['google_finder'] = new GoogleFinder($registry['grabber'], $registry['filter']);

/**
 * Использование
 */
class Controller
{
    private $registry;

    public function __construct(ArrayObject $registry)
    {
        $this->registry = $registry;
    }

    public function action()
    {
        /* Some stuff */

        $results = $this->registry['google_finder']->find('search string');

        /* Do something with results */
    }
}

/**
 * Registry – это всего лишь контейнер, в котором мы можем хранить объекты и передавать их внутри приложения.
 * Чтобы объекты стали доступными, нам необходимо их предварительно создать и зарегистрировать в этом контейнере.
 * Достоинства
 * 1. Мы перестали хардкодить имена классов и создаем объекты в одном месте
 * 2. Мы создаем объекты в единственном экземпляре, что гарантирует их повторное использование.
 * 3. Если изменится логика создания объектов, то отредактировать нужно будет только одно место в приложении.
 * 4. Мы получили, возможность централизованно управлять объектами в Registry.
 * Мы легко можем получить список всех доступных объектов, и провести с ними какие-нибудь манипуляции.
 * Недостатки
 * 1. Мы должны создать объект перед тем как зарегистрировать его в Registry. Соответственно, высока вероятность
 * создания «ненужных объектов», т.е. тех которые будут создаваться в памяти, но не будут использоваться в приложении.
 * Да, мы можем добавлять объекты в Registry динамически, т.е. создавать только те объекты, которые нужны для обработки
 * конкретного запроса. Так или иначе контролировать это нам придется вручную. Соответственно, со временем поддерживать
 * это станет очень тяжело.
 * 2. У нас появилась новая зависимость у контроллера. Да, мы можем получать объекты через статический метод в Registry,
 * чтобы не передавать Registry в конструктор. Но на мой взгляд, не стоит этого делать.
 * Статические методы, это даже более жесткая связь, чем создание зависимостей внутри объекта, и сложности в тестировании.
 * 3. Интерфейс контроллера ничего не говорит нам о том, какие объекты в нем используются.
 * Мы можем получить в контроллере любой объект доступный в Registry. Нам тяжело будет сказать,
 * какие именно объекты использует контроллер, пока мы не проверим весь его исходный код.
 */