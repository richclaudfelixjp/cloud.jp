# cloud.jp - QAエンジニアポートフォリオサイト

高度なCI/CD実践と自動テストを紹介するQAエンジニア向けポートフォリオサイト

## ワークフロー概要:

1. **機能開発**:
   - 機能ブランチ → ステージングへのPR
   - PRに対する自動テスト
   
2. **ステージング環境**:
   - マージによるステージング環境へのデプロイ
   - Playwright E2Eテストによる機能検証
   - テスト結果に基づくステータスチェック作成
   
3. **本番デプロイ**:
   - ステージング → マスターへのPR (テスト合格が必須)
   - マージによる本番環境へのデプロイ
   - 本番環境での検証テスト実行

## 🔧 使用技術

- フロントエンド: HTML, CSS, JavaScript
- デプロイ: Netlify
- CI/CD: GitHub Actions
- テスト: Playwright

## 🧪 自動テスト連携

本プロジェクトは[Playwright](https://github.com/richclaudfelixjp/Playwright-Project)でE2Eテストを自動実行:
- ステージングへのPR作成時
- ステージングデプロイ後
- 本番デプロイ後

## 📱 環境URL

- 本番: [https://cloudjp.netlify.app](https://cloudjp.netlify.app)
- ステージング: [https://staging-cloudjp.netlify.app](https://staging-cloudjp.netlify.app)