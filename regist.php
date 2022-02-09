<?php
    header("Content-type: text/plain; charset=UTF-8");
    // 定数宣言
    const REGIST_SUCCESS = 0;
    const REGIST_FAILED = 1;
    const NO_INPUT_VALUE = 2;
    
    // jsからの取得値
    $name = $_POST['name'];
    $pass = $_POST['pass'];

    if($name == null || $pass == null){
        echo $NO_INPUT_VALUE;
        return 0;
    }

    $pass = password_hash($_POST['pass'], PASSWORD_DEFAULT);
    $dsn = "mysql:host=localhost; dbname=mysql; charset=utf8";

    // DB接続情報
    $username = "root";
    $password = "root";
    try {
        $dbh = new PDO($dsn, $username, $password);
    } catch (PDOException $e) {
        $msg = $e->getMessage();
    }

    //登録情報重複チェック
    $sql = "SELECT * FROM users WHERE name = :name";
    $stmt = $dbh->prepare($sql);
    $stmt->bindValue(':name', $name);
    $stmt->execute();
    $member = $stmt->fetch();

    if (isset($member['name']) == true) {
        $msg = REGIST_FAILED;
    }

    // 登録処理
    else {
        //ユーザデータの重複がなければインサート
        $sql = "INSERT INTO users(name, password) VALUES (:name, :pass)";
        $stmt = $dbh->prepare($sql);
        $stmt->bindValue(':name', $name);
        $stmt->bindValue(':pass', $pass);
        $stmt->execute();
        $msg = REGIST_SUCCESS;
    }
    // JSに信号を返す
    echo $msg;

 ?>

