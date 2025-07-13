// MySQL データベースに接続するためのライブラリを読み込む
const mysql = require('mysql2')

// 接続情報を設定（自分のMySQL環境に合わせて修正）
const connection = mysql.createConnection({
  host: 'localhost',     // データベースのホスト名（通常はローカル開発なら localhost）
  user: 'root',          // データベースのユーザー名（初期設定では root）
  password: '-',          // 自分がMySQLインストール時に設定したパスワードをここに記述
  database: 'memo_db',   // 使用するデータベース名（SQLで作成したもの）
})

// データベースに接続する
connection.connect((err) => {
  if (err) {
    console.error('MySQL接続エラー:', err.message)
    return
  }
  console.log('MySQLに接続しました')
})

// 他のファイル（例：index.js）からこの接続を使えるようにする
module.exports = connection
