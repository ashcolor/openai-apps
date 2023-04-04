# OpenAi API Apps

OpenAI API を使用したアプリケーション

## ドキュメント

-   [NuxtJS 3](https://nuxt.com/)
-   [Pinia](https://pinia.vuejs.org/core-concepts/)
-   [tailwindcss](https://tailwindcss.com/)
-   [daisyUI](https://daisyui.com/)
-   [icones](https://icones.js.org/)
-   [Prisma](https://www.prisma.io/docs)
-   [Serverless Framework](https://www.serverless.com/)
-   [Terraform](https://www.terraform.io/)

## 手順

### 初期設定

```bash
make init
```

### ローカル環境立ち上げ

Start the development server on http://localhost:3000

```bash
make dev
```

### Prisma

マイグレーション

```bash
prisma migrate dev --name init
```

### クラウド環境構築

`terraform.tfvars`の作成

```bash
cp infra\terraform.tfvars.example infra\terraform.tfvars
```

`terraform.tfvars`を本番用に書き換える

```bash
make tf-init
make tf-apply
```

### デプロイ

`.env`を本番用に書き換える

```bash
make deploy
```

> 環境変数を追加する場合は serverless.yml にも追加する必要がある

## 参考
