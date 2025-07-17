# FOMUS枡サイト - デプロイメントガイド

## ファイル構成
```
枡販売サイト/
├── index.html          # メインHTML
├── styles.css          # スタイルシート
├── script.js           # JavaScript
├── images/             # 画像フォルダ
│   ├── logo.png
│   ├── product_image.png
│   ├── masu_product_*.jpg
│   └── 商品画像各種
└── deploy/             # デプロイメント用
```

## 公式サイトへの反映手順

### 1. 現在のサイトのバックアップ
- 既存のサイトファイルを必ずバックアップしてください
- 特にデータベースがある場合は、そちらもバックアップを取ってください

### 2. ファイルのアップロード方法

#### A. FTPクライアント使用の場合：
1. FTPクライアント（FileZilla、CyberDuck等）でサーバーに接続
2. 以下のファイルをアップロード：
   - `index.html`
   - `styles.css` 
   - `script.js`
   - `images/` フォルダ全体

#### B. cPanelファイルマネージャー使用の場合：
1. cPanelにログイン
2. ファイルマネージャーを開く
3. public_html フォルダを開く
4. 上記ファイルをアップロード

#### C. Git/GitHub使用の場合：
```bash
git add .
git commit -m "Update masu sales website with new product images"
git push origin main
```

### 3. 画像の最適化（推奨）
現在の画像は高解像度のため、Web表示用に最適化することを推奨します：

- 大きな画像（3000px以上）→ 1200px以下に縮小
- ファイルサイズ500KB以下に圧縮
- WebP形式への変換を検討

### 4. 動作確認
アップロード後、以下を確認：
- [ ] サイトが正常に表示される
- [ ] 画像が全て表示される
- [ ] スクロールアニメーションが動作する
- [ ] 商品カードのホバー効果が動作する
- [ ] レスポンシブデザインが正常に動作する

### 5. SEO対策（必要に応じて）
- sitemap.xml の更新
- Google Search Console への登録
- robots.txt の確認

### 6. 新商品追加方法
FOMUSオリジナル商品を追加する場合：

#### JavaScript関数を使用：
```javascript
addFOMUSOriginalProduct({
    imageSrc: 'images/新商品.jpg',
    name: '新商品名',
    description: '商品説明',
    price: '価格'
});
```

#### 手動でHTMLに追加：
HTMLファイル内のコメントを参考に新商品カードを追加

## 注意事項
- 画像ファイル名に日本語を使用している場合、サーバーの文字コード設定を確認
- 大容量の画像ファイルはサーバーの容量制限に注意
- SSL証明書の設定確認

## トラブルシューティング
- 画像が表示されない → パスの確認、ファイル権限の確認
- レイアウトが崩れる → CSS読み込みの確認
- JavaScript動作しない → ブラウザのコンソールでエラー確認

## 連絡先
技術的な問題があれば、開発者にご相談ください。