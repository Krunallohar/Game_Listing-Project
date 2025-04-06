# 🎮 GameVerse - Game Discovery Web App

**Live Demo:** 🌐 [gamelisting.netlify.app](http://gamelisting.netlify.app)

GameVerse is a modern React web app for discovering, filtering, and bookmarking your favorite video games using the RAWG API. It features user authentication, personalized bookmarks, and a beautiful, responsive UI.

---

## 🚀 Features

- 🔍 **Search Games** – Quickly search any title
- 🎮 **Filter Games** – Use dynamic sidebar filters (genre, platform, etc.)
- 🖼️ **Game Details** – View full descriptions, screenshots, ratings, and system requirements (PC & Mac only)
- ⭐ **Bookmark System** – Save favorite games per user
- 🔐 **Authentication** – Sign In/Sign Up with Clerk
- 📱 **Responsive UI** – Mobile-friendly layout
- ⚛️ **Redux** – Centralized state management
- 🌐 **Routing** – Seamless navigation with React Router

---

## 🧰 Tech Stack

- React + Vite
- Redux Toolkit
- React Router DOM
- Clerk Authentication
- RAWG API
- Bootstrap & Vanilla CSS

---

## 📦 Installation & Setup

### 1. Clone the repository

```bash
git clone https://github.com/Krunallohar/Game_Listing-Project.git
cd Game_Listing-Project

```
### 2. Install dependencies

npm install

### 3. Create .env file

Add your API keys:
VITE_RAWG_API_KEY=your_rawg_api_key
VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key

Get your keys from:

RAWG API

Clerk.dev

### 4. Run the app locally

npm run dev

Then open your browser at: http://localhost:5173


## 🔐 Auth & Bookmarks
->Uses Clerk for secure login/signup.

->Bookmarked games are stored per authenticated user.

->Bookmarks are saved to localStorage with user ID for persistence.

->Sign in required to access bookmark page.

## 📦 Build & Deploy (Netlify)
Add _redirects file to public/:
/*    /index.html   200

Then build your app: npm run build

Deploy the dist/ folder to Netlify or any other static host.

Live App URL: http://gamelisting.netlify.app




