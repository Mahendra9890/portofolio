This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

# Prabu Mahendra — Portfolio

Personal portfolio for internship applications, built with Next.js, TypeScript, Tailwind CSS, and Framer Motion.

## English

### Run locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`. Indonesian is available at `/` and `/id`; English is at `/en`.

### Checks

```bash
npm run lint
npm run build
```

### Content and deployment

- Portfolio content is centralized in `src/data/portfolio.ts`; shared types are in `src/types/portfolio.ts`.
- Images and static assets are in `public/`.
- Deploy on Vercel by importing the GitHub repository or using the Vercel CLI after signing in.
- The CV action currently opens an email request because a verified CV file has not been provided. Replace `profile.cv` and add the approved PDF under `public/` to enable direct download.

## Bahasa Indonesia

### Menjalankan secara lokal

```bash
npm install
npm run dev
```

Buka `http://localhost:3000`. Bahasa Indonesia tersedia di `/` dan `/id`; bahasa Inggris di `/en`.

### Pemeriksaan

```bash
npm run lint
npm run build
```

### Konten dan deployment

- Konten portofolio terpusat di `src/data/portfolio.ts`; tipe data bersama ada di `src/types/portfolio.ts`.
- Gambar dan aset statis berada di `public/`.
- Deploy ke Vercel dengan mengimpor repositori GitHub atau memakai Vercel CLI setelah login.
- Tombol CV saat ini membuka email permintaan karena file CV final belum tersedia. Ganti `profile.cv` dan tambahkan PDF yang sudah disetujui ke `public/` untuk mengaktifkan unduhan langsung.
