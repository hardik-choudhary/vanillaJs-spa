function _spa(container, selector, getPerameter = '_spaRequest', getPerameterValue = true) {
    _spa.container = document.querySelector(container);
    _spa.selector = selector;
    _spa.getPerameter = getPerameter;
    _spa.getPerameterValue = getPerameterValue;

    // Callbacks
    _spa.LoadStart = _spa.LoadEnd = _spa.errorCB = function () {};

    _spa.url = null;
    _spa.isPopstate = false;

    _spa.xhr = new XMLHttpRequest();
    

    document.removeEventListener('click', _spa.clickHandler);
    document.addEventListener('click', _spa.clickHandler);

    window.addEventListener('popstate', function(event) {
        event.preventDefault();
        _spa.LoadStart();
        _spa.url = location.href;
        _spa.isPopstate = true;
        _spa.Ajax();
    });
}

_spa.onLoadStart = function (callback) {
    _spa.LoadStart = callback;
}

_spa.onLoadEnd = function (callback) {
    _spa.LoadEnd = callback;
}

_spa.onError = function (callback) {
    _spa.errorCB = callback;
}

_spa.clickHandler = function (e) {
    if (e.target.matches(_spa.selector)){
        e.preventDefault();
        _spa.LoadStart();
        _spa.url = e.target.getAttribute('href');
        _spa.isPopstate = false;
        _spa.Ajax();
    }
}

_spa.Ajax = function () {
    var url = (_spa.url.includes('?'))? _spa.url+`&${_spa.getPerameter}=${_spa.getPerameterValue}`: _spa.url+`?${_spa.getPerameter}=${_spa.getPerameterValue}`;
    
    _spa.xhr.abort();
    _spa.xhr.onreadystatechange = _spa.handleXHRresponse;
    _spa.xhr.open("GET", url, true);
    _spa.xhr.send();
}

_spa.handleXHRresponse = function () {
    if (this.readyState === XMLHttpRequest.DONE) {
        if(this.status === 200){
            // Convert response to JSON
            var response = JSON.parse(this.responseText);
            // Add New Content to Container
            _spa.clearOld();
            _spa.container.innerHTML = response.content;
            document.title = response.title;

            if(!_spa.isPopstate){
                window.history.pushState({}, '', _spa.url);
            }

            // Add Css Files
            response.cssFiles.map(function (url) {
                return _spa.loadCss(url);
            });

            // Add js files
            if(response.jsOrder){
                _spa.loadScriptsInOrder(response.jsFiles).then(function () {
                    _spa.addJsCode(response.script);
                    _spa.LoadEnd();
                });
            }
            else{
                _spa.loadScriptsInOrder(response.jsFiles);
                _spa.addJsCode(response.script);
                _spa.LoadEnd();
            }
            if(response.extra !== null){
                for (var selector in response.extra) {
                    if (response.extra.hasOwnProperty(selector)) {
                        document.querySelectorAll(selector).forEach(function (el) {
                            el.innerHTML = response.extra[selector];
                        });
                    }
                }
            }
        }
        else{
            _spa.errorCB();
        }
    }
}

_spa.clearOld = function () {
    document.querySelectorAll('.added_by_spa').forEach(function (el) {
        el.remove();
    });
}

// Load a css file from given `url`
_spa.loadCss = function(url) {
    return new Promise(function (resolve, reject) {
        var link = document.createElement('link');
        link.setAttribute('rel', 'stylesheet');
        link.setAttribute('href', url);
        link.classList.add('added_by_spa');

        link.addEventListener('load', function () {
            // The script is loaded completely
            resolve(true);
        });
        document.head.appendChild(link);
    });
};

// Load a script from given `url`
_spa.loadScript = function(url) {
    return new Promise(function (resolve, reject) {
        const script = document.createElement('script');
        script.src = url;
        script.classList.add('added_by_spa');
        script.addEventListener('load', function () {
            // The script is loaded completely
            resolve(true);
        });
        document.body.appendChild(script);
    });
};

// Perform all promises in the order
_spa.waterfall = function(promises) {
    return promises.reduce(
        function (p, c) {
            // Waiting for `p` completed
            return p.then(function () {
                // and then `c`
                return c.then(function (result) {
                    return true;
                });
            });
        },
        // The initial value passed to the reduce method
        Promise.resolve([])
    );
};

// Load an array of scripts in order
_spa.loadScriptsInOrder = function(arrayOfJs) {
    const promises = arrayOfJs.map(function (url) {
        return _spa.loadScript(url);
    });
    return _spa.waterfall(promises);
};

// Add Javascript code to page
_spa.addJsCode = function (code) {
    if(code.length > 0){
        var script = document.createElement( "script" );
        script.text = code;
        script.classList.add('added_by_spa');
        document.body.appendChild(script);
    }
}