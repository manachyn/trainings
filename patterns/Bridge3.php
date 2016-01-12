<?php

// Глобальное окружение приложения
define("ENVIRONMENT", "CLI");


abstract class View
{
    protected
        $Imp = null;

    public function __construct()
    {
        // Здесь это сделано для упращения примера, в реальной же ситуации следует
        // использовать абстракную фабрику

        if (ENVIRONMENT == 'CLI')
        {
            $this -> Imp = new ViewImplCLI();
        }
        else if (ENVIRONMENT == 'JSON')
        {
            $this -> Imp = new ViewImplJSON();
        }
        else
        {
            throw new Exception('Unknown environment');
        }
    }

    protected function getImplementation()
    {
        return $this -> Imp;
    }

    public function drawText($text)
    {
        return $this -> getImplementation() -> drawText($text);
    }

    public function drawLine()
    {
        return $this -> getImplementation() -> drawLine();
    }

    public function printResult()
    {
        print $this -> getImplementation() -> getResult();
    }
}

class ViewContent extends View
{
    public function printParagraph($text)
    {
        $this -> drawText($text);
    }
}

class ViewTable extends View
{
    public function drawCell($text)
    {
        $this -> drawLine();
        $this -> drawText($text);
        $this -> drawLine();
    }
}




abstract class ViewImpl
{
    abstract public function drawText($text);
    abstract public function drawLine();
    abstract public function getResult();

    abstract protected function appendResult($result);
}

class ViewImplCLI extends ViewImpl
{
    protected
        $result = "";

    public function drawLine()
    {
        $this -> appendResult(str_repeat('-', 80) . PHP_EOL);
    }

    public function drawText($text)
    {
        $this -> appendResult($text . PHP_EOL);
    }

    protected function appendResult($result)
    {
        $this -> result .= $result;
    }

    public function getResult()
    {
        return $this -> result;
    }

}

class ViewImplJSON extends ViewImpl
{
    protected
        $result = array();

    public function drawLine()
    {
        $this -> appendResult(array(
            'type' => 'line'
        ));
    }

    public function drawText($text)
    {
        $this -> appendResult(array(
            'type' => 'text',
            'text' => $text
        ));
    }

    protected function appendResult($result)
    {
        $this -> result[] = $result;
    }

    public function getResult()
    {
        return json_encode($this -> result);
    }
}



///

$Content = new ViewContent();
$Table = new ViewTable();

$Content -> printParagraph('Hello world');
$Content -> printResult();

$Table -> drawCell('I am cell');
$Table -> printResult();