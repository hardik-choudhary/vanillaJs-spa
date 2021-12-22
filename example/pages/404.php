<?php

$page['title']  = '404';

http_response_code(404);

$page['content'] = '
    <h2>Requested Page not found</h2>
';