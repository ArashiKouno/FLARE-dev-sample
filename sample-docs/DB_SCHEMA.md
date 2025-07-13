# DBスキーマ定義書

## テーブル: memos

| カラム名     | データ型     | 説明         |
|--------------|--------------|--------------|
| id           | INT AUTO_INCREMENT | 主キー |
| content      | TEXT         | メモ本文     |
| created_at   | TIMESTAMP DEFAULT CURRENT_TIMESTAMP | 作成日時 |


```sql
CREATE DATABASE IF NOT EXISTS memo_db DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE memo_db;

CREATE TABLE IF NOT EXISTS memos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  content TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```