<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?php echo $page['title']; ?></title>
    <link rel="stylesheet" href="static_files/css/base.css">
    <?php echo $cssFiles; ?>
</head>

<body>
    <div class="loader">
        Loading...
    </div>
    <header>
        <h2 id="ptitle"><?php echo $page['title']; ?></h2>
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
            <?php echo $page['content']; ?>
        </article>
    </section>

    <footer>
        <p>Footer</p>
    </footer>
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
    <script src="../vanillaJs-spa.min.js"></script>
    
    <?php echo $jsFiles; ?>
</body>

</html>