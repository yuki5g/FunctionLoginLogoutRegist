// 定数一覧
const LOGIN = 'ログイン'
const LOGOUT = 'ログアウト'
const REGIST = '登録'
const REGIST_COMPLETE = '登録完了'
const LOGOUT_COMPLETE = 'ログアウトしました。'
const NO_INPUT_VALUE = 'ユーザ名、パスワードを入力してください。'
const GREETING = 'さん こんにちは'
const ERROR_MESSAGE1 = '同じユーザ名が存在します。'
const ERROR_MESSAGE2 = 'ユーザ名もしくはパスワードが間違っています。'
const LOGOUT_FAILED = 'ログアウトに失敗'
const RESULT_ZERO = '検索結果は0件でした。'
const FAVORITE_NO_REGIST = '登録しましょう！'
const PROCESSING_RESULT_0 = 0;
const PROCESSING_RESULT_1 = 1;
const PROCESSING_RESULT_2 = 2;

var session = false;
// アクセス、画面リフレッシュ時のSessionNameチェック(ボタン制御)
$.ajax({
  type: "post",
  url: "sessionConfirm.php",
  dataType : "text"
})
.then(
  function(data)
  {
    if(data){
      DisplayButtonSessionNameEnable();
      // あいさつ表示
      document.getElementsByClassName("greeting")[0].innerText  = data + GREETING;
      session = true;
    }
    else{
      DisplayButtonSessionNameDiseble();
      session = false;
    }
  })

// ログイン
function login(){
  Swal.fire({
    title: LOGIN,
    html: `<input type="text" id="name" class="swal2-input" placeholder="ユーザ名">
    <input type="password" id="pass" class="swal2-input" placeholder="パスワード">`,
    type : 'info',
    confirmButtonText: LOGIN,
    focusConfirm: false,
    preConfirm: () => {
      const name = Swal.getPopup().querySelector('#name').value
      const pass = Swal.getPopup().querySelector('#pass').value
      if (!name || !pass) {
        Swal.showValidationMessage(NO_INPUT_VALUE)
      }
    }
  }).then((result) => {
      //入力値をdata配列に格納
      var data = {
      name : Swal.getPopup().querySelector('#name').value,
      pass : Swal.getPopup().querySelector('#pass').value
    };

    // 入力されたユーザ名を保持
    var username = data.name;

    $.ajax({
      type: "post",
      url: "login.php",
      data: data,
      dataType : "json"
    })
    .then(
      function(data)
      {
        // 入力値がない場合
        if(data["msg"] == PROCESSING_RESULT_2)
        {
          // 何もしない
        }
        // ログイン成功
        else if(data["msg"] == PROCESSING_RESULT_0){
          console.log(data);
          Swal.fire({
            title: data["msg"],
            text: username + GREETING,
            type : 'success',
            confirmButtonText: 'OK',
            focusConfirm: false,
          }),
          session = true;
          //あいさつ
          document.getElementsByClassName("greeting")[0].innerText  = username + GREETING;

          DisplayButtonSessionNameEnable();
        }
      },
      // 入力値ミスの場合
      function(){
        Swal.fire({
          title: ERROR_MESSAGE2,
          type : 'error',
          confirmButtonText: 'OK',
          focusConfirm: false,
        });
      })
    })
}

// 
function DisplayButtonSessionNameEnable(){
  // あいさつ
  $(".greeting").css({
    "display" : "inline"
  }),
  // ログイン
  $("#btn01").css({
    "display" : "none"
  }),
  //登録
  $("#btn02").css({
    "display" : "none"
  }),
  // ログアウト
  $("#btn03").css({
    "display" : "inline"
  })
}

function DisplayButtonSessionNameDiseble(){
  // あいさつ
  $(".greeting").css({
    "display" : "none"
  }),
  // ログイン
  $("#btn01").css({
    "display" : "inline"
  }),
  //登録
  $("#btn02").css({
    "display" : "inline"
  }),
  //ログアウト
  $("#btn03").css({
    "display" : "none"
  })
}

// ログアウト
function logout(){
      var data = "";
      $.ajax({
        type: "post",
        url: "logout.php",
        data: data
      }).then(
        function(ret)
        {
          if(ret){
            Swal.fire({
              title: LOGOUT_COMPLETE,
              type : 'info',
              confirmButtonText: 'OK',
              focusConfirm: false,
            }),
            session = false;
          }else{
            Swal.fire({
              title: LOGOUT_FAILED,
              type : 'warning',
              confirmButtonText: 'OK',
              focusConfirm: false,
            })
          }
        })
        DisplayButtonSessionNameDiseble();        
}
  
// 登録
  function regist(){
      Swal.fire({
        title: REGIST,
        html: `<input type="text" id="name" class="swal2-input" placeholder="ユーザ名">
        <input type="password" id="pass" class="swal2-input" placeholder="パスワード">`,
        type : 'info',
        confirmButtonText: REGIST,
        focusConfirm: false,
        preConfirm: () => {
          const name = Swal.getPopup().querySelector('#name').value
          const pass = Swal.getPopup().querySelector('#pass').value
          if (!name || !pass) {
            Swal.showValidationMessage(NO_INPUT_VALUE)
          }
        }
      }).then((result,callback) => {
        //入力値をdata配列に格納
        var data = {
          name : Swal.getPopup().querySelector('#name').value,
          pass : Swal.getPopup().querySelector('#pass').value
        };
        
        $.ajax({
          //regist.phpに登録情報をPOST
          type: "post",
          url: "regist.php",
          data: data
        })
        .then(
          function(data)
          {
            var data = data.substr(0,1);
            if(data == PROCESSING_RESULT_1){
              document.forms[0].elements[0].value="";
              document.forms[0].elements[1].value="";
              //同じユーザ名が存在
              Swal.fire({
                title: ERROR_MESSAGE1,
                type : 'error',
                confirmButtonText: 'OK',
                focusConfirm: false,
              })
            }
            else if(data == PROCESSING_RESULT_2)
            {
              // 何もしない
            }
            else if(data == PROCESSING_RESULT_0){
              //ユーザ登録成功
              Swal.fire({
                title: REGIST_COMPLETE,
                type : 'success',
                confirmButtonText: 'OK',
                focusConfirm: false,
              })
            }
          })
        });
        return false;
  }