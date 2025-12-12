# ライバー掲示板 - UTIP Live

ライバー（配信者）と視聴者が交流できる掲示板サイトです。

## 機能

- 📝 投稿機能（タイトル、カテゴリ、内容）
- 🏷️ カテゴリ別フィルタリング
- ❤️ いいね機能
- 💬 コメント機能（開発中）
- 📱 レスポンシブデザイン
- 🔄 PWA対応

## カテゴリ

- 🎮 ゲーム配信
- 🎵 音楽配信
- 💬 雑談配信
- 🎨 お絵描き配信
- 🍳 料理配信
- 📂 その他

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

- [ ] コメント機能の実装
- [ ] ユーザー認証
- [ ] 画像アップロード
- [ ] リアルタイム更新
- [ ] 通知機能
- [ ] 検索機能
- [ ] ライバーのプロフィールページ

## ライセンス

MIT License

## 関連リンク

- [UTIP Live](https://utip-live.com/)
- [参考サイト](https://berillive.com/liverboard)