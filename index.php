<?php
	// header("Content-type: text/plain; charset=UTF-8");
	session_start();
?>
<!DOCTYPE html>
<html lang="ja">
	<head>
		<meta charset="UTF-8">
		<!-- CSS -->
		<link rel="stylesheet" type="text/css" href="style.css">
		<!-- Google Fonts -->
		<link rel="preconnect" href="https://fonts.googleapis.com">
		<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
		<link href="https://fonts.googleapis.com/css2?family=Shrikhand&display=swap" rel="stylesheet">
		<!-- JS -->
		<!-- jQuery -->
		<script src="jquery-3.6.0.min.js"></script>
		<!-- SweetAlert -->
		<script src="https://cdn.jsdelivr.net/npm/sweetalert2@8"></script>
		<!-- main.js -->
		<script type="text/javascript" src="main.js"></script>
		<!-- viewport設定 -->
		<meta name=”viewport” content=”width=device-width, initial-scale=1”>

		<title>ログイン・ログアウト・登録機能テスト</title>		
	</head>

	<body>
		<!-- タイトルバー -->
		<header>
			<div id="title">
				<h1 class="title">ログイン・ログアウト・登録機能テスト</h1>
			</div>
			<!-- あいさつ -->
			<div id="greeting">
				<p class="greeting"></p>
			</div>
			<!-- ログイン/ログアウト/登録ボタン -->
			<div id="buttons">
				<a method="post" id="btn01" class="bt-samp30" onclick="login()">ログイン</a>
				<a method="post" id="btn02" class="bt-samp30" onclick="regist()">登録</a>
				<a method="get" id="btn03" class="bt-samp30" onclick="logout()">ログアウト</a>
			</div>
		</header>

		<!-- フッター -->
		<footer>
			<p class="footer">© 2022</p>
		</footer>
		</div>
	</body>
</html>