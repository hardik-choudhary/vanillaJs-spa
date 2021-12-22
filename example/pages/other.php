<?php

$page['title'] = $page['extra']['#ptitle'] = 'Other Page';

$page['cssFiles'][]  = 'static_files/css/other.css';
$page['jsFiles'][]   = 'static_files/js/other.page.js';

$page['content'] = '

    Other Page.
    
    <button id="other-btn">Check Other Javascript</button>

';