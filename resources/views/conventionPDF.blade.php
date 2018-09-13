<!doctype html>
<html lang="{{ app()->getLocale() }}">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>ConventionPDF</title>
    </head>
    <body>
      <?php
        header('Content-Type: application/pdf');
        header('Content-Length: '.strlen($_POST["pdf"]));
        header('Content-Disposition: inline;');
        header('Cache-Control: private, max-age=0, must-revalidate');
        header('Pragma: public');
        print $_POST["pdf"];
      ?>
    </body>
</html>
