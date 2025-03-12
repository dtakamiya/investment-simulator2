# 資産運用シミュレーター

複利の力で資産がどのように成長するかをシミュレーションできるウェブアプリケーションです。初期投資額、毎月の積立額、年利、積立期間を入力することで、将来の資産成長を視覚的に確認できます。

![資産運用シミュレーター](https://github.com/dtakamiya/investment-simulator2/raw/main/public/screenshot.png)

## デモ

実際のアプリケーションは以下のURLでご覧いただけます：
[https://dtakamiya.github.io/investment-simulator2/](https://dtakamiya.github.io/investment-simulator2/)

## 機能

- 初期投資額、毎月の積立額、年利、積立期間を自由に設定可能
- 最終的な資産総額、投資元本、運用益、投資利回りを計算
- グラフによる資産成長の視覚化
- レスポンシブデザインでモバイル端末にも対応
- 美しいUIと直感的な操作性

## 技術スタック

- [Next.js 15](https://nextjs.org/) - Reactフレームワーク
- [React 19](https://react.dev/) - UIライブラリ
- [TypeScript](https://www.typescriptlang.org/) - 型安全な開発環境
- [Tailwind CSS](https://tailwindcss.com/) - スタイリング
- [Chart.js](https://www.chartjs.org/) & [react-chartjs-2](https://react-chartjs-2.js.org/) - グラフ描画
- [GitHub Pages](https://pages.github.com/) - ホスティング

## 開発環境のセットアップ

1. リポジトリをクローンします：

```bash
git clone https://github.com/dtakamiya/investment-simulator2.git
cd investment-simulator2
```

2. 依存関係をインストールします：

```bash
npm install
```

3. 開発サーバーを起動します：

```bash
npm run dev
```

4. ブラウザで [http://localhost:3000](http://localhost:3000) を開いてアプリケーションを確認します。

## デプロイ方法

このプロジェクトはGitHub Pagesにデプロイするように設定されています。

1. GitHub上でリポジトリを作成します。

2. リモートリポジトリを追加します：

```bash
git remote add origin https://github.com/あなたのユーザー名/investment-simulator2.git
```

3. 変更をコミットしてプッシュします：

```bash
git add .
git commit -m "Initial commit"
git push -u origin main
```

4. 以下のコマンドでGitHub Pagesにデプロイします：

```bash
npm run deploy
```

## 貢献方法

1. このリポジトリをフォークします
2. 新しいブランチを作成します (`git checkout -b feature/amazing-feature`)
3. 変更をコミットします (`git commit -m 'Add some amazing feature'`)
4. ブランチにプッシュします (`git push origin feature/amazing-feature`)
5. プルリクエストを作成します

## ライセンス

MITライセンスの下で公開されています。詳細は [LICENSE](LICENSE) ファイルをご覧ください。

## 作者

Investment Simulator Team
