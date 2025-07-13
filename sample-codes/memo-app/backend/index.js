// 必要な外部ライブラリを読み込む
const express = require('express')  // Webサーバーを構築するためのフレームワーク
const cors = require('cors')        // フロントエンドと通信するためのCORS設定
const db = require('./db')          // データベース接続設定を記述した外部ファイル(db.jsのこと)

const app = express()              // Expressアプリケーションを作成
const PORT = 3000                  // このサーバーが待ち受けるポート番号

// ミドルウェアを設定（全体に適用される共通の処理）
app.use(cors())                    // CORSを有効化（他ポートからの通信を許可）
app.use(express.json())            // JSON形式のリクエストボディをパースできるようにする

// ============================
// APIのルーティング処理（CRUD）
// ============================

// メモ一覧を取得する（GETリクエスト）
app.get('/api/memos', (req, res) => {
  // memosテーブルの全データを取得して返す
  db.query('SELECT * FROM memos ORDER BY id DESC', (err, results) => {
    if (err) return res.status(500).send(err)  // エラー時はステータス500で返す
    res.json(results)  // 正常なら取得したデータをJSONで返す
  })
})

// 新しいメモを追加する（POSTリクエスト）
app.post('/api/memos', (req, res) => {
  const { content } = req.body  // リクエストボディからcontentを取り出す
  // memosテーブルに新しいメモを挿入
  db.query('INSERT INTO memos (content) VALUES (?)', [content], (err) => {
    if (err) return res.status(500).send(err)
    res.sendStatus(201)  // ステータス201 Created を返す
  })
})

// 特定のメモを削除する（DELETEリクエスト）
app.delete('/api/memos/:id', (req, res) => {
  const memoId = req.params.id  // URLパラメータからidを取得
  // memosテーブルから指定されたidの行を削除
  db.query('DELETE FROM memos WHERE id = ?', [memoId], (err) => {
    if (err) return res.status(500).send(err)
    res.sendStatus(204)  // ステータス204 No Content を返す（削除成功）
  })
})

// ============================
// サーバー起動
// ============================

app.listen(PORT, () => {
  // この関数はサーバー起動後に1回だけ実行される
  console.log(`Server running on http://localhost:${PORT}`)
})
