<?php

$requested = isset($_GET['page'])? $_GET['page']: 'home';

$page = [
    'title'     => '404',
    'content'   => 'page not found',
    'cssFiles'  => [],
    'jsFiles'   => [],
    'script'    => '',
    'jsOrder'   => true,
    'extra' => [
        '#ptitle' => 'New Title'
    ]
];

if(file_exists("pages/$requested.php")){
    include "pages/$requested.php";
}
else{
    include 'pages/404.php';
}

if(isset($_GET['_spaRequest'])){
    header('Content-Type: application/json');
    echo json_encode($page);
    exit();
}

$jsFiles = "";
foreach ($page['jsFiles'] as $jsFile) {
    $jsFiles .= '<script class="added_by_spa" src="'.$jsFile.'"></script>';
}

$cssFiles = "";
foreach ($page['cssFiles'] as $cssFile) {
    $cssFiles .= '<link rel="stylesheet" class="added_by_spa" href="'.$cssFile.'">';
}

include 'layout.php';