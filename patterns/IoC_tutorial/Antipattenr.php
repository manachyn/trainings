<?php

/**
 * Антипаттерн IoC
 * Недостатки:
 * 1. Инициализация зависимостей напрямую в классе, в котором они требуются
 * (инициализация объектов Grabber и HtmlExtractor находится в конструкторе класса GoogleFinder).
 * Хардкодить создание объектов в конструкторе не лучшая идея.
 * 2. Трудно, поменять реализацию зависимостей. Если потребуется поменять Grabber на какой-то другой, нужно будет везде,
 * где он используется, прописать новый класс.
 * В лучшем случае можно унаследовать GoogleFinder и переопределить его конструктор.
 * Да и то, только если область видимости свойств grabber и filter будет protected или public.
 * 3. Каждый раз при создании нового объекта GoogleFinder в памяти будет создаваться новая пара объектов-зависимостей,
 * хотя мы вполне можем использовать один объект типа Grabber и один объект типа HtmlExtractor
 * в нескольких объектах типа GoogleFinder.
 */

/**
 * Класс, который может отправлять GET запрос на определенный URI и возвращать HTML из ответа сервера
 */
class Grabber
{
    public function get($url) {/** returns HTML code or throws an exception */}
}

/**
 * Класс, который отвечает за фильтрацию полученного HTML.
 * Метод filter принимает в качестве аргументов HTML код и CSS селектор,
 * а возвращает массив найденных элементов по заданному селектору.
 */
class HtmlExtractor
{
    public function filter($html, $selector) {/** returns array of filtered elements */}
}

/**
 * Класс для получения результатов поиска в Google по заданным ключевым словам
 * Использует класс Grabber для отправки запроса, а для извлечения необходимого контента класс HtmlExtractor.
 * Так же он будет содержать логику построения URI, селектор для фильтрации полученного HTML и обработку полученных результатов.
 */
class GoogleFinder
{
    private $grabber;
    private $filter;

    public function __construct()
    {
        $this->grabber = new Grabber();
        $this->filter = new HtmlExtractor();
    }

    public function find($searchString) { /** returns array of founded results */}
}

/**
 * К преимуществам данного подхода, отнесем его простоту. Наши объекты создаются явно, и Ваша IDE легко приведет Вас к месту, в котором это происходит. Мы также решили проблему Registry и объекты в памяти будут создаваться только тогда, когда мы «попросим» фабрику об этом. Но мы пока не решили, как поставлять контроллерам нужные фабрики. Тут есть несколько вариантов. Можно использовать статические методы. Можно предоставить контроллерам самим создавать нужные фабрики и свести на нет все наши попытки избавиться от копипаста. Можно создать фабрику фабрик и передавать в контроллер только ее. Но получение объектов в контроллере станет немного сложнее, да и нужно будет управлять зависимостями между фабриками. Кроме того не совсем понятно, что делать, если мы хотим использовать модули в нашем приложении, как регистрировать фабрики модулей, как управлять связями между фабриками из разных модулей. В общем, мы лишились главного преимущества фабрики – явного создания объектов. И пока все еще не решили проблему «неявного» интерфейса контроллера.
 */