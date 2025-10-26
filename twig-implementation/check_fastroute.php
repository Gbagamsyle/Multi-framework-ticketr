<?php
require __DIR__ . '/vendor/autoload.php';
echo "Included files:\n";
foreach (get_included_files() as $f) {
    if (strpos($f, 'nikic') !== false || strpos($f, 'FastRoute') !== false) {
        echo $f . "\n";
    }
}
echo "Function exists? ";
var_export(function_exists('FastRoute\\simpleDispatcher'));
echo "\n";
$demo = \FastRoute\simpleDispatcher(function($r){ $r->addRoute('GET','/','test'); });
var_export(is_object($demo));
echo "\n";
