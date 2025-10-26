<?php

namespace Ogaba\TwigImplementation\Controllers;

class HomeController extends BaseController {
    public function index() {
        $this->render('pages/landing.twig');
    }
}