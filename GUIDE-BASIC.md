# ポートフォリオサイト 基本情報ガイド

このガイドでは、サイトのファイル構成、Markdownの書き方、公開方法、よくある質問をまとめています。

> 日常の更新手順や編集方法については [GUIDE.md](./GUIDE.md) を参照してください。

---

## 目次

1. [サイト情報](#1-サイト情報)
2. [ファイル構成の全体像](#2-ファイル構成の全体像)
3. [Markdownの書き方](#3-markdownの書き方)
4. [公開方法（Cloudflare Pages / GitHub Pages）](#4-公開方法cloudflare-pages--github-pages)
5. [よくある質問](#5-よくある質問)

---

## 1. サイト情報

| 項目 | 内容 |
|---|---|
| 公開URL | https://gameplanner-ringonico.pages.dev/ |
| ホスティング | Cloudflare Pages |
| フレームワーク | Astro（静的サイト生成） |
| Node.js | v22 以上 |

---

## 2. ファイル構成の全体像

```
portfolio/
├── public/                      ← 画像などの置き場
│   └── images/
│       ├── articles/            ← 記事のサムネイル
│       ├── works/               ← 実績のサムネイル
│       ├── games/               ← 制作ゲームのサムネイル
│       └── plans/               ← 企画書のサムネイル
│
├── src/
│   ├── content/                 ← ★ コンテンツ（ここを主に触る）
│   │   ├── profile/
│   │   │   └── intro.md         ← 自己紹介ページの文章
│   │   ├── articles/            ← 記事（Markdownファイル）
│   │   ├── works/               ← 実績（Markdownファイル）
│   │   ├── games/               ← 制作ゲーム（Markdownファイル）
│   │   └── plans/               ← 企画書（Markdownファイル）
│   │
│   ├── data/
│   │   └── played-games.json    ← プレイしたゲーム一覧
│   │
│   ├── styles/
│   │   └── global.css           ← デザイン（色・フォント・配置）
│   │
│   ├── layouts/
│   │   └── BaseLayout.astro     ← サイト名・ナビゲーション
│   │
│   └── pages/                   ← ページの構造（基本触らなくてOK）
│
└── astro.config.mjs             ← 公開設定
```

### 触るファイルの早見表

| やりたいこと | 触るファイル |
|---|---|
| 自己紹介を書き換える | `src/content/profile/intro.md` |
| 記事を追加する | `src/content/articles/` に `.md` を新規作成 |
| 実績を追加する | `src/content/works/` に `.md` を新規作成 |
| 制作ゲームを追加する | `src/content/games/` に `.md` を新規作成 |
| 企画書を追加する | `src/content/plans/` に `.md` を新規作成 |
| プレイゲーム一覧を追加する | `src/data/played-games.json` を編集 |
| 画像を追加する | `public/images/` フォルダに画像を置く |
| サイト名を変える | `src/layouts/BaseLayout.astro` の `siteTitle` |
| 色を変える | `src/styles/global.css` の `:root` 内の変数 |
| フォントを変える | `src/styles/global.css` の `--font-heading` 等 |

---

## 3. Markdownの書き方

記事や各コンテンツの本文はMarkdown記法で書きます。
よく使う書き方をまとめます。

### 3-1. 基本の書き方

```markdown
## 大見出し
### 中見出し
#### 小見出し

普通の文章はそのまま書けます。

段落を分けるには、1行空けます。

**太字テキスト**

*斜体テキスト*

~~打ち消し線~~

[リンクテキスト](https://example.com)

![画像の説明](/images/articles/photo.png)
```

### 3-2. 箇条書き

```markdown
- 項目1
- 項目2
  - サブ項目（先頭にスペース2つ）
- 項目3

1. 番号付き項目1
2. 番号付き項目2
3. 番号付き項目3
```

### 3-3. 表（テーブル）

```markdown
| 列1 | 列2 | 列3 |
|-----|-----|-----|
| A   | B   | C   |
| D   | E   | F   |
```

### 3-4. 引用

```markdown
> これは引用文です。
> 他の人の言葉や、注意書きに使えます。
```

### 3-5. コードブロック

````markdown
```
ここにコードを書く
```
````

### 3-6. 水平線（区切り線）

```markdown
---
```

---

## 4. 公開方法（Cloudflare Pages / GitHub Pages）

### 4-1. 事前準備

- [GitHub](https://github.com/) のアカウントを作る（無料）
- [Git](https://git-scm.com/) をインストールする
- [Node.js](https://nodejs.org/) v22 以上をインストールする

### 4-2. Cloudflare Pages で公開する場合（現在の設定）

現在このサイトは Cloudflare Pages で公開されています。
GitHubにpushすると、Cloudflare Pagesが自動でビルド＆デプロイします。

公開URL：https://gameplanner-ringonico.pages.dev/

### 4-3. GitHub Pages で公開する場合

GitHub Pagesで公開したい場合は `astro.config.mjs` の設定を変更します。

#### astro.config.mjs を自分のURLに変更

```javascript
// ① リポジトリ名が「USERNAME.github.io」の場合（個人サイト）
export default defineConfig({
  site: 'https://あなたのユーザー名.github.io',
  output: 'static',
  build: { assets: '_assets' },
});

// ② リポジトリ名がそれ以外の場合（例：portfolio）
export default defineConfig({
  site: 'https://あなたのユーザー名.github.io',
  base: '/portfolio',       // ← リポジトリ名を書く
  output: 'static',
  build: { assets: '_assets' },
});
```

> **注意：** ② の場合、URLは `https://あなたのユーザー名.github.io/portfolio/` になります。

#### コードをGitHubにアップする（初回）

```bash
# Gitを初期化
git init

# すべてのファイルを追加
git add .

# 最初のコミット
git commit -m "Initial commit"

# mainブランチにする
git branch -M main

# GitHubのリポジトリと接続（URLは自分のものに変える）
git remote add origin https://github.com/あなたのユーザー名/portfolio.git

# アップロード
git push -u origin main
```

#### GitHub Pagesを有効にする

1. GitHubのリポジトリページに行く
2. 「Settings」タブをクリック
3. 左メニューの「Pages」をクリック
4. 「Source」を **「GitHub Actions」** に変更
5. これだけでOK！

#### base を設定した場合の注意点

`astro.config.mjs` に `base: '/portfolio'` を設定した場合、
サイト内のすべてのリンクに自動で `/portfolio` が追加されます。

ただし、**画像のパスやfrontmatterの `thumbnail`** は手動で合わせる必要があります：

```markdown
# base なし → そのまま
thumbnail: "/images/articles/my-pic.png"

# base: '/portfolio' あり → 先頭に base を付ける
thumbnail: "/portfolio/images/articles/my-pic.png"
```

> もしくは、リポジトリ名を `ユーザー名.github.io` にすれば `base` は不要で、
> この問題自体が発生しません（おすすめ）。

---

## 5. よくある質問

### Q. ファイル名は日本語でもいい？

**A. 英語にしてください。** `.md` のファイル名はURLの一部になるため、
英語で `-` 区切りにしてください（例：`my-first-article.md`）。

### Q. frontmatter（`---`）の書き方を間違えたらどうなる？

**A. ビルドエラーになります。** よくあるミス：
- `tags` の `[]` や `""` が抜けている
- コロン `:` の後にスペースがない
- 日本語を `""` で囲んでいない

### Q. 記事の順番を変えたい

**A.**
- 記事は `date`（日付）が新しい順に自動で並びます
- 実績・制作ゲーム・企画書は `order` の数字が小さい順に並びます

### Q. タグを新しく作りたい

**A. frontmatterの `tags` に新しいタグ名を書くだけです。**
自動的にタグ一覧に表示されます。

```markdown
tags: ["新しいタグ名", "既存のタグ"]
```

### Q. デフォルトのサムネイルを変えたい

**A.** 好きな画像を `public/images/articles/default.png` として置けば、
`thumbnail` を指定していない記事すべてに適用されます。
（works, games, plans も同様）

### Q. サイト名を変えたい

**A.** `src/layouts/BaseLayout.astro` を開いて、以下の行を変更：

```javascript
const siteTitle = 'Game Planner Portfolio';  // ← ここを好きな名前に
```

### Q. ナビゲーションのタブを変えたい

**A.** 同じファイルの `tabs` 配列を編集します：

```javascript
const tabs = [
  { href: '/', label: '自己紹介', icon: '👤', id: 'about', color: 'var(--tab-about)' },
  // label や icon を変更できる
];
```
