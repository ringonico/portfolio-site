const fs = require("fs");
const path = require("path");
const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  AlignmentType, BorderStyle, WidthType, ShadingType, HeadingLevel,
  LevelFormat, PageBreak
} = require("docx");

const FONT = "Zen Maru Gothic";
const FONT_FALLBACK = "Yu Gothic";

// Common styles
const styles = {
  default: {
    document: {
      run: { font: FONT_FALLBACK, size: 22 } // 11pt
    }
  },
  paragraphStyles: [
    {
      id: "Heading1", name: "Heading 1", basedOn: "Normal", next: "Normal", quickFormat: true,
      run: { size: 36, bold: true, font: FONT_FALLBACK, color: "E8457C" },
      paragraph: { spacing: { before: 360, after: 200 }, outlineLevel: 0 }
    },
    {
      id: "Heading2", name: "Heading 2", basedOn: "Normal", next: "Normal", quickFormat: true,
      run: { size: 28, bold: true, font: FONT_FALLBACK, color: "2d3436" },
      paragraph: { spacing: { before: 280, after: 160 }, outlineLevel: 1 }
    },
    {
      id: "Heading3", name: "Heading 3", basedOn: "Normal", next: "Normal", quickFormat: true,
      run: { size: 24, bold: true, font: FONT_FALLBACK, color: "636e72" },
      paragraph: { spacing: { before: 200, after: 120 }, outlineLevel: 2 }
    },
  ]
};

const numbering = {
  config: [
    {
      reference: "bullets",
      levels: [{
        level: 0, format: LevelFormat.BULLET, text: "\u25B8", alignment: AlignmentType.LEFT,
        style: { paragraph: { indent: { left: 720, hanging: 360 } } }
      }]
    }
  ]
};

// Helper: make a metadata table
function metaTable(rows) {
  const border = { style: BorderStyle.SINGLE, size: 1, color: "CCCCCC" };
  const borders = { top: border, bottom: border, left: border, right: border };
  const noBorderBottom = { ...borders, bottom: { style: BorderStyle.NONE, size: 0 } };

  return new Table({
    width: { size: 9360, type: WidthType.DXA },
    columnWidths: [2800, 6560],
    rows: rows.map((row, i) =>
      new TableRow({
        children: [
          new TableCell({
            borders,
            width: { size: 2800, type: WidthType.DXA },
            shading: { fill: "FFF0F5", type: ShadingType.CLEAR },
            margins: { top: 60, bottom: 60, left: 120, right: 120 },
            children: [new Paragraph({
              children: [new TextRun({ text: row[0], bold: true, size: 22, font: FONT_FALLBACK, color: "E8457C" })]
            })]
          }),
          new TableCell({
            borders,
            width: { size: 6560, type: WidthType.DXA },
            margins: { top: 60, bottom: 60, left: 120, right: 120 },
            children: [new Paragraph({
              children: [new TextRun({
                text: row[1] || "",
                size: 22, font: FONT_FALLBACK,
                color: row[1] ? "2d3436" : "b2bec3",
                italics: !row[1]
              })]
            })]
          })
        ]
      })
    )
  });
}

function separator() {
  return new Paragraph({
    spacing: { before: 300, after: 300 },
    border: { bottom: { style: BorderStyle.SINGLE, size: 6, color: "E8457C", space: 1 } },
    children: []
  });
}

function placeholder(text) {
  return new Paragraph({
    spacing: { after: 120 },
    children: [new TextRun({ text, color: "b2bec3", italics: true, size: 22, font: FONT_FALLBACK })]
  });
}

function heading2(text) {
  return new Paragraph({
    heading: HeadingLevel.HEADING_2,
    children: [new TextRun({ text })]
  });
}

function bodyText(text) {
  return new Paragraph({
    spacing: { after: 120 },
    children: [new TextRun({ text, size: 22, font: FONT_FALLBACK })]
  });
}

function bulletItem(text) {
  return new Paragraph({
    numbering: { reference: "bullets", level: 0 },
    children: [new TextRun({ text, size: 22, font: FONT_FALLBACK })]
  });
}

function note(text) {
  return new Paragraph({
    spacing: { before: 60, after: 60 },
    children: [new TextRun({ text, size: 18, color: "b2bec3", italics: true, font: FONT_FALLBACK })]
  });
}

// ===== TEMPLATES =====

