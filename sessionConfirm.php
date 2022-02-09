<?php
    header("Content-type: text/plain; charset=UTF-8");
    session_start();

    if(isset($_SESSION['name'])){
        echo $_SESSION['name'];
    }
    else{
        echo "";
    }
?>