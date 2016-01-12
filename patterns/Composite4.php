<?php
/*
 * In this example the objects Article (leaf) and Content_Composite (branch) have the same interface.
 * An instance of each has the method save. Any other methods can be added there when necessary.
 * Your client object (e.g. a model) is not required to know who to treat the exact object instance it traverses – they all treated the same way.
 */
/**
 * Component
 */
interface Content_Interface
{
    public function save();
}
/**
 * Composite
 */
class Content_Composite implements Content_Interface
{
    private $_items = array();

    public function addItem(Content_Interface $content)
    {
        $this->_items[spl_object_hash($content)] = $content;
    }
    public function removeItem(Content_Interface $content)
    {
        unset($this->_items[spl_object_hash($content)]);
    }
    public function save()
    {
        foreach ($this->_items as $content) {
            $content->save();
        }
    }
}
/**
 * Leaf
 */
class Article implements Content_Interface
{
    public $id;
    public $title;

    public function  __construct($title)
    {
        static $_id = 1;
        $this->id = $_id ++;
        $this->title = $title;
    }
    public function save()
    {
        printf ("Article #%d, %s saved\n", $this->id, $this->title);
    }
}

/**
 * Usage
 */
$article1 = new Article('Title 1');
$article2 = new Article('Title 2');
$article3 = new Article('Title 3');
$composite1 = new Content_Composite();
$composite11 = new Content_Composite();
$composite12 = new Content_Composite();
$composite11->addItem($article1);
$composite11->addItem($article2);
$composite12->addItem($article3);
$composite1->addItem($composite11);
$composite1->addItem($composite12);
$composite1->save();

// Output:
// Article #1, Title 1 saved
// Article #2, Title 2 saved
// Article #3, Title 3 saved