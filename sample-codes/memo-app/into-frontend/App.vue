<template>
  <div id="app">
    <!-- アプリのタイトル -->
    <h1>メモ帳アプリ</h1>
    <p>たくさんいじって改良してね</p>
    <!-- メモ入力フォーム -->
    <!-- @submit.prevent: フォーム送信時のリロードを防ぎ、addMemo 関数を実行 -->
    <form @submit.prevent="addMemo">
      <!-- v-model: 入力された文字列を newMemo にリアルタイムで反映 -->
      <input v-model="newMemo" placeholder="新しいメモ" />
      <button>追加</button>
    </form>

    <!-- メモ一覧表示 -->
    <!-- v-for: memos 配列の中身を1件ずつ表示 -->
    <ul>
      <li v-for="memo in memos" :key="memo.id">
        <!-- メモの本文を表示 -->
        {{ memo.content }}
        <!-- このメモを削除するボタン -->
        <button @click="deleteMemo(memo.id)">削除</button>
      </li>
    </ul>
  </div>
</template>

<script setup>
// Vueの Composition API を使う（ref: 状態変数, onMounted: 初期化フック）
import { ref, onMounted } from 'vue'

// HTTP通信のためのライブラリ（Axios）をインポート
import axios from 'axios'

// 状態変数（リアクティブなデータ）を定義
const memos = ref([])         // 表示するメモ一覧（配列）
const newMemo = ref('')       // 入力中のメモ内容（文字列）

// メモ一覧を取得する関数
const fetchMemos = async () => {
  // バックエンドAPI（localhost:3000に所在）の '/api/memos' に GET リクエストを送り、メモ一覧を取得（HTTPリクエスト）
  const res = await axios.get('http://localhost:3000/api/memos')
  memos.value = res.data  // 取得したメモ一覧を memos に代入し、画面に反映される
}

// メモを追加する関数
const addMemo = async () => {
  if (!newMemo.value) return  // 空文字なら何もしない

  // '/api/memos' に POST リクエストを送り、{ content: 入力された文字 } を新規登録
  await axios.post('http://localhost:3000/api/memos', { content: newMemo.value })

  newMemo.value = ''  // 入力欄を空にする
  fetchMemos()        // 再取得して一覧を更新
}

// メモを削除する関数（引数：削除対象のメモID）
const deleteMemo = async (id) => {
  // '/api/memos/:id' に DELETE リクエストを送信（IDを添えて）して、該当メモを削除
  await axios.delete(`http://localhost:3000/api/memos/${id}`)
  fetchMemos()  // 再取得して一覧を更新
}

// 初回表示時（マウント時）に一覧取得を実行
onMounted(fetchMemos)
</script>

<style scoped>
/* スタイルをこのコンポーネント内だけに適用（scoped） */
body {
  font-family: sans-serif;
}
input {
  margin-right: 10px;
}
</style>
