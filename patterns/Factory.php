<?php
/*
 * Применимость в web-приложенияx
 * Настраиваемые компоненты системы
 * Например, в php - фреймворке symfony можно в отдельном конфигурационном файле задать,
 * какой класс следует использовать при создании какого либо компонента системы.
 * Например, можно переопределить класс хранилища сессии. По-умолчанию, сессия лежит в обычном массиве $_SESSION.
 * Можно создать свой класс, который, например, хранит данные сессии в базе данных, и прописать этот класс в настройки фреймворка.
 * Можно использовать подобный подход, чтобы придать создаваемой вами системы большую гибкость и настраиваемость
 * (данный пример будет рассмотрен более детально ниже).
 */

/**
 * Описание компонентов, присутствующих в системе по-умолчанию.
 * Обычно конфигурацию выносят в отдельный yml или xml файл. Но, для простоты,
 * обойдёмся обыкновенным массивом.
 */
$g_defaultComponentSettings = array(
    'layout' => array(
        'class' => 'Layout'
    ),
    'content_container' => array(
        'class' => 'ContentContainer'
    ),
    'top_menu' => array(
        'class' => 'TopMenu'
    ),
);

/**
 * Описание нестандартных компонентов системы
 * или переопределения двефолтовых компонентов.
 */
$g_componentSettings = array(
    'top_menu' => array(
        'class' => 'MyTopMenu'
    ),
);

class TopMenu
{
    public function render()
    {
        return '  [top_menu]It\'s a top menu[/top_menu]';
    }
}

class ContentContainer
{
    public function render()
    {
        return '  [content]Content[/content]';
    }
}

class MyTopMenu extends TopMenu
{
    public function render()
    {
        return "  [decorated_top_menu]\n  " . parent::render() . "\n  [/decorated_top_menu]";
    }
}

/**
 * Класс представляет собой общую разметку страницы.
 */
class Layout
{
    private $contentContainer = null;
    private $topMenu = null;

    public function setContentContainer($contentContainer)
    {
        $this->contentContainer = $contentContainer;
    }

    public function setTopMenu($topMenu)
    {
        $this->topMenu = $topMenu;
    }

    /**
     * Печатает страницу на экран.
     */
    public function display()
    {
        echo "[layout]\n";
        echo $this->topMenu->render() . "\n";
        echo $this->contentContainer->render() . "\n";
        echo "[/layout]\n";
    }
}

/**
 * Фабрика компонентов системы.
 */
class ComponentFactory
{
    private $defaultComponentSettings = null;
    private $componentSettings = null;

    public function __construct(array $defaultComponentSettings, array $componentSettings = array())
    {
        $this->defaultComponentSettings = $defaultComponentSettings;
        $this->componentSettings = $componentSettings;
    }

    /**
     * Создаёт компонент по его имени
     * @param string $componentName
     * @return object
     */
    public function createComponent($componentName)
    {
        $componentClassName = "";
        if (isset($this->componentSettings[$componentName]))
        {
            $componentClassName = $this->componentSettings[$componentName]['class'];
        }
        else if (isset($this->defaultComponentSettings[$componentName]))
        {
            $componentClassName = $this->defaultComponentSettings[$componentName]['class'];
        }
        if (empty($componentClassName))
        {
            throw new Exception("Component '$componentName' not found.");
        }
        return new $componentClassName();
    }
}

/**
 * Пример 1. Используем только дефолтную конфигурацию фабрики.
 */
$factory = new ComponentFactory($g_defaultComponentSettings);
$layout  = $factory->createComponent('layout');
$topMenu = $factory->createComponent('top_menu');
$content = $factory->createComponent('content_container');

$layout->setContentContainer($content);
$layout->setTopMenu($topMenu);
$layout->display();

/**
На выходе получим:

[layout]
[top_menu]It's a top menu[/top_menu]
[content]Content[/content]
[/layout]
 */

/**
 * Пример 2. Используем дополнительные настройки фабрики.
 */
$factory = new ComponentFactory($g_defaultComponentSettings, $g_componentSettings);
$layout  = $factory->createComponent('layout');
$topMenu = $factory->createComponent('top_menu');
$content = $factory->createComponent('content_container');

$layout->setContentContainer($content);
$layout->setTopMenu($topMenu);
$layout->display();

/**
На выходе получим:

[layout]
[decorated_top_menu]
[top_menu]It's a top menu[/top_menu]
[/decorated_top_menu]
[content]Content[/content]
[/layout]
 */