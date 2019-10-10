<?php

class Dispatcher
{
    public static function dispatch()
    {
        $uri = $_SERVER['REQUEST_URI'];
        $uri = strtok($uri, '?');           //Remove URL values after '?'
        $uri = trim($uri, '/');             //Remove both '/' from left and right 
        $uriFragments = explode('/', $uri); //Split URL into array
        
        $controllerName = 'DefaultController';
        if (!empty($uriFragments[0])) {
            $controllerName = $uriFragments[0];
            $controllerName = ucfirst($controllerName); //Capitalize first letter
            $controllerName .= 'Controller';            //Add "Controller"
        }
        
        $method = 'index';
        if (!empty($uriFragments[1])) {
            $method = $uriFragments[1];
        }
        require_once "src/controller/$controllerName.php";

        $controller = new $controllerName();
        $controller->$method();
    }
}