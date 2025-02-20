# 🌍 Travel Article App

**Travel Article App** adalah aplikasi berbasis web yang memungkinkan pengguna untuk **menjelajahi, menambahkan, menghapus, dan membaca artikel seputar destinasi perjalanan**. Aplikasi ini dibangun menggunakan **ReactJS, TypeScript, Redux, dan TailwindCSS**, serta terintegrasi dengan API untuk mengelola artikel secara dinamis.

---

 **Fitur Utama**
✔ **Autentikasi Pengguna** (Login & Register)  
✔ **Menampilkan Daftar Artikel** (Fetching data dari API)  
✔ **Melihat Detail Artikel**  
✔ **CRUD Artikel** (Create, Read, Delete)  
✔ **Responsive Design** (Mobile & Desktop)  
✔ **Pagination & Filter Artikel**  
✔ **Integrasi API dengan Backend**  

---

 **Tech Stack**
| Tech | Deskripsi |
|------|----------|
| **React.js** | Library utama untuk membangun UI |
| **TypeScript** | Superset dari JavaScript untuk kode yang lebih terstruktur |
| **Redux Toolkit** | State management untuk mengelola data artikel & autentikasi |
| **Tailwind CSS** | Framework CSS untuk styling yang cepat dan responsif |
| **React Router** | Untuk navigasi antar halaman |
| **Axios** | Untuk melakukan HTTP request ke API |
| **Framer Motion** | Untuk animasi UI yang lebih menarik |
| **SHADCN/UI** | Komponen UI yang elegan & mudah digunakan |

---
 **Struktur Proyek**
src/
│
├── components/
│   ├── ArticleCard.tsx
│   ├── ArticleDetail.tsx
│   ├── ArticleList.tsx
│   ├── Header.tsx
│   ├── LoadingSpinner.tsx
│   ├── LoginForm.tsx
│   ├── RegisterForm.tsx
│   └── Pagination.tsx
│
├── pages/
│   ├── Home.tsx
│   ├── Login.tsx
│   ├── Register.tsx
│   ├── ArticleDetailPage.tsx
│   └── LandingPage.tsx
│
├── store/
│   ├── slices/
│   │   └── articleSlice.ts
│   └── store.ts
│
├── hooks/
│   └── useAuth.ts
│
├── utils/
│   ├── api.ts
│   └── validationSchemas.ts
│
├── App.tsx
├── main.tsx
└── index.css


## 🚀 Instalasi & Menjalankan Proyek
Pastikan kamu sudah menginstall **Node.js** & **npm/yarn** sebelum menjalankan proyek.

1 ** Clone Repo **
```sh
git clone https://github.com/KhresnaDeva/travel-app.git
cd travel-article-app

2 **Run Project**
npm run dev
# atau
yarn dev


** API Integration**
/auth/local	POST	Login pengguna
/auth/local/register	POST	Registrasi pengguna
/articles	GET	Ambil daftar artikel
/articles/{documentId}	GET	Ambil detail artikel
/articles	POST	Tambah artikel baru
/articles/{documentId}	DELETE	Hapus artikel

** Fitur Tambahan**
Paginasi & Filter Artikel → Memungkinkan pengguna untuk menelusuri lebih banyak artikel dengan pagination dan filtering.
Animasi Halus → Menggunakan Framer Motion untuk efek animasi transisi.
SHADCN/UI Styling → UI yang lebih elegan dan modern.
Autentikasi JWT → Menggunakan Bearer Token untuk akses API yang aman.
