<?php
/**
 * Способ 1 реализации IoC: DI(Dependency injection)
 * В этом примере внедрение зависимости реализовано через конструктор (Constructor injection)
 */

class Grabber
{
    public function get($url) {/** returns HTML code or throws an exception */}
}

class HtmlExtractor
{
    public function filter($html, $selector) {/** returns array of filtered elements */}
}

/**
 * Зависимости передаются в конструктор класса.
 */
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

/**
 * Если мы хотим предоставить другим разработчикам возможность добавлять и использовать свои реализации Grabber и HtmlExtractor,
 * то стоит подумать о введении интерфейсов для них.
 */

/**
 * Использование
 * Недостатки:
 * 1. Если нам понадобится использовать объект типа GoogleFinder в другом месте, нам придется продублировать его создание.
 * В нашем примере это всего одна строка и проблема не так заметна. На практике же инициализация объектов может быть
 * достаточно сложной.
 * 2. Так же возникают другие проблемы типичные для дублирования кода.
 * Если в процессе рефакторинга понадобится изменить имя используемого класса или логику инициализации объектов,
 * то придется вручную поменять все места.
 *
 * Решение:
 * Обычно с хардкодом поступают просто. Дублирующиеся значения, как правило, выносятся в конфигурацию.
 * Это позволяет централизованно изменять значения во всех местах, где они используются.
 */
class Controller
{
    public function action()
    {
        /* Some stuff */

        $finder = new GoogleFinder(new Grabber(), new HtmlExtractor());
        $results = $finder->find('search string');

        /* Do something with results */
    }
}