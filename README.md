# 📚 UAS Pemrograman Web - 122140010

Repositori ini merupakan proyek akhir mata kuliah **Pemrograman Web Semester Genap 2024/2025**, dengan implementasi **Frontend (React.js)** dan **Backend (Express.js)** secara terpisah. Aplikasi ini mengelola data buku dan menyediakan fitur **CRUD lengkap**.

---

## 👩‍💻 Identitas Mahasiswa

- **Nama:** Yohanna Anzelika
- **NIM:** 122140010
- **Mata Kuliah:** Pemrograman Web
- **Dosen Pengampu:** Muhammad Habib Algifari, S.Kom., M.T.

---

## 🚀 Teknologi yang Digunakan

### 🔧 Backend

- Python 3.x
- Pyramid Framework
- PostgreSQL

### 🎨 Frontend

- React.js
- React Router DOM
- Axios
- CSS / Tailwind (opsional)

### 🔍 Tools & Pendukung

- Git & GitHub
- Postman
- VSCode
- PgAdmin / DBeaver

---

## 🗂️ Struktur Proyek

UAS_pemrograman_web_122140010/
├── backend/ # Backend Pyramid
│ ├── app/
│ │ ├── main.py # Entry point Pyramid
│ │ ├── models.py # Definisi tabel User, Produk
│ │ ├── views.py # Endpoint API (CRUD, login, dsb.)
│ │ └── init.py
│ ├── development.ini # Konfigurasi Pyramid + DB
│ └── .env
│
├── frontend/ # Frontend React App
│ ├── src/
│ │ ├── components/
│ │ ├── pages/
│ │ └── App.js
│ └── public/
│
├── README.md
└── .gitignore

## 💡 Fitur Aplikasi

- Login & role (admin / user)
- CRUD Produk (Create, Read, Update, Delete)
- Validasi input
- Proteksi token pada endpoint
- UI responsif & routing React
- Integrasi REST API: Fetch / Axios

## 🧪 Cara Menjalankan Proyek

### 1. Jalankan ▶️ Backend (Pyramid)

```bash
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
$env:PYTHONPATH="."
pserve development.ini


2. Jalankan Frontend
cd frontend
npm install
npm start

📌 Contoh API Endpoint
| Method | Endpoint          | Deskripsi                  |
| ------ | ----------------- | -------------------------- |
| POST   | `/api/register`   | Daftarkan user baru        |
| POST   | `/api/login`      | Login, return token        |
| GET    | `/api/produk`     | Ambil daftar produk        |
| POST   | `/api/produk`     | Tambah produk (admin only) |
| PUT    | `/api/produk/:id` | Edit produk                |
| DELETE | `/api/produk/:id` | Hapus produk               |


📷 Screenshot
## 📷 Screenshot Antarmuka

### Halaman Beranda
![Beranda Page](/assets/Beranda-Page.png)

### Halaman Keranjang
![Cart Page](/assets/Cart-Page.png)

### Halaman Detail Product
![Product Detail Page](/assets/Product-Detail.png)

### Halaman Product List
![Product List Page](/assets/Product-List.png)

### Halaman Profil Page
![Profil Page](/assets/Profil-Page.png)

📚 Referensi
- Pyramid Documentation
- React Docs
- PostgreSQL Docs
- TailwindCSS

Dikembangkan sebagai bagian dari UAS Pemrograman Web - Institut Teknologi Sumatera 2025
```

git add assets/\*
