# 🎮 GamePatty - Cinematic Game Studio Portfolio & CMS

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB) ![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white) ![Firebase](https://img.shields.io/badge/Firebase-039BE5?style=for-the-badge&logo=Firebase&logoColor=white)

A high-performance, immersive portfolio website designed for game studios. It features a cinematic frontend for players and a powerful, password-protected **Headless CMS (Admin Panel)** for the client to manage games, assets, and release schedules without writing code.

🔗 **Live Demo:** [https://www.gamepatty.com](https://www.gamepatty.com)

---

## 📸 Screenshots

### Immersive Frontend
![Home Page](./screenshots/home-preview.png)
*Cinematic Hero Banner and "New Releases" section with automated expiration logic.*

### Custom Admin CMS (Hidden Route)
![Admin Dashboard](./screenshots/admin-panel.png)
*Secure admin interface allowing full CRUD operations on games, client projects, and site settings.*

### Dynamic Game Details
![Game Detail](./screenshots/game-detail.png)
*Dedicated game pages with video embeds, store links, and masonry-style image galleries.*

---

## 🚀 Key Features

* **⚡ Automated Content Curation:**
    * **New Releases:** Automatically displays the most recent games based on specific logic. Older games drop off automatically as new ones are added.
    * **Coming Soon:** Automatically detects games with missing store links and moves them to a "Coming Soon" section.
* **🔐 Secure Admin Portal:** A hidden `/admin` route protected by Firebase Authentication, allowing non-technical staff to update the site content and media.
* **🎨 Dynamic Layouts:** Features Pinterest-style **Masonry Grids** that adapt to portrait or landscape game art.
* **☁️ Cloud Asset Management:** Integrated Firebase Storage for direct image uploads via the Admin Panel forms.
* **📱 Fully Responsive:** Optimized for desktop, tablet, and mobile experiences using Tailwind CSS.

---

## 🛠️ Tech Stack

* **Frontend:** React.js (Vite), Tailwind CSS, Framer Motion
* **CMS / Admin:** React-Admin, Material UI
* **Backend (Serverless):** Firebase Cloud Firestore
* **Authentication:** Firebase Auth (Email/Password)
* **Storage:** Firebase Cloud Storage
* **Routing:** React Router DOM

---

## ⚙️ Installation & Setup

### 1. Clone the Repository
```bash
git clone [https://github.com/JayaantKumar/gamepatty.git](https://github.com/JayaantKumar/gamepatty.git)
cd gamepatty