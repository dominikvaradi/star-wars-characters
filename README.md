# Star Wars Characters

**Live demo available [here](https://star-wars-characters.dominikvaradi.hu/).**

This is a simple web application that displays a list of Star Wars characters. It is built using Next.js 14 and Tailwind CSS. The data is fetched from the [Star Wars API](https://swapi.dev/).

This is a [Next.js 14](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

---

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

---

## Environment Variables

| Variable                                | Description                                                                                       |
|-----------------------------------------|---------------------------------------------------------------------------------------------------|
| `NEXT_PUBLIC_SWAPI_BASE_URL`            | The base URL of the Star Wars API. Should be `https://swapi.dev/api`                              |
| `NEXT_PUBLIC_STAR_WARS_ASSETS_BASE_URL` | The base URL of the Star Wars assets API. Should be `https://starwars-visualguide.com/assets/img` |