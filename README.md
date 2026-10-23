# HyperLink

Aplikasi web untuk mencatat materi pemrograman yang sedang dipelajari beserta sesi belajarnya. Pengguna dapat mengelola daftar materi, mencatat durasi dan catatan setiap sesi, serta memantau total waktu belajar pada setiap materi.

Dibuat untuk memenuhi **Proyek 1** mata kuliah **Pengembangan Aplikasi Berbasis Web (PABWE) 2026**.

| Informasi | Keterangan |
|---|---|
| Nama repositori | `ifs24024-pabwe2026-p1` |
| Nama mahasiswa | Lyson Paulus Esar Manik |
| NIM | 11S24024 |

## Tautan Penting

| Artefak | Tautan |
|---|---|
| Aplikasi (frontend) | `<isi URL aplikasi>` |
| API (backend) | `<isi URL API>` |
| Video YouTube | `<isi URL video>` |
| Hasil pengujian Jenkins | `<isi URL atau lampiran>` |

## Fitur

- Menambah, melihat, mengubah, dan menghapus materi belajar.
- Menetapkan status materi: `belum`, `sedang`, atau `selesai`.
- Mencatat sesi belajar (tanggal, durasi, catatan) pada setiap materi.
- Menampilkan total menit belajar per materi.
- Validasi input, indikator loading, dan pesan error yang jelas.

## Teknologi

| Lapisan | Teknologi |
|---|---|
| Runtime | Node.js 20 LTS, npm |
| Backend | Express.js |
| Database | SQLite (`better-sqlite3`) |
| Frontend | React, Vite, React Router |
| Pengujian | Vitest |
| Kualitas kode dan CI/CD | SonarQube, Jenkins |
| Hosting frontend | Vercel |

## Arsitektur

Frontend tidak mengakses database secara langsung. Seluruh data melalui API.

```
React (frontend)  <--  HTTP / JSON  -->  Express (backend)  <--  SQL  -->  SQLite
```

Alur di backend: `Route -> Controller -> Service -> Repository -> Database`

| Lapisan | Tanggung jawab |
|---|---|
| Route | Menentukan endpoint |
| Controller | Menerima request dan mengirim response |
| Service | Aturan bisnis dan validasi |
| Repository | Satu-satunya tempat query SQL |

Alur di frontend: `Page -> Hook -> Service -> API`

| Lapisan | Tanggung jawab |
|---|---|
| Pages dan Components | Tampilan |
| Hooks | Pengelolaan state dan pengambilan data |
| Services | Satu-satunya tempat pemanggilan API |
| Utils | Fungsi bantu seperti validasi dan pemformatan |

## Struktur Proyek

