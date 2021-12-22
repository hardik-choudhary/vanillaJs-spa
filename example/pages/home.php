<?php

$page['title'] = $page['extra']['#ptitle'] = 'Home';

$page['cssFiles'][]  = 'static_files/css/home.css';
$page['jsFiles'][]   = 'static_files/js/home.page.js';

$page['script']   = "
    window.addEventListener('load', function(){
        console.log('Home Page loaded');
    });
";

$page['content'] = '

    This is home page.
    
    <button id="home-btn">Check Home Javascript</button>

';