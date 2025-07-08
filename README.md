<!-- markdownlint-disable MD033 MD041 MD026 MD012 MD024 MD001 MD040 -->

<!-- {
  "default": true,
  "MD033": false,  // Allow inline HTML (e.g. <br>, <img>, <div>)
  "MD041": false,  // Don't force first line to be a top-level heading
  "MD026": false,  // Allow trailing punctuation in headings
  "MD012": false,  // Allow multiple consecutive blank lines
  "MD024": false,  // Allow duplicate headings
  "MD001": false,  // Don't enforce heading increments (h1 -> h2 -> h3...)
  "MD040": false   // Don't require language for fenced code blocks
} -->

<div align="center">

# Daily Spews - Frontend

[![React](https://img.shields.io/badge/React-19.1.0-61DAFB?logo=react&logoColor=black)](https://reactjs.org/)
&nbsp;
[![Vite](https://img.shields.io/badge/Vite-6.3.5-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
&nbsp;
[![React Router](https://img.shields.io/badge/React_Router-7.6.0-CA4245?logo=react-router&logoColor=white)](https://reactrouter.com/)
&nbsp;
[![Axios](https://img.shields.io/badge/Axios-1.9.0-5A29E4?logo=axios&logoColor=white)](https://axios-http.com/)
&nbsp;
[![ESLint](https://img.shields.io/badge/ESLint-9.25.0-4B32C3?logo=eslint&logoColor=white)](https://eslint.org/)
&nbsp;
[![Last Commit](https://img.shields.io/github/last-commit/kevpstephens/daily-spews-frontend)](https://github.com/kevpstephens/daily-spews-frontend/commits/main)

</div>

> - **Daily Spews** is a full-stack, Reddit-style satirical news platform built using **React**, **Vite**, and a custom **Node.js / PostgreSQL** backend.
> - Users can browse, post, vote, and comment on articles in real time, with full authentication, avatar uploads, responsive design, and mobile-first performance.
> - Built as part of the **Northcoders Software Engineering Bootcamp**, the project showcases a professional-grade frontend architecture, clean UI/UX, and full API integration.

<br>
<p align="center">
  <img src="public/assets/logo/daily-spews-logo.png" alt="Daily Spews logo" width="150" height=auto/>
</p>
<br>

A modern, responsive React frontend for Daily Spews - a satirical news application built as part of the Northcoders Software Development Bootcamp. <br>

- Built with **React 19**, **Vite**, and **React Router** for a fast, modern user experience
- Features a clean, intuitive interface for browsing articles, topics, and user profiles
- Includes user authentication, article voting, commenting, and avatar management
- Responsive design that works seamlessly on desktop and mobile devices
- Real-time toast notifications and comprehensive error handling
- Connects to the Daily Spews API backend for data management

<br>

🔗 **Live Frontend** - [https://daily-spews.onrender.com](https://daily-spews.onrender.com) <br>
🔗 **API Backend** - [https://daily-spews-api.onrender.com/api](https://daily-spews-api.onrender.com/api) <br>
🖥️ **Backend Repo:** [daily-spews-backend](https://github.com/kevpstephens/daily-spews-backend)

## <br><br>

## 🚀 Guest Login (Test User)

To make it easy for anyone to explore the full functionality of Daily Spews, you can log in instantly as a test user by clicking the **"Try as Test User"** button on the login page. No sign-up required!

## <br><br>

# Index:

- [Key Features](#key-features)
- [Tech Stack](#tech-stack)
- [Quick Start](#quick-start)
- [Architecture Overview](#architecture-overview)
- [Future Enhancements](#future-enhancements)

## <br><br>

# Key Features:

### 📰 **Article Management**

- Browse, sort, and filter articles by topics with smooth pagination
- Create articles with image upload and cropping (16:9 aspect ratio)
- Optimistic voting system with real-time UI updates

### 💬 **Interactive Comments**

- Infinite scroll pagination with smooth loading states
- Post, vote, and delete comments with auto-expanding forms
- Hash-based navigation for direct comment linking

### 👤 **User Authentication & Profiles**

- JWT-based authentication with secure cookie handling
- User registration and profile management with avatar uploads
- Two-phase loading strategy for optimal mobile performance

### 🎨 **Modern UI/UX**

- Mobile-first responsive design with touch-friendly interactions
- Animated loading states with context-aware mascot
- Toast notifications and comprehensive error boundaries
- Custom image cropping modals for avatars and articles

### 🏷️ **Topic System**

- Horizontal scrollable topic navigation on homepage
- Dedicated topic pages with infinite scroll articles
- Grid-based topic browsing with visual cards

## <br><br>

# Tech Stack:

| 🛠️ **Technology**   | 🔍 **Purpose**      | 📋 **Key Features**                        |
| ------------------- | ------------------- | ------------------------------------------ |
| **React 19**        | Frontend Framework  | Latest React features, optimized rendering |
| **Vite**            | Build Tool          | Fast HMR, optimized production builds      |
| **React Router 7**  | Client-side Routing | Nested layouts, protected routes           |
| **Axios**           | HTTP Client         | Interceptors, request/response handling    |
| **React Toastify**  | Notifications       | User feedback, error handling              |
| **React Easy Crop** | Image Processing    | Avatar and article image cropping          |
| **Lucide React**    | Icons               | Consistent iconography                     |
| **Day.js**          | Date Handling       | Lightweight date formatting                |

## <br><br>

# Quick Start:

```bash
# Clone and install
git clone https://github.com/kevpstephens/daily-spews-frontend.git
cd daily-spews-frontend
npm install

# Environment setup
echo "VITE_API_URL=http://localhost:9090/api" > .env

# Development
npm run dev          # Start dev server (localhost:5173)
npm run build        # Production build
npm run preview      # Preview production build
```

## <br><br>

# Architecture Overview:

### **Project Structure**

```
src/
├── api/                 # Centralized API client with Axios
├── components/          # Reusable UI components
│   ├── ArticleCard/     # Article preview cards
│   ├── CommentList/     # Infinite scroll comments
│   ├── VoteButton/      # Optimistic voting system
│   ├── MobileHeader/    # Mobile-specific navigation
│   └── LoadingScreen/   # Context-aware loading states
├── pages/               # Route-level components
├── context/             # User authentication state
├── hooks/               # Custom React hooks (useFetch, useError)
├── utils/               # Helper functions
└── styles/              # Global CSS and component styles
```

### **Key Architectural Decisions**

- **State Management**: Context API for user authentication, local state for components
- **Data Fetching**: Custom `useFetch` hook with loading/error states
- **Authentication**: JWT cookies with localStorage persistence and automatic session validation
- **Image Handling**: File validation, cropping, and optimized uploads
- **Mobile Optimization**: Intersection Observer for infinite scroll, responsive breakpoints
- **Error Handling**: Error boundaries with graceful fallbacks and user-friendly messages

### **Performance Features**

- **Optimistic UI Updates** - Immediate feedback for voting and commenting
- **Infinite Scroll** - Intersection Observer for seamless content loading
- **Image Optimization** - File validation, compression, and lazy loading
- **Code Splitting** - Route-based splitting with React Router
- **Responsive Design** - Mobile-first approach with touch-friendly interactions

## <br><br>

# Future Enhancements:

- **🌙 Dark Mode** - System preference detection with theme persistence
- **🔍 Search Functionality** - Full-text search across articles and comments
- **📱 Progressive Web App** - Offline functionality and installable experience
- **🔔 Real-time Notifications** - WebSocket integration for live updates
- **📊 User Analytics** - Engagement metrics and personalized recommendations
- **🛡️ Content Moderation** - Automated filtering and admin tools

<br>
<br>
<br>

> This portfolio project was created as part of a Digital Skills Bootcamp in Software Engineering provided by [Northcoders](https://northcoders.com/)
