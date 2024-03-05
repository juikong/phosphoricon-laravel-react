<?php

namespace App\Http\Controllers;

use PhosphorIcon;

class IconController extends Controller
{
    public function index()
    {
        return PhosphorIcon::getData();
    }
}
