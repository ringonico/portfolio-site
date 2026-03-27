# ポートフォリオサイト 編集・公開ガイド

このガイドでは「何をどう触ればいいか」をすべて説明します。
プログラミングの知識がなくても、このガイドに沿えば更新できます。

---

## 目次

1. [ファイル構成の全体像](#1-ファイル構成の全体像)
2. [文章を変える方法](#2-文章を変える方法)
3. [新しい項目・記事を作る方法](#3-新しい項目記事を作る方法)
4. [画像を入れる方法](#4-画像を入れる方法)
5. [文字のフォント・大きさ・配置を変える方法](#5-文字のフォント大きさ配置を変える方法)
6. [色を変える方法](#6-色を変える方法)
7. [Markdownの書き方](#7-markdownの書き方)
8. [GitHub Pagesで公開する方法](#8-github-pagesで公開する方法)
9. [更新の流れ（日常運用）](#9-更新の流れ日常運用)
10. [よくある質問](#10-よくある質問)

---

## 1. ファイル構成の全体像

```
ポートフォリオ/
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
└── astro.config.mjs             ← 公開設定（GitHub Pages用）
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

## 2. 文章を変える方法

### 2-1. 自己紹介ページの文章を変える

**ファイル：** `src/content/profile/intro.md`

このファイルを開くと、こんな構造になっています：

```markdown
---
name: "あなたの名前"
catch: "ゲームの「おもしろい」を設計する人"
---

## あいさつ

はじめまして！ゲームプランナーとして活動しています。
（ここを自由に書き換える）

## プロフィール

| 項目 | 内容 |
|------|------|
| 名前 | あなたの名前 |
| 職種 | ゲームプランナー |
（行を増やしたり書き換えたりできる）

## 自己PR

（ここを自由に書き換える）
```

**変え方：**

- `---` で囲まれた部分（**frontmatter**）→ `name:` と `catch:` を自分のものに変える
- `## あいさつ` の下 → 好きなあいさつ文に書き換える
- `## プロフィール` の表 → 行の `|` の中を書き換える
- `## 自己PR` の下 → 自分の強みに書き換える

### 2-2. 既存の記事・実績の文章を変える

各フォルダ内の `.md` ファイルを開いて、中のテキストを直接書き換えるだけです。

例：`src/content/articles/zelda-totk-analysis.md` を開いて本文を編集

---

## 3. 新しい項目・記事を作る方法

### 3-1. 記事を追加する

**場所：** `src/content/articles/` フォルダ

**手順：**

1. フォルダ内に新しい `.md` ファイルを作る
2. ファイル名は英語で、単語を `-` でつなぐ（例：`my-new-article.md`）
3. 以下のテンプレートをコピーして使う

```markdown
---
title: "記事のタイトル"
date: "2026-04-01"
tags: ["ゲーム分析", "RPG"]
category: "ゲーム分析"
summary: "記事の概要を1〜2行で"
thumbnail: "/images/articles/default.png"
relatedGame: "関連するゲーム名（なければこの行を消してOK）"
---

## 見出し

ここから本文を自由に書いてください。

普通の文章はそのまま書けます。
改行したいときは、1行空けます。

### 小見出し

- 箇条書きも使えます
- こんなふうに

**太字** や *斜体* も使えます。
```

**frontmatter（`---` で囲まれた部分）の意味：**

| 項目 | 意味 | 必須？ | 例 |
|---|---|---|---|
| `title` | 記事のタイトル | ✅ 必須 | `"ゼルダの分析"` |
| `date` | 公開日 | ✅ 必須 | `"2026-04-01"` |
| `tags` | タグ（絞り込みに使う） | あると便利 | `["ゲーム分析", "RPG"]` |
| `category` | カテゴリー | あると便利 | `"ゲーム分析"` |
| `summary` | 一覧に出る概要文 | あると便利 | `"概要テキスト"` |
| `thumbnail` | サムネイル画像 | なくてもOK | `"/images/articles/my-pic.png"` |
| `relatedGame` | 関連ゲーム名 | なくてもOK | `"ゼルダの伝説"` |

> **ポイント：** `tags` は `["タグ1", "タグ2"]` のように `[]` と `""` で囲みます。

### 3-2. 実績を追加する

**場所：** `src/content/works/`

```markdown
---
title: "プロジェクト名"
summary: "何をしたか一言で"
role: "担当した役割"
highlight: "工夫したポイント"
learning: "学んだこと"
skills: ["企画書作成", "バランス調整", "Excel"]
thumbnail: "/images/works/default.png"
order: 3
---

## 概要

（詳しい説明を自由に書く）

## 担当範囲

- やったこと1
- やったこと2

## 工夫した点

（自由に書く）
```

> **NDA配慮：** `title` には会社名を書かず「ソーシャルゲーム運用」のように書けばOKです。
> 数値や固有名詞を避けて、学びや工夫にフォーカスする書き方を推奨します。

> **`order` について：** 数字が小さいほど一覧で上に表示されます（1が一番上）。

### 3-3. 制作ゲームを追加する

**場所：** `src/content/games/`

```markdown
---
title: "ゲームタイトル"
summary: "どんなゲームか一言で"
thumbnail: "/images/games/default.png"
period: "2026年1月〜3月（約3ヶ月）"
tools: ["Unity", "C#", "Aseprite"]
role: "企画・プログラム"
url: "https://example.com/my-game"
order: 3
---

## ゲーム概要

（自由に書く）

## コンセプト

（自由に書く）

## こだわりポイント

- ポイント1
- ポイント2
```

> **`url` について：** 公開URLがまだなければ `url: ""` のまま空にしてOKです。
> 後から追加すれば自動的にリンクが表示されます。

### 3-4. 企画書を追加する

**場所：** `src/content/plans/`

```markdown
---
title: "企画書タイトル"
summary: "どんなゲームの企画か一言で"
genre: "ジャンル名"
purpose: "この企画の目的"
point: "アピールポイント"
thumbnail: "/images/plans/default.png"
order: 3
---

## 企画概要

（自由に書く）

## ターゲットユーザー

- ターゲット1
- ターゲット2

## コアメカニクス

（自由に書く）
```

> **PDFを貼りたい場合：** frontmatterに `pdfUrl: "/files/my-plan.pdf"` を追加し、
> PDFファイルを `public/files/` フォルダに置いてください。

### 3-5. プレイしたゲームを追加する

**ファイル：** `src/data/played-games.json`

この中に、以下の形式で1つ追加します：

```json
[
  （既にあるデータ...）,
  {
    "name": "ゲーム名",
    "genre": "ジャンル名",
    "articleSlug": ""
  }
]
```

| 項目 | 意味 | 例 |
|---|---|---|
| `name` | ゲームの正式名称 | `"ゼルダの伝説 TotK"` |
| `genre` | ジャンル（同じジャンルのものはグループ化される） | `"アクションRPG"` |
| `articleSlug` | このゲームの記事のファイル名（拡張子なし）。なければ `""` | `"zelda-totk-analysis"` |

> **記事とのリンク：** `articleSlug` にファイル名を書くと、ゲーム一覧で
> タイトルが青くなり、クリックで記事に飛べるようになります。

**追加の注意点：**
- 最後の項目の `}` の後にカンマ `,` を付けないでください（JSONのルール）
- `genre` が既存のジャンルと同じ文字なら、自動でそのグループに入ります
- 新しいジャンル名を書けば、新しいグループが自動で作られます

---

## 4. 画像を入れる方法

### 4-1. 画像ファイルの置き場

画像は `public/images/` フォルダの中に置きます。

```
public/
└── images/
    ├── articles/     ← 記事用
    ├── works/        ← 実績用
    ├── games/        ← 制作ゲーム用
    └── plans/        ← 企画書用
```

> **初回は `images` フォルダを自分で作る必要があります。**
> （まだ存在しない場合）

### 4-2. サムネイル画像を設定する

1. 画像を `public/images/articles/` などに置く（例：`my-photo.png`）
2. Markdownのfrontmatterで `thumbnail` を設定する

```markdown
---
title: "記事タイトル"
thumbnail: "/images/articles/my-photo.png"
---
```

> **パスの先頭は必ず `/` から始めてください。**
> `public` フォルダ自体はパスに含めません。
> - ✅ 正しい：`"/images/articles/my-photo.png"`
> - ❌ 間違い：`"public/images/articles/my-photo.png"`

### 4-3. 記事の本文に画像を入れる

Markdownの本文中に画像を入れるには：

```markdown
![画像の説明文](画像のパス)
```

**例：**

```markdown
## スクリーンショット

![ゲームのタイトル画面](/images/articles/screenshot-title.png)

このように、タイトル画面では〜
```

### 4-4. 画像サイズの推奨

| 用途 | 推奨サイズ | 形式 |
|---|---|---|
| サムネイル | 600×400px 程度 | PNG / JPG / WebP |
| 本文中の画像 | 横幅 800〜1200px 程度 | PNG / JPG / WebP |
| 企画書スライド | 横幅 1200px 程度 | PNG / JPG |

> **ファイルサイズに注意：** 大きすぎる画像はサイトの表示速度を落とします。
> 1枚あたり 500KB 以下が目安です。

---

## 5. 文字のフォント・大きさ・配置を変える方法

デザインの変更は `src/styles/global.css` を編集します。

### 5-1. フォントを変える

ファイルの上部にある `:root { }` の中に、フォント設定があります：

```css
/* フォント */
--font-heading: 'M PLUS Rounded 1c', 'Zen Maru Gothic', sans-serif;  /* 見出し用 */
--font-body: 'Zen Maru Gothic', 'M PLUS Rounded 1c', sans-serif;     /* 本文用 */
--font-accent: 'Stick', sans-serif;                                    /* アクセント用 */
```

**別のフォントに変えたい場合：**

1. [Google Fonts](https://fonts.google.com/) で好きなフォントを探す
2. ファイル先頭の `@import url(...)` を新しいフォントのURLに差し替える
3. `:root` 内のフォント名を書き換える

**例：「Noto Sans JP」に変える場合：**

```css
/* ファイル先頭の @import を差し替え */
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;700;900&display=swap');

/* :root 内のフォント名を変更 */
--font-heading: 'Noto Sans JP', sans-serif;
--font-body: 'Noto Sans JP', sans-serif;
```

### 5-2. 文字の大きさを変える

CSSファイル内で `font-size` を探して変更します。
主な場所：

```css
/* 本文の基準サイズ */
html {
  font-size: 16px;    /* ← ここを変えると全体に影響 */
}

/* ページタイトル */
.page-header h1 {
  font-size: 1.8rem;  /* ← 各ページの見出しサイズ */
}

/* カードのタイトル */
.card-title {
  font-size: 1.05rem;
}
```

**サイズの単位の意味：**

| 単位 | 意味 | 例 |
|---|---|---|
| `px` | 固定のピクセル数 | `16px` = 16ピクセル |
| `rem` | htmlの基準サイズの倍数 | `1.5rem` = 基準の1.5倍（24px） |
| `em` | 親要素のサイズの倍数 | `1.2em` = 親の1.2倍 |

> **おすすめ：** `rem` を使うと、全体のバランスを保ちながら調整しやすいです。

### 5-3. 文字の配置を変える

```css
/* 中央揃え */
text-align: center;

/* 左揃え（デフォルト） */
text-align: left;

/* 右揃え */
text-align: right;
```

**Markdown内で特定の段落だけ中央揃えにしたい場合：**

```markdown
<div style="text-align: center;">

この文章は中央揃えになります

</div>
```

### 5-4. 記事の本文中で文字サイズ・色を変えたい場合

Markdown内で直接HTMLを書くこともできます：

```markdown
普通のテキスト

<span style="font-size: 1.5rem; color: #ff6b9d;">大きくてピンクの文字</span>

<div style="font-size: 0.8rem; color: gray;">小さくてグレーの補足テキスト</div>
```

---

## 6. 色を変える方法

### 6-1. サイト全体の配色

`src/styles/global.css` の `:root { }` 内にある変数を変更します：

```css
:root {
  /* アクセントカラー（各所で使われる色） */
  --c-pink: #ff6b9d;      /* ピンク */
  --c-orange: #ff8a5c;    /* オレンジ */
  --c-yellow: #ffd93d;    /* 黄色 */
  --c-green: #6bcb77;     /* 緑 */
  --c-blue: #4d96ff;      /* 青 */
  --c-purple: #9b59b6;    /* 紫 */

  /* 背景色 */
  --bg: #fefcf3;           /* 全体の背景（温かいオフホワイト） */
  --bg-card: #ffffff;      /* カードの背景 */

  /* 文字色 */
  --text: #2d3436;         /* メインの文字色 */
  --text-light: #636e72;   /* 薄めの文字色 */
}
```

> **色コードの調べ方：** 「カラーピッカー」で検索すると、
> 好きな色の `#xxxxxx` コードを取得できるツールが見つかります。
> おすすめ：https://htmlcolorcodes.com/

### 6-2. タブごとの色

各タブ（ページ）のアクセントカラーも変えられます：

```css
--tab-about: var(--c-pink);      /* 自己紹介 = ピンク */
--tab-works: var(--c-orange);    /* 実績 = オレンジ */
--tab-games: var(--c-blue);      /* 制作ゲーム = 青 */
--tab-plans: var(--c-green);     /* 企画書 = 緑 */
--tab-articles: var(--c-purple); /* 記事 = 紫 */
```

---

## 7. Markdownの書き方

記事や各コンテンツの本文はMarkdown記法で書きます。
よく使う書き方をまとめます。

### 7-1. 基本の書き方

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

### 7-2. 箇条書き

```markdown
- 項目1
- 項目2
  - サブ項目（先頭にスペース2つ）
- 項目3

1. 番号付き項目1
2. 番号付き項目2
3. 番号付き項目3
```

### 7-3. 表（テーブル）

```markdown
| 列1 | 列2 | 列3 |
|-----|-----|-----|
| A   | B   | C   |
| D   | E   | F   |
```

### 7-4. 引用

```markdown
> これは引用文です。
> 他の人の言葉や、注意書きに使えます。
```

### 7-5. コードブロック

````markdown
```
ここにコードを書く
```
````

### 7-6. 水平線（区切り線）

```markdown
---
```

---

## 8. GitHub Pagesで公開する方法

### 8-1. 事前準備

- [GitHub](https://github.com/) のアカウントを作る（無料）
- [Git](https://git-scm.com/) をインストールする
- [Node.js](https://nodejs.org/) v22 以上をインストールする

### 8-2. 公開手順（初回）

#### ステップ1：GitHubにリポジトリを作る

1. GitHub にログイン
2. 右上の「+」→「New repository」
3. Repository name を入力（例：`portfolio`）
4. 「Public」を選択
5. 「Create repository」をクリック

#### ステップ2：astro.config.mjs を自分のURLに変更

`astro.config.mjs` を開いて `site` を書き換えます：

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

#### ステップ3：コードをGitHubにアップする

ターミナル（コマンドプロンプト）で、ポートフォリオのフォルダに移動してから：

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

#### ステップ4：GitHub Pagesを有効にする

1. GitHubのリポジトリページに行く
2. 「Settings」タブをクリック
3. 左メニューの「Pages」をクリック
4. 「Source」を **「GitHub Actions」** に変更
5. これだけでOK！

#### ステップ5：公開を確認

- push するとGitHub Actionsが自動でビルド＆デプロイします
- リポジトリの「Actions」タブでビルド状況が見られます
- 緑のチェックマークが付いたら公開完了！
- `https://あなたのユーザー名.github.io/portfolio/` にアクセスして確認

### 8-3. base を設定した場合の注意点

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

## 9. 更新の流れ（日常運用）

サイトを更新するときの手順です。

### ローカルでの確認

```bash
# 1. 開発サーバーを起動（変更がリアルタイムで反映される）
npm run dev

# 2. ブラウザで http://localhost:4321 を開いて確認

# 3. 確認できたら Ctrl+C でサーバーを止める
```

### GitHubにアップ（公開反映）

```bash
# 1. 変更したファイルを確認
git status

# 2. 変更を追加
git add .

# 3. コミット（メッセージは何を変えたか書く）
git commit -m "記事を追加"

# 4. アップロード → 自動でサイトに反映される
git push
```

> **push するたびに自動でサイトが更新されます。**
> ビルドには1〜3分ほどかかります。

---

## 10. よくある質問

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
