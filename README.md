# ライバー評価掲示板 - UTIP Live

ライバー（配信者）について視聴者が感想や評価を投稿できる掲示板サイトです。

## 機能

- 👤 ライバー登録・管理
- ⭐ 星評価システム（1-5段階）
- 📝 レビュー投稿機能
- 🔍 ライバー検索機能
- 📊 人気ライバーランキング
- 📱 レスポンシブデザイン
- 🔄 PWA対応

## 配信カテゴリ

- 🎮 ゲーム配信
- 🎵 音楽配信
- 💬 雑談配信
- 🎨 お絵描き配信
- 🍳 料理配信
- 📂 その他

## 対応プラットフォーム

- YouTube
- Twitch
- ニコニコ生放送
- Mildom
- OPENREC
- その他

## 技術スタック

- HTML5
- CSS3 (Grid, Flexbox)
- Vanilla JavaScript
- Service Worker (PWA)
- Font Awesome Icons

## セットアップ

1. リポジトリをクローン
```bash
git clone <repository-url>
cd liver-board
```

2. ローカルサーバーで起動
```bash
# Python 3の場合
python -m http.server 8000

# Node.jsの場合
npx serve .
```

3. ブラウザで `http://localhost:8000` にアクセス

## GitHub Pages での公開

1. GitHubリポジトリを作成
2. ファイルをプッシュ
3. Settings > Pages で Source を "Deploy from a branch" に設定
4. Branch を "main" に設定
5. 公開されたURLにアクセス

## ファイル構成

```
liver-board/
├── index.html          # メインHTML
├── styles.css          # スタイルシート
├── script.js           # JavaScript機能
├── sw.js              # Service Worker
├── manifest.json      # PWAマニフェスト
└── README.md          # このファイル
```

## 今後の機能追加予定

- [ ] ユーザー認証システム
- [ ] ライバーのプロフィール詳細ページ
- [ ] 画像アップロード機能
- [ ] レビューへのいいね・返信機能
- [ ] 通知機能
- [ ] カテゴリ別フィルタリング
- [ ] 配信スケジュール表示
- [ ] フォロー機能

## ライセンス

MIT License

## 関連リンク

- [UTIP Live](https://utip-live.com/)
- [参考サイト](https://berillive.com/liverboard)