const templates = [
  {
    filename: "テンプレ_記事.docx",
    title: "記事テンプレート",
    meta: [
      ["種類", "記事"],
      ["タイトル", ""],
      ["日付", ""],
      ["カテゴリ", ""],
      ["タグ", ""],
      ["概要", ""],
      ["関連ゲーム", ""],
      ["サムネイル", "ここに画像を貼る"],
    ],
    body: [
      heading2("はじめに"),
      placeholder("ここに導入文を書く"),
      new Paragraph({ children: [] }),
      heading2("本題"),
      placeholder("自由に書いてください。画像を入れたい場所にそのまま貼ってOK。"),
      new Paragraph({ children: [] }),
      placeholder("箇条書きにしたいときは下みたいに書く："),
      bulletItem("ポイント1"),
      bulletItem("ポイント2"),
      bulletItem("ポイント3"),
      new Paragraph({ children: [] }),
      heading2("まとめ"),
      placeholder("ここにまとめを書く"),
    ]
  },
  {
    filename: "テンプレ_実績.docx",
    title: "実績テンプレート",
    meta: [
      ["種類", "実績"],
      ["タイトル", ""],
      ["日付", ""],
      ["概要", ""],
      ["役割", ""],
      ["工夫した点", ""],
      ["学んだこと", ""],
      ["スキル", ""],
      ["サムネイル", "ここに画像を貼る"],
      ["順番", ""],
    ],
    body: [
      heading2("概要"),
      placeholder("どんな仕事・プロジェクトだったか書く"),
      new Paragraph({ children: [] }),
      heading2("担当範囲"),
      bulletItem("担当したこと1"),
      bulletItem("担当したこと2"),
      new Paragraph({ children: [] }),
      heading2("工夫した点"),
      placeholder("詳しく書く"),
      new Paragraph({ children: [] }),
      heading2("学び"),
      placeholder("何を学んだか書く"),
    ]
  },
  {
    filename: "テンプレ_ゲーム.docx",
    title: "制作ゲームテンプレート",
    meta: [
      ["種類", "ゲーム"],
      ["タイトル", ""],
      ["日付", ""],
      ["概要", ""],
      ["制作期間", ""],
      ["ツール", ""],
      ["役割", ""],
      ["URL", ""],
      ["サムネイル", "ここに画像を貼る"],
      ["順番", ""],
    ],
    body: [
      heading2("ゲーム概要"),
      placeholder("どんなゲームか書く"),
      new Paragraph({ children: [] }),
      heading2("コンセプト"),
      placeholder("どういう体験を目指したか"),
      new Paragraph({ children: [] }),
      heading2("こだわりポイント"),
      bulletItem("こだわり1"),
      bulletItem("こだわり2"),
      new Paragraph({ children: [] }),
      heading2("今後の展望"),
      placeholder("今後やりたいことがあれば"),
    ]
  },
  {
    filename: "テンプレ_企画書.docx",
    title: "企画書テンプレート",
    meta: [
      ["種類", "企画書"],
      ["タイトル", ""],
      ["日付", ""],
      ["概要", ""],
      ["ジャンル", ""],
      ["目的", ""],
      ["ポイント", ""],
      ["PDF", ""],
      ["サムネイル", "ここに画像を貼る"],
      ["順番", ""],
    ],
    body: [
      heading2("企画概要"),
      placeholder("どんなゲームの企画か書く"),
      new Paragraph({ children: [] }),
      heading2("ターゲットユーザー"),
      bulletItem("こういう人に向けて"),
      bulletItem("こういう人に向けて"),
      new Paragraph({ children: [] }),
      heading2("コアメカニクス"),
      placeholder("ゲームの核となる仕組みを書く"),
      new Paragraph({ children: [] }),
      heading2("差別化ポイント"),
      placeholder("他のゲームとの違い"),
    ]
  },
  {
    filename: "テンプレ_プロフィール.docx",
    title: "プロフィールテンプレート",
    meta: [
      ["種類", "プロフィール"],
      ["名前", ""],
      ["キャッチコピー", ""],
    ],
    body: [
      heading2("INTRODUCTION"),
      placeholder("自己紹介文を自由に書く"),
      new Paragraph({ children: [] }),
      new Paragraph({ children: [] }),
      heading2("MY STATUS"),
      placeholder("ステータス表は普通に表で書いてOK"),
      new Paragraph({ children: [] }),
      new Paragraph({ children: [] }),
      heading2("MY STRONG POINT"),
      bulletItem("強み1 \u2014 説明"),
      bulletItem("強み2 \u2014 説明"),
      bulletItem("強み3 \u2014 説明"),
    ]
  },
  {
    filename: "テンプレ_プレイ済みゲーム.docx",
    title: "プレイ済みゲーム追加テンプレート",
    meta: [
      ["種類", "プレイ済み"],
      ["ジャンル", ""],
      ["追加するゲーム", ""],
    ],
    body: [
      note("※ ジャンル名とゲーム名をカンマ区切りで書くだけでOK"),
      note("※ 既存のジャンル：アクション／RPG／アドベンチャー／シミュレーション／パズル／シューティング／リズム／レース／スポーツ／ホラー／ローグライク／格闘ゲーム／カードゲーム"),
      new Paragraph({ children: [] }),
      placeholder("例）"),
      bodyText("ジャンル：アクション"),
      bodyText("追加：Devil May Cry 5, SEKIRO, Celeste"),
    ]
  },
];

async function generate() {
  for (const tmpl of templates) {
    const children = [
      // Title
      new Paragraph({
        heading: HeadingLevel.HEADING_1,
        children: [new TextRun({ text: tmpl.title })]
      }),
      new Paragraph({ children: [] }),

      // Usage note
      note("ピンクの列が項目名。右の白い列に書き込んでください。空欄はスキップOK。"),
      note("「サムネイル」の行には画像をそのまま貼り付けてください。空欄ならデフォルト画像になります。"),
      note("ピンクの線から下が本文エリア。見出し・箇条書き・画像・太字・文字サイズ、全部そのまま使えます。"),
      note("灰色の文字はガイドです。消して上書きしてください。"),
      new Paragraph({ children: [] }),

      // Meta table
      metaTable(tmpl.meta),

      // Separator
      separator(),

      // Body
      ...tmpl.body,
    ];

    const doc = new Document({
      styles,
      numbering,
      sections: [{
        properties: {
          page: {
            size: { width: 12240, height: 15840 },
            margin: { top: 1440, right: 1440, bottom: 1440, left: 1440 }
          }
        },
        children
      }]
    });

    const buffer = await Packer.toBuffer(doc);
    const filepath = path.join(__dirname, tmpl.filename);
    fs.writeFileSync(filepath, buffer);
    console.log(`Created: ${tmpl.filename}`);
  }
}

generate().catch(console.error);