```
ifs24024-pabwe2026-p1/
|-- backend/
|   |-- src/
|   |   |-- config/          # koneksi database dan environment
|   |   |-- controllers/
|   |   |-- services/
|   |   |-- repositories/
|   |   |-- routes/
|   |   |-- middlewares/     # penanganan error terpusat
|   |   |-- utils/
|   |   |-- app.js
|   |   `-- server.js
|   |-- tests/
|   |-- .env.example
|   `-- package.json
|-- frontend/
|   |-- src/
|   |   |-- components/
|   |   |-- pages/
|   |   |-- hooks/
|   |   |-- services/
|   |   |-- utils/
|   |   |-- App.jsx
|   |   `-- main.jsx
|   |-- tests/
|   |-- .env.example
|   `-- package.json
|-- Jenkinsfile
|-- sonar-project.properties
`-- README.md
```

## Desain Database

Satu materi memiliki banyak sesi belajar.

```sql
CREATE TABLE IF NOT EXISTS materi (
  id          INTEGER PRIMARY KEY AUTOINCREMENT,
  judul       TEXT NOT NULL,
  sumber      TEXT,
  status      TEXT NOT NULL DEFAULT 'belum'
              CHECK (status IN ('belum', 'sedang', 'selesai')),
  created_at  TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
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

## Dokumentasi API

Base URL lokal: `http://localhost:3000/api`

Format response berhasil: `{ "success": true, "message": "...", "data": {} }`

Format response gagal: `{ "success": false, "message": "...", "errors": [] }`

| Method | Endpoint | Deskripsi |
|---|---|---|
| GET | `/materi` | Semua materi beserta total menit belajar |
| GET | `/materi/:id` | Satu materi |
| POST | `/materi` | Membuat materi |
| PUT | `/materi/:id` | Mengubah materi |
| DELETE | `/materi/:id` | Menghapus materi beserta sesinya |
| GET | `/materi/:materiId/sesi` | Semua sesi pada suatu materi |
| POST | `/materi/:materiId/sesi` | Menambah sesi belajar |
| DELETE | `/sesi/:id` | Menghapus satu sesi |

Contoh body `POST /materi`:

```json
{
  "judul": "JavaScript Dasar",
  "sumber": "SoloLearn",
  "status": "sedang"
}
```

Contoh body `POST /materi/:materiId/sesi`:

```json
{
  "tanggal": "2026-10-23",
  "durasi_menit": 45,
  "catatan": "Mempelajari perulangan dan fungsi"
}
```

## Menjalankan di Lokal

Prasyarat: Node.js 20 LTS, npm, dan Git.

**1. Clone repositori**

```bash
git clone https://github.com/<username-github>/ifs24024-pabwe2026-p1.git
cd ifs24024-pabwe2026-p1
```

**2. Jalankan backend**

```bash
cd backend
npm install
cp .env.example .env
npm run dev
```

Backend berjalan di `http://localhost:3000`. Database dan tabel dibuat otomatis saat server pertama kali dijalankan.

**3. Jalankan frontend** (di terminal baru)

```bash
cd frontend
npm install
cp .env.example .env
npm run dev
```

Buka `http://localhost:5173` pada peramban.

## Konfigurasi Environment

`backend/.env`

| Variabel | Contoh | Keterangan |
|---|---|---|
| `PORT` | `3000` | Port server |
| `DB_PATH` | `./data/catatan.db` | Lokasi berkas SQLite |
| `CORS_ORIGIN` | `http://localhost:5173` | Alamat frontend yang diizinkan |

`frontend/.env`

| Variabel | Contoh | Keterangan |
|---|---|---|
| `VITE_API_URL` | `http://localhost:3000/api` | Alamat dasar API |

## Pengujian

```bash
cd backend && npm test
cd frontend && npm test
```

Pengujian memakai Vitest dan menghasilkan laporan coverage (`lcov`) yang dibaca SonarQube.

## SonarQube dan Jenkins

Analisis kode dikonfigurasi pada `sonar-project.properties`. Pipeline Jenkins pada `Jenkinsfile` menjalankan tahapan berikut:

1. Checkout kode dari GitHub
2. `npm ci` pada backend dan frontend
3. `npm test` pada backend dan frontend
4. Analisis dengan `sonar-scanner`
5. `npm run build` pada frontend

## Deployment

- **Frontend:** Vercel, dengan Root Directory `frontend`, preset `Vite`, dan variabel `VITE_API_URL` berisi alamat API.
- **Backend:** di-deploy pada layanan dengan penyimpanan persisten, karena SQLite menyimpan data dalam berkas. Variabel yang diatur: `PORT`, `DB_PATH`, dan `CORS_ORIGIN` (diisi URL frontend).

## Praktik Terbaik yang Diterapkan

- Validasi input di frontend dan backend.
- Penanganan error terpusat dengan format response seragam.
- Query SQL memakai parameter terikat untuk mencegah SQL injection.
- Konfigurasi disimpan di environment variable, bukan di kode.
- CORS dibatasi hanya untuk alamat frontend yang diizinkan.
- Pemisahan tanggung jawab yang jelas antara tampilan, state, akses API, dan data.
