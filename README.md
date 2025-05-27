# 📚 UAS Pemrograman Web 122140010

Repositori ini berisi proyek UAS mata kuliah Pemrograman Web, dengan implementasi **Frontend (React.js)** dan **Backend (Express.js)** secara terpisah.

## 🗂️ Struktur Direktori

```
UAS_pemrograman_web_122140010/
│
├── backend/                      # 🔧 Backend API (Node.js + Express)
│   ├── controllers/              # 📦 Logika kontrol aplikasi
│   │   └── bookController.js
│   ├── models/                   # 📄 Model data (misalnya skema buku)
│   │   └── bookModel.js
│   ├── routes/                   # 🧭 Routing endpoint API
│   │   └── bookRoutes.js
│   ├── middleware/              # 🛡️ Middleware (opsional)
│   │   └── logger.js
│   ├── config/                   # ⚙️ Konfigurasi environment/db (opsional)
│   │   └── db.js
│   ├── .env                      # 🔐 Variabel lingkungan (jangan upload ke GitHub)
│   ├── index.js                  # 🚀 Entry point server
│   ├── package.json              # 📦 Dependency & metadata backend
│   └── README.md                 # 📘 Dokumentasi backend (opsional)
│
├── frontend/                     # 🎨 Frontend React App
│   ├── public/                   # 🌐 File statis publik
│   │   └── index.html
│   ├── src/                      # 🧠 Source code utama
│   │   ├── components/           # 🧩 Komponen UI
│   │   │   ├── BookList.js
│   │   │   └── BookForm.js
│   │   ├── pages/                # 📄 Halaman (routing React)
│   │   │   └── Home.js
│   │   ├── App.js                # 🧭 Komponen utama aplikasi
│   │   ├── index.js              # 🚪 Entry point React DOM
│   │   ├── App.css               # 🎨 Styling global
│   ├── package.json              # 📦 Dependency & metadata frontend
│   └── README.md                 # 📘 Dokumentasi frontend (opsional)
│
├── .gitignore                    # ❗ Daftar file yang diabaikan Git
├── README.md                     # 📝 Dokumentasi utama proyek
└── LICENSE                       # 📜 Lisensi proyek (opsional)
```

## 🚀 Teknologi yang Digunakan

- **Frontend:** React.js, HTML, CSS, JavaScript
- **Backend:** Node.js, Express.js
- **Tools:** Git, GitHub, VSCode, Postman (opsional)

## 🧑‍🎓 Identitas Mahasiswa

- **Nama:** Yohanna Anzelika
- **NIM:** 122140010
- **Mata Kuliah:** Pemrograman Web
- **Dosen Pengampu:** [Nama Dosen]
