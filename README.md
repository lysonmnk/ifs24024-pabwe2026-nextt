<div align="center">

# Catatan Belajar Ngoding

**ifs24024-pabwe2026-p1**

**Catat materi, rekam sesi belajar, dan pantau progres ngodingmu dalam satu aplikasi.**

![Bun](https://img.shields.io/badge/Bun-package_manager-000000?logo=bun&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-20_LTS-339933?logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express.js-REST_API-000000?logo=express&logoColor=white)
![SQLite](https://img.shields.io/badge/SQLite-database-003B57?logo=sqlite&logoColor=white)
![JWT](https://img.shields.io/badge/Auth-JWT-000000?logo=jsonwebtokens&logoColor=white)
![React](https://img.shields.io/badge/React-Vite-61DAFB?logo=react&logoColor=black)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-06B6D4?logo=tailwindcss&logoColor=white)
![Vitest](https://img.shields.io/badge/Vitest-testing-6E9F18?logo=vitest&logoColor=white)

</div>

---

## Daftar Isi

- [Informasi Proyek](#informasi-proyek)
- [Tentang Proyek](#tentang-proyek)
- [Status Pengembangan](#status-pengembangan)
- [Fitur Utama](#fitur-utama)
- [Teknologi](#teknologi)
- [Arsitektur Sistem](#arsitektur-sistem)
- [Alur Autentikasi](#alur-autentikasi)
- [Struktur Proyek](#struktur-proyek)
- [Rute Aplikasi](#rute-aplikasi)
- [Desain Database](#desain-database)
- [Referensi API](#referensi-api)
- [Memulai](#memulai)
- [Konfigurasi Lingkungan](#konfigurasi-lingkungan)
- [Pengujian](#pengujian)
- [Deployment](#deployment)
- [Praktik Terbaik yang Diterapkan](#praktik-terbaik-yang-diterapkan)

---

## Informasi Proyek

| Informasi | Keterangan |
| --- | --- |
| Nama repositori | `ifs24024-pabwe2026-p1` |
| Mata kuliah | Pengembangan Aplikasi Berbasis Web (PABWE) 2026 |
| Jenis tugas | Proyek 1 (individu) |
| Nama mahasiswa | Lyson Paulus Esar Manik |
| NIM | 11S24024 |

### Tautan Penting

| Artefak | Tautan |
| --- | --- |
| Aplikasi (frontend) | `<isi URL aplikasi>` |
| API (backend) | `<isi URL API>` |
| Video YouTube | `<isi URL video>` |
| Hasil pengujian deployment | `<isi URL atau lampiran>` |
| Dokumen Proyek 1 | `<isi tautan dokumen>` |

---

## Tentang Proyek

Belajar pemrograman membutuhkan konsistensi. **Catatan Belajar Ngoding** membantu menjaga konsistensi itu: pengguna membuat akun, mencatat materi yang sedang dipelajari (misalnya dari kursus daring atau buku), merekam setiap sesi belajar, lalu memantau progres lewat status materi dan total menit belajar. Data setiap pengguna bersifat pribadi dan tidak dapat dilihat pengguna lain.

Aplikasi terdiri dari dua bagian yang dipisahkan dengan jelas:

| Bagian | Peran | Teknologi |
| --- | --- | --- |
| **Backend** | REST API yang menyediakan data sendiri, lengkap dengan autentikasi | Express.js, SQLite, JWT |
| **Frontend** | Antarmuka yang mengonsumsi API | React, Vite, dan Tailwind CSS |

Pada kedua sisi, tanggung jawab dipisahkan secara tegas, input divalidasi berlapis, error ditangani secara terpusat, dan hasil kerja diverifikasi dengan pengujian otomatis.

---

## Status Pengembangan

| Komponen | Status | Keterangan |
| --- | --- | --- |
| Backend materi dan sesi | Selesai | 8 endpoint dan 16 skenario pengujian lulus; pengujian akan disesuaikan agar memakai token |
| Backend autentikasi | Dalam pengerjaan | Registrasi, login, dan perlindungan endpoint dengan JWT |
| Database SQLite | Sebagian | Tabel `materi` dan `sesi_belajar` selesai; tabel `users` dan kolom `user_id` menyusul |
| Frontend React | Dalam pengerjaan | Mengikuti struktur dan rute pada dokumen ini |
| Dokumentasi | Selesai | README, referensi API, dan desain database |
| Pipeline CI/CD | Menyusul | Jenkins dan SonarQube akan ditambahkan kemudian |

---

## Fitur Utama

### Autentikasi
- Registrasi akun dengan nama, email, dan kata sandi
- Login dengan email dan kata sandi; server mengembalikan token JWT
- Kata sandi disimpan dalam bentuk hash (bcrypt), tidak pernah dalam bentuk asli
- Seluruh endpoint materi dan sesi hanya dapat diakses dengan token yang valid
- Data bersifat pribadi: pengguna hanya dapat melihat dan mengubah data miliknya sendiri
- Proteksi rute di frontend: pengguna yang belum login diarahkan ke halaman login, dan pengguna yang sudah login tidak perlu membuka halaman login lagi
- Logout otomatis ketika token tidak valid atau kedaluwarsa

### Manajemen Materi
- Menambah, melihat, mengubah, dan menghapus materi belajar
- Status materi: `belum`, `sedang`, `selesai`
- Total menit belajar dihitung otomatis pada setiap materi
- Pencarian langsung (*live search*) dan penyaringan berdasarkan status

### Sesi Belajar
- Mencatat sesi pada materi tertentu: tanggal, durasi dalam menit, dan catatan
- Riwayat sesi belajar per materi
- Menghapus sesi belajar
- Sesi ikut terhapus otomatis ketika materinya dihapus

### Ringkasan Progres
- Jumlah materi, materi yang sudah selesai, dan total waktu belajar pada halaman utama

### Keandalan dan Antarmuka
- Validasi input di backend; form frontend divalidasi sebelum dikirim
- Response API seragam dengan pesan error yang jelas
- Dialog konfirmasi hapus dan notifikasi dengan SweetAlert2
- Indikator loading, tampilan data kosong, dan desain responsif

---

## Teknologi

| Kategori | Teknologi |
| --- | --- |
| Package manager dan script runner | [Bun](https://bun.sh) |
| Runtime server dan pengujian | Node.js 20 LTS |
| Backend | Express.js |
| Database | SQLite (`better-sqlite3`) |
| Autentikasi | JSON Web Token (`jsonwebtoken`), hash kata sandi (`bcryptjs`) |
| Frontend | React, Vite |
| Routing | React Router |
| Styling | Tailwind CSS v4 (`@tailwindcss/vite`) |
| Ikon | `react-icons` |
| Dialog dan notifikasi | SweetAlert2 |
| Pengujian | Vitest, Supertest, Testing Library, jsdom, `@vitest/coverage-v8` |

> **Catatan pemakaian Bun dan Node.js:** Bun dipakai untuk `bun install` dan menjalankan script. Server backend dan pengujian tetap berjalan di Node.js karena `better-sqlite3` adalah modul native yang paling stabil di Node.js.

---

## Arsitektur Sistem

Frontend tidak pernah mengakses database secara langsung. Seluruh data melalui API.

```mermaid
flowchart LR
    A[React Frontend] -- HTTP / JSON + Bearer Token --> B[Express API]
    B -- SQL --> C[(SQLite)]
    C --> B
    B --> A
```

### Backend

`Route -> Middleware Autentikasi -> Controller -> Service -> Repository -> Database`

| Lapisan | Tanggung jawab |
| --- | --- |
| Route | Menentukan endpoint |
| Middleware | Verifikasi token JWT dan penanganan error terpusat |
| Controller | Menerima request dan mengirim response |
| Service | Aturan bisnis, validasi, hash kata sandi, dan pembuatan token |
| Repository | Satu-satunya tempat query SQL |

### Frontend

`Page -> Hook -> Service -> API Client -> API`

| Lapisan | Tanggung jawab |
| --- | --- |
| Pages dan Components | Tampilan |
| Context | Menyimpan status login yang dipakai di seluruh aplikasi |
| Hooks | Pengelolaan state dan alur pengambilan data |
| Services | Satu-satunya tempat pemanggilan endpoint |
| Helpers | Pembungkus `fetch` (menambahkan token), penyimpanan token, dan dialog SweetAlert2 |
| Utils | Fungsi murni seperti validasi dan pemformatan |
| Lib | Konstanta konfigurasi terpusat |

---

## Alur Autentikasi

```mermaid
sequenceDiagram
    participant U as Pengguna
    participant F as Frontend
    participant B as Backend
    U->>F: Isi email dan kata sandi
    F->>B: POST /auth/login
    B->>B: Verifikasi kata sandi dengan bcrypt
    B-->>F: Token JWT dan data pengguna
    F->>F: Simpan token di localStorage
    F->>B: GET /materi dengan header Authorization Bearer
    B->>B: Verifikasi token
    B-->>F: Data materi milik pengguna
```

Ketentuan:

- Token dikirim melalui header `Authorization: Bearer <token>` pada setiap request ke endpoint yang dilindungi.
- Jika token tidak ada atau tidak valid, backend mengembalikan status `401` dan frontend otomatis logout lalu mengarahkan pengguna ke halaman login.
- Pesan kesalahan login bersifat umum ("Email atau kata sandi salah") agar tidak membocorkan email mana yang sudah terdaftar.
- Data milik pengguna lain dianggap tidak ditemukan (`404`), bukan terlarang, sehingga keberadaannya tidak terungkap.

---

## Struktur Proyek

```text
ifs24024-pabwe2026-p1/
├── backend/
│   ├── src/
│   │   ├── config/                   # Koneksi database dan environment
│   │   │   ├── database.js
│   │   │   └── env.js
│   │   ├── controllers/
│   │   │   ├── auth.controller.js
│   │   │   ├── materi.controller.js
│   │   │   └── sesi.controller.js
│   │   ├── services/                 # Aturan bisnis dan validasi
│   │   │   ├── auth.service.js
│   │   │   ├── materi.service.js
│   │   │   └── sesi.service.js
│   │   ├── repositories/             # Query SQL
│   │   │   ├── user.repository.js
│   │   │   ├── materi.repository.js
│   │   │   └── sesi.repository.js
│   │   ├── routes/
│   │   │   ├── index.js
│   │   │   ├── auth.routes.js
│   │   │   ├── materi.routes.js
│   │   │   └── sesi.routes.js
│   │   ├── middlewares/
│   │   │   ├── authenticate.js       # Verifikasi token JWT
│   │   │   └── error-handler.js      # Penanganan error terpusat
│   │   ├── utils/
│   │   │   ├── app-error.js
│   │   │   ├── parse-id.js
│   │   │   └── response.js
│   │   ├── app.js                    # Konfigurasi aplikasi Express
│   │   └── server.js                 # Titik masuk server
│   ├── tests/
│   │   ├── auth.test.js
│   │   └── api.test.js
│   ├── vitest.config.js
│   ├── .env.example
│   ├── bun.lock
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── features/
│   │   │   ├── auth/
│   │   │   │   ├── components/       # LoginForm, RegisterForm
│   │   │   │   ├── context/          # AuthContext
│   │   │   │   ├── hooks/            # useAuth
│   │   │   │   ├── pages/            # LoginPage, RegisterPage
│   │   │   │   └── services/         # authService
│   │   │   ├── materi/
│   │   │   │   ├── components/       # MateriCard, MateriForm, MateriList, MateriFilter
│   │   │   │   ├── hooks/            # useMateri
│   │   │   │   ├── pages/            # MateriListPage, MateriDetailPage
│   │   │   │   └── services/         # materiService
│   │   │   └── sesi/
│   │   │       ├── components/       # SesiForm, SesiList
│   │   │       ├── hooks/            # useSesi
│   │   │       └── services/         # sesiService
│   │   ├── components/
│   │   │   ├── common/               # Button, Loading, ErrorMessage, EmptyState
│   │   │   ├── layout/               # MainLayout, AuthLayout, Navbar
│   │   │   └── routing/              # ProtectedRoute, GuestRoute
│   │   ├── pages/
│   │   │   └── NotFoundPage.jsx
│   │   ├── helpers/
│   │   │   ├── apiClient.js          # Pembungkus fetch (menyisipkan token)
│   │   │   ├── tokenStorage.js       # Simpan dan baca token
│   │   │   └── dialogHelper.js       # Dialog SweetAlert2
│   │   ├── hooks/
│   │   │   └── useInput.js           # Hook binding form
│   │   ├── lib/
│   │   │   └── config.js             # Konstanta konfigurasi terpusat
│   │   ├── utils/
│   │   │   ├── validators.js
│   │   │   └── formatters.js
│   │   ├── App.jsx                   # Definisi rute
│   │   ├── main.jsx
│   │   ├── index.css                 # Konfigurasi Tailwind CSS v4
│   │   ├── setupTests.js             # Setup Vitest + jest-dom
│   │   └── test-utils.jsx            # Helper render dengan router dan auth
│   ├── tests/
│   ├── vite.config.js
│   ├── vitest.config.js
│   ├── .env.example
│   └── package.json
│
├── .gitignore
└── README.md
```

---

## Rute Aplikasi

| Rute | Halaman | Akses |
| --- | --- | --- |
| `/login` | Login | Tamu (pengguna yang sudah login diarahkan ke `/`) |
| `/register` | Registrasi | Tamu (pengguna yang sudah login diarahkan ke `/`) |
| `/` | Daftar materi dan ringkasan progres | Terproteksi |
| `/materi/:id` | Detail materi dan riwayat sesi belajar | Terproteksi |
| `*` | Halaman tidak ditemukan | Publik |

---

## Desain Database

Satu pengguna memiliki banyak materi, dan satu materi memiliki banyak sesi belajar.

```mermaid
erDiagram
    USERS ||--o{ MATERI : memiliki
    MATERI ||--o{ SESI_BELAJAR : memiliki
    USERS {
        integer id PK
        text nama
        text email UK
        text password_hash
        text created_at
    }
    MATERI {
        integer id PK
        integer user_id FK
        text judul
        text sumber
        text status
        text created_at
    }
    SESI_BELAJAR {
        integer id PK
        integer materi_id FK
        text tanggal
        integer durasi_menit
        text catatan
        text created_at
    }
```

| Tabel | Aturan penting |
| --- | --- |
| `users` | `email` unik; kata sandi hanya disimpan sebagai `password_hash` |
| `materi` | `judul` wajib; `status` hanya `belum`, `sedang`, atau `selesai` (bawaan `belum`); terhubung ke `users` dengan `ON DELETE CASCADE` |
| `sesi_belajar` | `durasi_menit` harus lebih dari 0; terhubung ke `materi` dengan `ON DELETE CASCADE` |

```sql
CREATE TABLE IF NOT EXISTS users (
  id             INTEGER PRIMARY KEY AUTOINCREMENT,
  nama           TEXT NOT NULL,
  email          TEXT NOT NULL UNIQUE,
  password_hash  TEXT NOT NULL,
  created_at     TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS materi (
  id          INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id     INTEGER NOT NULL,
  judul       TEXT NOT NULL,
  sumber      TEXT,
  status      TEXT NOT NULL DEFAULT 'belum'
              CHECK (status IN ('belum', 'sedang', 'selesai')),
  created_at  TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS sesi_belajar (
  id            INTEGER PRIMARY KEY AUTOINCREMENT,
  materi_id     INTEGER NOT NULL,
  tanggal       TEXT NOT NULL,
  durasi_menit  INTEGER NOT NULL CHECK (durasi_menit > 0),
  catatan       TEXT,
  created_at    TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (materi_id) REFERENCES materi(id) ON DELETE CASCADE
);
```

---

## Referensi API

Base URL lokal: `http://localhost:3000/api`

Format response berhasil:

```json
{ "success": true, "message": "Materi berhasil dibuat", "data": {} }
```

Format response gagal:

```json
{ "success": false, "message": "Input tidak valid", "errors": ["judul wajib diisi"] }
```

Seluruh endpoint **Materi** dan **Sesi Belajar** wajib menyertakan header:

```text
Authorization: Bearer <token>
```

**Coba cepat dengan `curl`:**

```bash
# 1. Registrasi
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"nama":"Lyson","email":"lyson@example.com","password":"rahasia123"}'

# 2. Login (salin nilai "token" dari response)
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"lyson@example.com","password":"rahasia123"}'

# 3. Membuat materi
curl -X POST http://localhost:3000/api/materi \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <token>" \
  -d '{"judul":"JavaScript Dasar","sumber":"SoloLearn","status":"sedang"}'

# 4. Menambah sesi belajar pada materi dengan id 1
curl -X POST http://localhost:3000/api/materi/1/sesi \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <token>" \
  -d '{"tanggal":"2026-10-24","durasi_menit":45,"catatan":"Perulangan dan fungsi"}'
```

<details>
<summary><b>Autentikasi</b></summary>

| Method | Endpoint | Akses | Deskripsi |
| --- | --- | --- | --- |
| `POST` | `/auth/register` | Publik | Registrasi akun baru |
| `POST` | `/auth/login` | Publik | Login dan mendapatkan token |
| `GET` | `/auth/me` | Token | Data pengguna yang sedang login |

Body `POST /auth/register`:

| Field | Tipe | Aturan |
| --- | --- | --- |
| `nama` | string | Wajib, 2 sampai 50 karakter |
| `email` | string | Wajib, format email valid, belum terdaftar |
| `password` | string | Wajib, minimal 8 karakter |

Body `POST /auth/login`:

| Field | Tipe | Aturan |
| --- | --- | --- |
| `email` | string | Wajib |
| `password` | string | Wajib |

Contoh response login:

```json
{
  "success": true,
  "message": "Login berhasil",
  "data": {
    "token": "<jwt>",
    "user": { "id": 1, "nama": "Lyson", "email": "lyson@example.com" }
  }
}
```

</details>

<details>
<summary><b>Materi</b></summary>

| Method | Endpoint | Akses | Deskripsi |
| --- | --- | --- | --- |
| `GET` | `/materi` | Token | Semua materi milik pengguna beserta total menit belajar |
| `GET` | `/materi/:id` | Token | Detail satu materi |
| `POST` | `/materi` | Token | Membuat materi |
| `PUT` | `/materi/:id` | Token | Mengubah materi |
| `DELETE` | `/materi/:id` | Token | Menghapus materi beserta seluruh sesinya |

Body `POST` dan `PUT`:

| Field | Tipe | Aturan |
| --- | --- | --- |
| `judul` | string | Wajib, maksimal 100 karakter |
| `sumber` | string | Opsional, maksimal 100 karakter |
| `status` | string | Opsional: `belum` (bawaan), `sedang`, `selesai` |

</details>

<details>
<summary><b>Sesi Belajar</b></summary>

| Method | Endpoint | Akses | Deskripsi |
| --- | --- | --- | --- |
| `GET` | `/materi/:materiId/sesi` | Token | Semua sesi pada suatu materi |
| `POST` | `/materi/:materiId/sesi` | Token | Menambah sesi belajar |
| `DELETE` | `/sesi/:id` | Token | Menghapus satu sesi |

Body `POST`:

| Field | Tipe | Aturan |
| --- | --- | --- |
| `tanggal` | string | Wajib, format `YYYY-MM-DD` dan tanggal yang valid |
| `durasi_menit` | integer | Wajib, antara 1 dan 1440 |
| `catatan` | string | Opsional, maksimal 500 karakter |

</details>

<details>
<summary><b>Utilitas</b></summary>

| Method | Endpoint | Akses | Deskripsi |
| --- | --- | --- | --- |
| `GET` | `/health` | Publik | Pemeriksaan status API |

</details>

<details>
<summary><b>Kode status HTTP</b></summary>

| Kode | Arti |
| --- | --- |
| `200` | Permintaan berhasil |
| `201` | Data berhasil dibuat |
| `400` | Input tidak valid |
| `401` | Token tidak ada, tidak valid, atau kedaluwarsa; atau email dan kata sandi salah |
| `404` | Data tidak ditemukan (termasuk data milik pengguna lain) |
| `409` | Email sudah terdaftar |
| `500` | Kesalahan pada server |

</details>

---

## Memulai

### Prasyarat

- [Bun](https://bun.sh) terbaru
- Node.js 20 LTS atau lebih baru
- Git

### Instalasi

Langkah berikut sesuai dengan alur pada video demonstrasi.

```bash
git clone https://github.com/<username-github>/ifs24024-pabwe2026-p1.git
cd ifs24024-pabwe2026-p1
```

### Menjalankan Backend

```bash
cd backend
bun install
cp .env.example .env
bun run dev
```

Ubah nilai `JWT_SECRET` pada `.env` menjadi teks acak yang panjang. Backend berjalan di `http://localhost:3000`. Database dan tabel dibuat otomatis saat server pertama kali dijalankan. Periksa dengan membuka `http://localhost:3000/api/health`.

### Menjalankan Frontend

Buka terminal baru:

```bash
cd frontend
bun install
cp .env.example .env
bun run dev
```

Buka `http://localhost:5173`, lalu daftar akun baru dan login.

### Perintah yang Tersedia

| Lokasi | Perintah | Fungsi |
| --- | --- | --- |
| backend | `bun run dev` | Server mode pengembangan (muat ulang otomatis) |
| backend | `bun run start` | Server untuk produksi |
| backend | `bun run test` | Pengujian dengan laporan coverage |
| frontend | `bun run dev` | Server pengembangan Vite |
| frontend | `bun run build` | Build produksi |
| frontend | `bun run preview` | Melihat hasil build secara lokal |
| frontend | `bun run test` | Pengujian dengan laporan coverage |

---

## Konfigurasi Lingkungan

Salin `.env.example` menjadi `.env` pada masing-masing folder, lalu sesuaikan nilainya. Berkas `.env` tidak disertakan dalam repositori.

**`backend/.env`**

```env
PORT=3000
DB_PATH=./data/catatan.db
CORS_ORIGIN=http://localhost:5173
JWT_SECRET=ganti-dengan-teks-acak-yang-panjang
JWT_EXPIRES_IN=1d
NODE_ENV=development
```

| Variabel | Deskripsi |
| --- | --- |
| `PORT` | Port server backend |
| `DB_PATH` | Lokasi berkas SQLite |
| `CORS_ORIGIN` | Alamat frontend yang diizinkan (pisahkan dengan koma bila lebih dari satu) |
| `JWT_SECRET` | Kunci rahasia penandatangan token; wajib diganti dan tidak boleh dibagikan |
| `JWT_EXPIRES_IN` | Masa berlaku token, misalnya `1d` |
| `NODE_ENV` | Mode aplikasi |

**`frontend/.env`**

```env
VITE_API_URL=http://localhost:3000/api
```

| Variabel | Deskripsi |
| --- | --- |
| `VITE_API_URL` | Alamat dasar API |

> Nilai pada frontend dibaca secara terpusat melalui `src/lib/config.js`.

---

## Pengujian

Proyek menggunakan **Vitest** dengan pelaporan cakupan kode berbasis **v8**. Backend diuji dengan **Supertest** menggunakan database SQLite di memori, sehingga data asli tidak tersentuh. Frontend diuji dengan **jsdom** dan **Testing Library**.

```bash
# Backend
cd backend
bun run test

# Frontend
cd frontend
bun run test
```

Laporan coverage tersedia di direktori `coverage/` pada masing-masing folder (termasuk `lcov.info`).

### Cakupan Pengujian

| Modul | Berkas Pengujian | Status |
| --- | --- | --- |
| **Backend materi dan sesi** | `api.test.js`: CRUD materi, sesi belajar, validasi, cascade delete, penanganan error (16 skenario) | Selesai, akan disesuaikan dengan token |
| **Backend autentikasi** | `auth.test.js`: registrasi, login, email ganda, token tidak valid, isolasi data antarpengguna | Direncanakan |
| **Utils dan Helpers** | `validators.test.js`, `formatters.test.js`, `apiClient.test.js`, `tokenStorage.test.js`, `dialogHelper.test.js` | Direncanakan |
| **Services Frontend** | `authService.test.js`, `materiService.test.js`, `sesiService.test.js` | Direncanakan |
| **Hooks dan Context** | `useInput.test.js`, `AuthContext.test.jsx`, `useMateri.test.jsx`, `useSesi.test.jsx` | Direncanakan |
| **Components** | `LoginForm.test.jsx`, `RegisterForm.test.jsx`, `ProtectedRoute.test.jsx`, `MateriForm.test.jsx`, `MateriList.test.jsx`, `MateriFilter.test.jsx`, `SesiForm.test.jsx`, `SesiList.test.jsx` | Direncanakan |
| **Pages** | `LoginPage.test.jsx`, `RegisterPage.test.jsx`, `MateriListPage.test.jsx`, `MateriDetailPage.test.jsx`, `NotFoundPage.test.jsx` | Direncanakan |

---

## Deployment

Frontend dan backend dijalankan sebagai dua bagian terpisah.

- **Frontend:** layanan hosting statis seperti Vercel, dengan Root Directory `frontend`, preset `Vite`, dan variabel `VITE_API_URL` berisi alamat API yang sudah di-deploy.
- **Backend:** layanan dengan **penyimpanan persisten**, karena SQLite menyimpan data dalam berkas. Variabel yang diatur: `PORT`, `DB_PATH` (mengarah ke disk persisten), `CORS_ORIGIN` (URL frontend), `JWT_SECRET`, `JWT_EXPIRES_IN`, dan `NODE_ENV=production`.

---

## Praktik Terbaik yang Diterapkan

### Struktur Proyek
- Frontend berbasis fitur (`features/auth`, `features/materi`, `features/sesi`): komponen, hook, halaman, dan service berada dalam fitur masing-masing.
- Penamaan konsisten: komponen `PascalCase`, hook diawali `use`, berkas backend memakai sufiks peran (`materi.controller.js`).

### Kode Bersih
- Nama variabel dan fungsi menjelaskan tujuannya.
- Logika berulang diekstrak menjadi fungsi bersama (`utils`, `helpers`).
- Komentar hanya menjelaskan alasan, bukan mengulang isi kode.

### Keamanan dan Praktik Terbaik
- Kata sandi di-hash dengan bcrypt dan tidak pernah dikembalikan oleh API.
- Endpoint dilindungi token JWT; data dibatasi per pengguna sehingga tidak bisa diakses pengguna lain.
- Pesan login bersifat umum agar tidak membocorkan email yang terdaftar.
- Validasi input di backend dan di form frontend.
- Penanganan error terpusat dengan format response seragam.
- Query SQL memakai parameter terikat untuk mencegah SQL injection.
- Konfigurasi dan rahasia (`JWT_SECRET`) disimpan di environment variable, bukan di kode.
- CORS dibatasi hanya untuk alamat frontend yang diizinkan.
- Pengujian memakai database di memori agar terisolasi.

### Pemisahan Tanggung Jawab
- Backend: route, middleware, controller, service, dan repository masing-masing memiliki satu peran.
- Frontend: komponen hanya menampilkan antarmuka, context menyimpan status login, hook mengelola state, service menjadi satu-satunya pintu ke API, dan fungsi murni dipisahkan ke `utils`.

---

<div align="center">

Dibuat untuk mata kuliah **Pengembangan Aplikasi Berbasis Web (PABWE) 2026**

**Lyson Paulus Esar Manik - 11S24024 - ifs24024**

</div>
