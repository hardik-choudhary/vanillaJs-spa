## Vanilla JS Single Page Application Library

A light, simple, powerful **SEO-friendly** JavaScript Library. Helps to build Single Page Applications using javascript and any server-side language.

## What is Single Page Application

A **SPA (Single-page application)** is a web app implementation that loads only a single web document, and then updates the body content of that single document via JavaScript, **instead of loading entire new pages.**

## How it Works

When the user clicks a link on the page, then **vanillaJs-spa** makes an ajax request to the clicked link instead of reloading the page. "**vanillaJs-spa**" sends an extra parameter with the ajax request (Example: https://example.com/other-page?ajaxRequest=true) That helps the server to identify the request to send only specific data instead of full-page

## Usage

Add javascript file to your page

```
<script type="text/javascript" src="file/to/path/js/vanillaJs-spa.js"></script>
```

Then call _spa(); function; _**spa()**; function expects 4 parameters.

1. Container Selector: Container for page's main content that changes for every page
2. Link Tag (<a>) Selector: Links that works with **Single Page Application**
3. Extra Parameter Name (Default: '_spaRequest'): Example https://example.com/other-page?_spaRequest
4. Extra Parameter Value (Default: true): Example https://example.com/other-page?_spaRequest=true

```
// Call _spa(); 
_spa('#containerSelector', '.aTagSelector');
```

#### **Server-Side Setup:**

You have to make some changes to your server response for ajax requests. Your server has to return JSON data for ajax requests that contain specific (specified in client-side) parameter.

**Expected JSON response:**

```
{
  "title": "Page Title",
  "content": "Html String: Page Content that will be added to the container",
  "cssFiles": [
    "path/to/file.css"
  ],
  "jsFiles": [
    "path/to/file.js"
  ],
  "script": "Extra Javascript code",
  "jsOrder": true or false, //Load js files in order and then script code
  "extra": {
    "#selector": "content"
  }
}
```

## Extra Methods

`_spa.onLoadStart(callback);` it will be called when ajax request start

`_spa.onLoadEnd(callback);` it will be called when ajax request end

`_spa.onError(callback);` it will be called on request failure

## Example Code:

```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Home Page</title>
</head>
<body>
    <header>
        <h2 id="ptitle">Page Title</h2>
    </header>

    <section>
        <nav>
            <ul>
                <li><a href="home" class="_spa">Home</a></li>
                <li><a href="contact" class="_spa">Contact</a></li>
                <li><a href="other" class="_spa">Other</a></li>
            </ul>
        </nav>

        <article id="container">
            
        </article>
    </section>

    <footer>
        <p>Footer</p>
    </footer>
    <script src="static_files/js/vanillaJs-spa.min.js"></script>
    <script>
        window.addEventListener('load', function(){
            _spa('#container', '._spa');
            _spa.onLoadStart(function(){
                document.querySelector(".loader").style.display = 'block';
            });
            _spa.onLoadEnd(function(){
                document.querySelector(".loader").style.display = 'none';
            });
            _spa.onError(function(){
                alert('error');
            });
        });
    </script>
</body>
</html>
```
