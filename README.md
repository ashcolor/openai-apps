# OpenAi API Apps

OpenAI API を使用したアプリケーション

## ドキュメント

-   [NuxtJS 3](https://nuxt.com/)
-   [Nuxt Auth](https://sidebase.io/nuxt-auth/getting-started)
-   [Pinia](https://pinia.vuejs.org/core-concepts/)
-   [tailwindcss](https://tailwindcss.com/)
-   [daisyUI](https://daisyui.com/)
-   [icones](https://icones.js.org/)
-   [Vue Toastification](https://vue-toastification.maronato.dev/)
-   [Prisma](https://www.prisma.io/docs)
-   [OpenAI API Reference](https://platform.openai.com/docs/api-reference)

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
npx prisma migrate dev --name init
```

シード

```bash
npx prisma seed
```

### デプロイ

`.env`を本番用に書き換える

```bash
make deploy
```

## 参考
