<!DOCTYPE html>
<html id="konfigurator">
<head>
    <script src="assets/js/vendor/jquery-1.12.4.min.js"></script>
    <script src="assets/js/vendor/knockout-3.4.0.js"></script>
    <script type="text/javascript" src="assets/js/app/models/View.js"></script>
    <script type="text/javascript" src="assets/js/app/app.js"></script>
    <script type="text/javascript" src="assets/js/main.js"></script>
</head>
<body>
    <div id="page-wrapper" data-bind="template: currentPage"></div>

    <!-- region: Load templates-->
    <?php
    $path    = 'templates/';
    $files = array_diff(scandir($path), array('.', '..'));

    foreach ($files as $file): ?>
    <script type="text/html" id="<?php echo preg_replace('/\\.[^.\\s]{3,4}$/', '', $file); ?>">
        <?php include($path . $file); ?>
    </script>
    <?php endforeach; ?>

</body>
</html>