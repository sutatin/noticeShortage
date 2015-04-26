function myFunction() {
  //この関数を画面上部のトリガーから日ごととか設定する。 
  noticeShortage();
}

/**
 * 消耗品リストを監視して不足があればメールする。
 */
function noticeShortage() {

  //変数spreadsheetに指定のスプレッドシートオブジェクトを取得
  var url = "https://docs.google.com/spreadsheets/******/edit#gid=***";
  var spreadsheet = SpreadsheetApp.openByUrl(url);

  //シート名でシートオブジェクトを取得
  var sheet = spreadsheet.getSheetByName("シート名");

  // データが入力されている範囲を取得
  var datRange = sheet.getDataRange();
  var numRows = datRange.getNumRows();
  var numColumns = datRange.getNumColumns();
          
  //データを取得、以後sheetdata[getRowNum(行数)][getColNum(アルファベット)]で利用可能。
  var sheetdata = sheet.getSheetValues(1, 1, numRows, numColumns);

  //ログ例：これなら画面上部の表示＞ログに消耗品リストページの３Cの「品物」が表示される。
  Logger.log("ログサンプル　"+sheetdata[getRowNum(3)][getColNum("C")]);
  
  //不足物が無いか確認しあればメールを送付
  for (i=4; i<=numRows; i++) {
    Logger.log("ログサンプル　"+sheetdata[getRowNum(i)][getColNum("E")]);
    if(sheetdata[getRowNum(i)][getColNum("E")]=="無"){
       sendMail(sheetdata[getRowNum(i)][getColNum("C")]);
      }
  } 
};

/**
 * 不足物の内容をメールする。
 */
function sendMail(shortageName){
  // メール件名を作成
  var tmpDay = new Date().toLocaleDateString();
  var subject = "【自動送信】："+tmpDay+"に"+shortageName+"が無くなったようです";

  // メール本文を作成
  var body = shortageName +"が不足しています。\nこのメールは\n"+
    "https://docs.google.com/spreadsheets/****/edit#gid=****"
  +"\nのシートを監視して自動送信されています。"
  +"\n該当品物を補充して無から有に変更して自動送信対象から外してください。"
  +"\n\n"
  +"\nなお自動送信のソースは\n"
  +"https://drive.google.com/open?id=****"
  +"\nに存在しています。";

  // 宛先を作成
  var to = "****@****";
  var cc = "****@****";

  //送信処理
  MailApp.sendEmail(to, subject, body, {cc:cc});
}

//列アルファベットと配列数の変換メソッド、本当はenum化したい
function getColNum(chr){
   if(chr=="A"){
     return 0
   }else if(chr =="B"){
     return 1
   }else if(chr == "C"){
     return 2
   }else if(chr == "D"){
     return 3
   }else if(chr == "E"){
     return 4
   }else if(chr == "F"){
     return 5
   }else if(chr == "G"){
     return 6
   }
}

function getRowNum(num){
  --num
  return num
}