<?php
    $myfile = fopen("logs.txt", "wr") or die("Unable to open file!");
    file_put_contents ('result.txt', $_POST["results"], FILE_APPEND | LOCK_EX);
?>
