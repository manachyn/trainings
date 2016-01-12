<?php
/*
 * http://ru.wikipedia.org/wiki/%D0%A4%D0%B0%D0%B1%D1%80%D0%B8%D1%87%D0%BD%D1%8B%D0%B9_%D0%BC%D0%B5%D1%82%D0%BE%D0%B4_(%D1%88%D0%B0%D0%B1%D0%BB%D0%BE%D0%BD_%D0%BF%D1%80%D0%BE%D0%B5%D0%BA%D1%82%D0%B8%D1%80%D0%BE%D0%B2%D0%B0%D0%BD%D0%B8%D1%8F)
 */
interface Product
{
    public function GetName();
}
class ProductA implements Product
{
    private $Name='ProductA';

    public function GetName()
    {
        return $this->Name;
    }
}
class ProductB implements Product
{
    private $Name='ProductB';

    public function GetName()
    {
        return $this->Name;
    }
}
/*
 * Определяет интерфейс для создания объекта, но оставляет подклассам решение о том, какой класс создавать.
 */
interface Creator
{
    public function FactoryMethod ();
}

class CreatorA implements Creator
{
    public function FactoryMethod()
    {
        return new ProductA();
    }
}
class CreatorB implements Creator
{
    public function FactoryMethod()
    {
        return new ProductB();
    }
}

$creator1 = new CreatorA();
$creator2 = new CreatorB();
$count=intval($_GET['count']);

if ($count==1) {
    $type=$creator1->FactoryMethod();
} else {
    if ($count<=0) {
        die("false");
    } else {
        $type=array();
        for($i=1;$i<=$count;$i++) {
            $type[]=$creator2->FactoryMethod();
        }
    }
}
?>