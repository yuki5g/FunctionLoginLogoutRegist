<?php
    header("Content-type: text/plain; charset=UTF-8");
    // 定数宣言
    const LOGIN_SUCCESS = 0;
    const LOGIN_FAILED = 1;
    const NO_INPUT_VALUE = 2;

    // セッションの有効期限を5分に設定
    session_set_cookie_params(60 * 60);
    session_start();

    // DB接続情報
    $username = "root";
    $password = "root";
    $dsn = "mysql:host=localhost; dbname=mysql; charset=utf8";

    // jsからの取得値
    $name = $_POST['name'];
    $pass = $_POST['pass'];

    if($name == null || $pass == null){
        $msg = NO_INPUT_VALUE;
        $list = array("name" => "", "SID" => "", "msg" => $msg );
        echo json_encode($list);
        return 0;
    }

    try {
        $dbh = new PDO($dsn, $username, $password);
    } catch (PDOException $e) {
        $msg = $e->getMessage();
    }

    $sql = "SELECT * FROM users WHERE name = :name";
    $stmt = $dbh->prepare($sql);
    $stmt->bindValue(':name', $name);
    $stmt->execute();
    $member = $stmt->fetch();
    //指定したハッシュがパスワードにマッチしているかチェック
    $password_hash_check = password_verify($_POST['pass'], $member['password']);
    if ($password_hash_check === true) {
        //DBのユーザー情報をセッションに保存
        $_SESSION['name'] = $member['name'];
        $_SESSION['pass'] = $member['password'];
        $msg = LOGIN_SUCCESS;
    } else {
        $msg = LOGIN_FAILED;
    }
    // JSに配列を返す
    $list = array("name" => $name, "SID" => session_id(), "msg" => $msg );
    echo json_encode($list);
?>