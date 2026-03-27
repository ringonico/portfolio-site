# Game Planner Portfolio

ゲームプランナー向けポートフォリオサイトです。
Astro + Markdown で構築されており、GitHub Pages で公開できます。

## サイト構成

| パス | ページ | 内容 |
|------|--------|------|
| `/` | 自己紹介 | プロフィール・自己PR・プレイゲーム一覧 |
| `/works/` | 実績一覧 | 業務実績（NDA配慮対応） |
| `/games/` | 制作ゲーム | 個人/チーム制作ゲーム |
| `/plans/` | 企画書 | ゲーム企画書（ライトボックス表示） |
| `/articles/` | 記事一覧 | ブログ記事（検索・タグ絞り込み） |

## コンテンツの追加方法

### 記事を追加する

`src/content/articles/` に `.md` ファイルを作成：

```markdown
---
title: "記事タイトル"
date: "2026-04-01"
tags: ["ゲーム分析", "RPG"]
category: "ゲーム分析"
summary: "記事の概要"
thumbnail: "/images/articles/default.png"
relatedGame: "関連ゲーム名（任意）"
---

ここに本文を書く
```

### 実績を追加する

`src/content/works/` に `.md` ファイルを作成：

```markdown
---
title: "実績タイトル"
summary: "概要"
role: "担当範囲"
highlight: "工夫した点"
learning: "学んだこと"
skills: ["スキル1", "スキル2"]
thumbnail: "/images/works/default.png"
order: 3
---

詳細な説明（任意）
```

### 制作ゲームを追加する

`src/content/games/` に `.md` ファイルを作成：

```markdown
---
title: "ゲームタイトル"
summary: "概要"
thumbnail: "/images/games/default.png"
period: "2026年1月〜3月"
tools: ["Unity", "C#"]
role: "企画・プログラム"
url: "https://example.com/game"
order: 3
---

詳細な説明（任意）
```

### 企画書を追加する

`src/content/plans/` に `.md` ファイルを作成：

```markdown
---
title: "企画書タイトル"
summary: "概要"
genre: "ジャンル"
purpose: "企画の目的"
point: "アピールポイント"
thumbnail: "/images/plans/default.png"
pdfUrl: "/path/to/pdf"
order: 3
---

詳細な説明（任意）
```

### プレイゲーム一覧を編集する

`src/data/played-games.json` を編集して項目を追加：

```json
{
  "name": "ゲーム名",
  "genre": "ジャンル",
  "platform": "プラットフォーム",
  "articleSlug": "関連記事のファイル名（拡張子なし）",
  "comment": "ひとことコメント"
}
```

### 自己紹介を編集する

`src/content/profile/intro.md` を編集してください。

## コマンド

| コマンド | 説明 |
|----------|------|
| `npm install` | 依存関係のインストール |
| `npm run dev` | 開発サーバー起動（localhost:4321） |
| `npm run build` | 本番ビルド（`./dist/`に出力） |
| `npm run preview` | ビルド結果のプレビュー |

## GitHub Pages での公開手順

1. GitHubに新しいリポジトリを作成
2. `astro.config.mjs` の `site` を自分のURLに変更
   - `https://USERNAME.github.io` の場合はそのまま
   - `https://USERNAME.github.io/REPO_NAME` の場合は `base: '/REPO_NAME'` も追加
3. コードをpush：
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/USERNAME/REPO_NAME.git
   git push -u origin main
   ```
4. GitHub リポジトリの Settings → Pages → Source を **GitHub Actions** に設定
5. 自動的にビルド＆デプロイされます

## どこを触れば何が変わるか

| 変更したいこと | 編集するファイル |
|----------------|-----------------|
| 自己紹介文 | `src/content/profile/intro.md` |
| プレイゲーム一覧 | `src/data/played-games.json` |
| 記事の追加 | `src/content/articles/` に `.md` を追加 |
| 実績の追加 | `src/content/works/` に `.md` を追加 |
| 制作ゲームの追加 | `src/content/games/` に `.md` を追加 |
| 企画書の追加 | `src/content/plans/` に `.md` を追加 |
| サイト名 | `src/layouts/BaseLayout.astro` の `siteTitle` |
| 配色 | `src/styles/global.css` の `:root` 変数 |
| ナビゲーション | `src/layouts/BaseLayout.astro` の `tabs` 配列 |
| OGP・メタ情報 | `src/layouts/BaseLayout.astro` の `<head>` |

## 技術構成

- [Astro](https://astro.build/) v6 — 静的サイトジェネレーター
- Astro Content Collections — Markdownベースのコンテンツ管理
- バニラCSS + JS — 軽量でシンプル
- GitHub Actions — 自動ビルド＆デプロイ
