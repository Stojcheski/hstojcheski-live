# 🧠 Project Summary: `hstojcheski-live` (Vue.js Portfolio + Blog CMS)

## 📦 Project Overview

This is a full-stack personal portfolio website designed and developed by **Hristijan Stojcheski**, primarily showcasing Salesforce certifications, projects, and blog posts. It consists of a **Vue 3 + TypeScript frontend** and a **Node.js + Express + MongoDB backend**, hosted on a DigitalOcean droplet with SSL, served via Nginx.

---

## 🖥️ Frontend (`hstojcheski-live`)

- **Framework**: Vue 3 with TypeScript
- **Build Tool**: Vite
- **Routing**: Vue Router (`index.ts`)
- **State Management**: Pinia
- **Styling**: CSS Modules, Global CSS (`main.css`, `base.css`)
- **UI Structure**:
  - **Views**: Home, About, Experience, Skills, Projects, Blog, BlogPost, Contact
  - **Admin Views**:
    - Dashboard (with authentication)
    - Blog management: Create, Edit, List
  - **Layout Components**: Header, Footer
  - **Icon Components**: Modular icon system for navigation/UX
- **Auth & Blog Stores**: Stores manage login state, user roles, and blog fetching via REST APIs
- **Assets**: Includes Salesforce badges and a personal graduation image
- **Mount Point**: `#app` in `index.html`

---

## 🔐 Admin Panel

- Accessible via `/admin` routes
- Views:
  - `AdminLoginView`: Authenticates user via backend
  - `AdminDashboardView`: Lists all blogs
  - `AdminBlogView`, `AdminBlogEditView`, `BlogEditor`: For CRUD operations
- Requires role: `"admin"` or `"author"` (handled in backend, integration in progress)

---

## ⚙️ Backend (`hstojcheski-live-backend`)

- **Framework**: Express.js with ES Modules
- **Database**: MongoDB Atlas
- **ODM**: Mongoose
- **Environment Config**: `.env` with `MONGODB_URI` and `PORT=5000`
- **Authentication**:
  - `POST /auth/login`: Verifies users and returns info (JWT integration recommended later)
- **Blog API** (`/blogs`):
  - `GET /`: Fetch published blogs
  - `GET /:id`: Fetch a blog and increment views
  - `POST /`: Create a new blog (role-restricted)
  - `PUT /:id`: Edit blog content and metadata
  - `DELETE /:id`: Soft-delete with metadata (e.g. deletedBy)

### 📄 Mongoose Models

- **User**:
  - Fields: username, email, hashed password, role (admin/author/editor/viewer)
- **Blog**:
  - Rich blog schema with fields for publishing, likes, views, draft/scheduled states, and front-page placements

---

## 🌐 Deployment Details

- **Hosting**: DigitalOcean Ubuntu 24.10 Droplet
- **Frontend Path**: `/var/www/html` (served via Nginx)
- **SSL**: TLS 1.2/1.3 manually configured using DigitalOcean-provided certs
- **Nginx**: Redirects HTTP → HTTPS, serves frontend and proxies backend if needed

---

## 🚧 In Progress / To Do

- Add authentication middleware to protect blog creation/edit routes
- Implement JWT-based login on frontend
- Finalize admin UI for draft/scheduled blog states
- Optionally add markdown/blog editor enhancements
- Optionally use Cloudinary or S3 for blog images
