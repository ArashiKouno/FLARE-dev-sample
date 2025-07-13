# API仕様書

## GET /api/memos
- 概要: メモ一覧を取得
- レスポンス: メモの配列（id, content, created_at）

## POST /api/memos
- 概要: 新規メモを追加
- リクエスト: { "content": "メモ内容" }
- レスポンス: ステータス201 Created

## DELETE /api/memos/:id
- 概要: 指定したIDのメモを削除
- パスパラメータ: id
- レスポンス: ステータス204 No Content
