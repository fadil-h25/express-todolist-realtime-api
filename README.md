# Aplikasi TodoList Realtime

Aplikasi **TodoList Realtime** sederhana yang dibangun dengan **TypeScript** dan **Express**.  
Proyek ini dibuat untuk tujuan belajar dan menerapkan fitur backend modern seperti autentikasi, update realtime, logging, caching, dan lainnya.

## Daftar Isi

- [Tentang](#tentang)
- [Fitur](#fitur)
- [Teknologi](#teknologi)
- [Instalasi](#instalasi)
- [Penggunaan](#penggunaan)
- [Struktur Proyek](#struktur-proyek)
- [Kontribusi](#kontribusi)
- [Lisensi](#lisensi)

## Tentang

Proyek ini memungkinkan banyak pengguna untuk membuat, mengelola, dan membagikan daftar todo mereka secara **real-time**.  
Proyek ini digunakan untuk berlatih:

- Arsitektur yang rapi (Clean Architecture)
- Logging dengan **Winston**
- Rate limiting
- Autentikasi JWT dengan token rotation
- Caching menggunakan **Redis**
- Integrasi **WebSocket** untuk update realtime

Proyek ini ditujukan untuk belajar menerapkan praktik terbaik dalam pengembangan backend menggunakan TypeScript.

## Fitur

- Autentikasi pengguna: **Login & Logout**
- Manajemen profil pengguna
- Manajemen TodoList: buat, update, hapus todos
- Bagikan todo list dengan pengguna lain
- Update realtime melalui **WebSocket**
- Logging menggunakan **Winston**
- Rate limiting untuk endpoint API
- Autentikasi JWT dengan token rotation
- Caching via **Redis** untuk performa lebih baik

## Teknologi

- **Bahasa:** TypeScript
- **Framework:** Express.js
- **Database:** MySQL via Prisma ORM
- **Logger:** Winston
- **Testing:** Jest
- **Caching:** Redis
- **Autentikasi:** JWT
- **Realtime:** WebSocket

## Struktur Projek

```
app/
├── docs/
├── src/
│ ├── v1/
│ │ ├── auth/
│ │ ├── user/
│ │ └── todo/
│ ├── logger/
│ ├── database/
│ ├── middleware/
│ ├── type/
│ ├── helper/
│ ├── util/
│ └── main.ts
├── package.json
├── package-lock.json
└── tsconfig.json
```
