<?php
$_POST

$file = 'result/' . date('Y-m-d-H-i-s') . '.txt';
file_put_contents ($file, $_POST["results"], FILE_APPEND | LOCK_EX);
?>
