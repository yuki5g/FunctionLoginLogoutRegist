<?php
    session_start();
    const SUCCESS = true;
    const FAILED = false;

    // セッション切断処理
    if(session_destroy()){
        $_SESSION = array();
        echo SUCCESS;
    }
    else{
        echo FAILED;
    }
?>
