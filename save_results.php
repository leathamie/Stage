<?php
    
    echo ("on appelle le php");
    $results = isset($_POST['results']) ? $_POST['results'] : "it doesn't works...";
    echo ($results);
    file_put_contents ('result.txt', $results, FILE_APPEND | LOCK_EX);
?>
