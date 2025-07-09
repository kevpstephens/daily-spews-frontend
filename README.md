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
[![Last Commit](https://img.shields.io/github/last-commit/kevpstephens/daily-spews-frontend?color=8B5CF6)](https://github.com/kevpstephens/daily-spews-frontend/commits/main)
&nbsp;
[![Deployment Status](https://img.shields.io/badge/Deployment-Live_on_Render-F97316?logo=render&logoColor=white)](https://daily-spews.onrender.com)
&nbsp;
[![Accessibility](https://img.shields.io/badge/Accessibility-WCAG_2.1_AA-10B981?logo=accessibility&logoColor=white)](https://www.w3.org/WAI/WCAG21/quickref/)
&nbsp;
[![Code Quality](https://img.shields.io/badge/Code_Quality-Airbnb_ESLint-7C3AED?logo=eslint&logoColor=white)](https://github.com/airbnb/javascript)

</div>

> - **Modern React 19 frontend** for Daily Spews - a full-stack satirical news platform showcasing contemporary web development practices and clean architecture.
> - **Performance-focused** with optimistic UI updates, infinite scroll, image processing, and accessibility features.
> - **Built as a portfolio showcase** for the Northcoders Software Engineering Bootcamp, demonstrating React patterns, modern development best practices, and deployment workflows.

<br>
<p align="center">
  <img src="public/assets/logo/daily-spews-logo.png" alt="Daily Spews logo" width="150" height=auto/>
</p>
<br>

A **modern**, responsive React frontend for Daily Spews - a satirical news application that demonstrates professional web development practices and contemporary React architecture. <br>

✨ **Key Technical Highlights:**

- **Modern React architecture** with custom hooks and optimised rendering
- **Robust error handling** with comprehensive logging and error boundaries
- **Accessibility features** with keyboard navigation and ARIA support
- **Mobile-first responsive design** that adapts seamlessly across devices
- **Optimistic UI updates** for seamless user experience
- **Clean code practices** with ESLint (Airbnb standards), Prettier, and error boundary handling

<br>

🔗 **Live Frontend** - [https://daily-spews.onrender.com](https://daily-spews.onrender.com) <br>
🔗 **API Backend** - [https://daily-spews-api.onrender.com/api](https://daily-spews-api.onrender.com/api) <br>
🖥️ **Backend Repo:** [daily-spews-backend](https://github.com/kevpstephens/daily-spews-backend)

## <br><br>

## 🎯 Try It Now - Guest Login

**Want to explore all features without signing up?**

Just visit the [live site](https://daily-spews.onrender.com) and click **"Try as Test User"** on the login page for instant access!

✅ **Full functionality available:**

- Post and vote on articles
- Leave comments and engage with the community
- Upload and crop your avatar
- Browse all topics and articles
- Experience the complete user journey

## <br><br>

<!--
## 📸 Screenshots

<div align="center">

### 🏠 Homepage - Article Discovery

![Homepage](path/to/homepage-screenshot.png)
_Responsive article browsing with topic navigation and infinite scroll_

### 💬 Comments - Interactive Discussion

![Comments](path/to/comments-screenshot.png)
_Real-time commenting with voting and threaded discussions_

### 📱 Mobile Experience

![Mobile](path/to/mobile-screenshot.png)
_Touch-optimised mobile interface with gesture support_

</div> -->

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
| **React 19**        | Frontend Framework  | Latest React features, optimised rendering |
| **Vite**            | Build Tool          | Fast HMR, optimised production builds      |
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
├── api/                 # Centralised API client with Axios
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
- **Image Handling**: File validation, cropping, and optimised uploads
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
- **📊 User Analytics** - Engagement metrics and personalised recommendations
- **🛡️ Content Moderation** - Automated filtering and admin tools
- **🧪 Testing Suite** - Jest unit tests, React Testing Library, and E2E testing with Cypress

<br>
<br>
<br>

> This portfolio project was created as part of a Digital Skills Bootcamp in Software Engineering provided by [Northcoders](https://northcoders.com/)
