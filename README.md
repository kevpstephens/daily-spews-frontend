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

>- **Daily Spews** is a full-stack, Reddit-style satirical news platform built using **React**, **Vite**, and a custom **Node.js / PostgreSQL** backend.  
>- Users can browse, post, vote, and comment on articles in real time, with full authentication, avatar uploads, responsive design, and mobile-first performance.  
>- Built as part of the **Northcoders Software Engineering Bootcamp**, the project showcases a professional-grade frontend architecture, clean UI/UX, and full API integration.

<br>
<p align="center">
  <img src="public/assets/logo/daily-spews-logo.png" alt="Daily Spews Logo" width="150" height=auto/>
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

# Index:

- [Features](#features)
- [Requirements](#requirements)
- [Installation & Setup](#installation--setup)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Available Scripts](#available-scripts)
- [Key Components](#key-components)
- [API Integration](#api-integration)

## <br><br>

# Features:

### 📰 **Article Management**

- Browse all articles with sorting (created_at, votes, comment_count) and filtering by topics
- View individual articles with full content, metadata, and voting system
- Create new articles with image upload and cropping functionality (16:9 aspect ratio)
- Vote on articles (upvote/downvote) with optimistic UI updates
- Filter articles by topics with horizontal scrollable topic navigation
- Pagination for article lists with smooth scrolling

### 💬 **Comment System**

- View comments on articles with infinite scroll pagination
- Post new comments with auto-expanding textarea
- Vote on comments with real-time updates
- Delete your own comments
- Smooth scrolling to comment sections via URL hash navigation

### 🏷️ **Topic System**

- Browse all available topics in a grid layout
- Filter articles by specific topics with dedicated topic pages
- Horizontal scrollable topic navigation on homepage
- Topic-specific article pages with infinite scroll

### 👤 **User Features**

- User registration with avatar upload and cropping (round aspect ratio)
- User login with password visibility toggle
- User profile pages with avatar management
- Avatar upload and cropping functionality with file validation
- Secure authentication with JWT cookies and localStorage persistence
- Development login shortcuts for admin users

### 🎨 **UI/UX Features**

- Responsive design optimized for mobile and desktop
- Mobile-specific header with animated greeting on homepage
- Modern, clean interface with smooth animations and transitions
- Toast notifications for user feedback and error handling
- Loading states with animated mascot and context-aware messages
- Error boundaries for graceful error handling
- Auto-expanding textareas and form validation
- Optimistic UI updates for better perceived performance

### 📱 **Mobile Optimizations**

- Mobile-specific navigation and header components
- Touch-friendly interface elements
- Optimized scrolling and pagination for mobile devices
- Responsive typography and layout adjustments
- Mobile-specific animations and interactions

## <br><br>

# Requirements:

To run this project locally, ensure you have the following installed:

- [**Node.js**](http://nodejs.org): v18.x or higher
- [**npm**](https://www.npmjs.com/) or [**yarn**](https://yarnpkg.com/): Package manager

<br>

> 💡 **Note:** Full **tech stack** listed <u>[below](#tech-stack)</u>.

## <br><br>

# Installation & Setup:

### 1️⃣ - 🧬 Clone the repo:

> Clone the repo down to your local machine using Git

```bash
git clone https://github.com/kevpstephens/daily-spews-frontend.git
cd daily-spews-frontend
```

<br>

### 2️⃣ - 📦 Install dependencies:

> Install all project dependencies listed in the package.json

```bash
npm install
```

<br>

### 3️⃣ - ⚙️ Setup environment variables:

> Create a `.env` file in your project's root directory:

```shell
# .env

VITE_API_URL=http://localhost:3000/api
```

> 💡 **Note:** For production, this should point to your deployed API URL.

<br>

### 4️⃣ - 🚀 Start development server:

> Start the development server with hot reload

```bash
npm run dev
```

> The application will be available at `http://localhost:5173`

<br>

### 5️⃣ - 🧪 Run linting:

> Check code quality and formatting

```bash
npm run lint
```

<br>

### 6️⃣ - 🏗️ Build for production:

> Create an optimized production build

```bash
npm run build
```

> Preview the production build locally

```bash
npm run preview
```

## <br><br>

# Tech Stack:

<br>

| 🛠️ Tech Used        | 🔍 Purpose                              | 🧑🏻‍💻 Required Locally?    |
| ------------------- | --------------------------------------- | ----------------------- |
| **React 19**        | Frontend framework                      | ✅ Yes                  |
| **Vite**            | Build tool and dev server               | ✅ Yes                  |
| **React Router**    | Client-side routing                     | ✅ Yes                  |
| **Axios**           | HTTP client for API requests            | ✅ Yes                  |
| **React Toastify**  | Toast notifications                     | ✅ Yes                  |
| **React Easy Crop** | Image cropping for avatars              | ✅ Yes                  |
| **Lucide React**    | Icon library                            | ✅ Yes                  |
| **Day.js**          | Date formatting and manipulation        | ✅ Yes                  |
| **ESLint**          | Code linting and formatting             | 🔶 Only for development |
| **Normalize.css**   | CSS reset and cross-browser consistency | ✅ Yes                  |

## <br><br>

# Project Structure:

```
daily-spews-frontend/
├── public/                 # Static assets
│   ├── assets/            # Images, logos, icons, mascots
│   │   ├── icons/         # React and Vite icons
│   │   ├── logo/          # Daily Spews logos
│   │   ├── mascot/        # Animated mascot images
│   │   └── users/         # Default user avatars
│   └── vite.svg           # Vite logo
├── src/
│   ├── api/               # API client and endpoints
│   │   └── api.js         # Centralized API functions
│   ├── components/        # Reusable UI components
│   │   ├── ArticleCard/   # Article preview cards
│   │   ├── AvatarCropModal/ # Image cropping modal
│   │   ├── CommentButton/ # Comment count display
│   │   ├── CommentCard/   # Individual comment display
│   │   ├── CommentList/   # Comments list with infinite scroll
│   │   ├── DevConsole/    # Development tools
│   │   ├── DevLoginForm/  # Development login shortcuts
│   │   ├── ErrorBoundary/ # Error handling component
│   │   ├── ErrorMessageCard/ # Error display cards
│   │   ├── HorizontalTopics/ # Horizontal topic navigation
│   │   ├── LoadingScreen/ # Loading states with mascot
│   │   ├── LogoutButton/  # Logout functionality
│   │   ├── MobileHeader/  # Mobile-specific header
│   │   ├── NavigationBar/ # Main navigation
│   │   ├── Pagination/    # Pagination controls
│   │   ├── PostCommentForm/ # Comment posting form
│   │   ├── PostNewArticleButton/ # New article button
│   │   ├── SortAndTopicBar/ # Sorting and filtering
│   │   ├── ToastTester/   # Toast notification testing
│   │   ├── TopicCard/     # Topic display cards
│   │   ├── TopicFilterBar/ # Topic filtering
│   │   └── VoteButton/    # Voting functionality
│   ├── context/           # React context providers
│   │   ├── UserContext.js # User context definition
│   │   ├── UserProvider.jsx # User authentication provider
│   │   └── useUser.js     # User context hook
│   ├── hooks/             # Custom React hooks
│   │   ├── useError.js    # Error handling hook
│   │   ├── useFetch.js    # Data fetching hook
│   │   └── useLoading.js  # Loading state hook
│   ├── pages/             # Page components
│   │   ├── AboutPage/     # About page
│   │   ├── AllArticlesPage/ # Articles listing page
│   │   ├── ErrorPageNotFound/ # 404 error page
│   │   ├── LoginPage/     # User login page
│   │   ├── PostArticlePage/ # Article creation page
│   │   ├── SignupPage/    # User registration page
│   │   ├── SingleArticlePage/ # Individual article page
│   │   ├── TopicArticlesPage/ # Topic-specific articles
│   │   ├── TopicsPage/    # Topics listing page
│   │   ├── UserProfilePage/ # User profile page
│   │   └── TestPage.jsx   # Testing page
│   ├── styles/            # Global styles and CSS
│   │   ├── App.css        # Main app styles
│   │   ├── global.css     # Global CSS variables and reset
│   │   ├── base/          # Base styles (containers, fonts, forms)
│   │   ├── components/    # Component-specific styles
│   │   └── utils/         # Utility styles (animations)
│   ├── utils/             # Utility functions
│   │   ├── capitaliseFirstLetter.js # Text formatting
│   │   ├── formatDate.js  # Date formatting
│   │   ├── getCroppedImg.js # Image cropping utility
│   │   └── pluralToSingular.js # Text transformation
│   ├── Footer.jsx         # Site footer
│   ├── Header.jsx         # Site header
│   ├── HomePage.jsx       # Homepage component
│   ├── Layout.jsx         # Main layout wrapper
│   ├── Router.jsx         # Application routing
│   └── main.jsx           # Application entry point
├── package.json           # Dependencies and scripts
├── vite.config.js         # Vite configuration
└── eslint.config.js       # ESLint configuration
```

## <br><br>

# Available Scripts:

| Script            | Description                              |
| ----------------- | ---------------------------------------- |
| `npm run dev`     | Start development server with hot reload |
| `npm run build`   | Create optimized production build        |
| `npm run lint`    | Run ESLint to check code quality         |
| `npm run preview` | Preview production build locally         |

## <br><br>

# Key Components:

### **Pages**

- `HomePage` - Landing page with horizontal topic navigation and embedded articles
- `AllArticlesPage` - Browse all articles with sorting, filtering, and pagination
- `SingleArticlePage` - Individual article view with infinite scroll comments
- `TopicsPage` - Browse all available topics in a grid layout
- `TopicArticlesPage` - Topic-specific articles with infinite scroll
- `UserProfilePage` - User profile and avatar management
- `LoginPage` / `SignupPage` - Authentication forms with avatar upload
- `PostArticlePage` - Article creation with image upload and cropping
- `AboutPage` - Project information and developer details

### **Core Components**

- `ArticleCard` - Article preview cards with metadata and interaction links
- `CommentCard` - Individual comment display with voting
- `CommentList` - Comments list with infinite scroll and loading states
- `VoteButton` - Upvote/downvote functionality with optimistic updates
- `PostCommentForm` - Comment posting with auto-expanding textarea
- `HorizontalTopics` - Horizontal scrollable topic navigation
- `NavigationBar` - Main navigation with user avatar dropdown
- `MobileHeader` - Mobile-specific header with animated greeting
- `AvatarCropModal` - Image cropping modal for avatars and articles
- `LoadingScreen` - Context-aware loading states with animated mascot
- `ErrorBoundary` - Error handling and recovery
- `ErrorMessageCard` - Error display with user-friendly messages

### **Context & Hooks**

- `UserContext` - Global user state management
- `UserProvider` - User authentication with localStorage persistence
- `useFetch` - Custom hook for data fetching with loading/error states
- `useLoading` - Loading state management
- `useError` - Error state management

### **Utilities**

- `formatDate` - Date formatting utility
- `getCroppedImg` - Image cropping utility
- `capitaliseFirstLetter` - Text formatting utility
- `pluralToSingular` - Text transformation utility

## <br><br>

# API Integration:

The frontend connects to the Daily Spews API backend for all data operations:

### **Articles**

- `getArticles()` - Fetch articles with sorting and filtering
- `getArticleById()` - Fetch single article by ID
- `getArticlesByTopic()` - Fetch articles filtered by topic
- `postNewArticle()` - Create new article with image upload
- `patchArticleVotes()` - Vote on articles

### **Comments**

- `getCommentByArticleId()` - Fetch comments with pagination
- `postComment()` - Post new comment
- `patchCommentVotes()` - Vote on comments
- `deleteCommentById()` - Delete comment

### **Topics**

- `getTopics()` - Fetch all available topics

### **Users**

- `getUsers()` - Fetch all users
- `getUserByUsername()` - Fetch user by username
- `getCurrentUser()` - Fetch authenticated user
- `loginUser()` - User authentication
- `logoutUser()` - User logout
- `registerUser()` - User registration with avatar
- `uploadUserAvatar()` - Upload and update user avatar

### **Authentication**

- JWT cookie-based authentication
- Automatic session validation
- localStorage persistence for quick UI responsiveness
- Two-phase loading strategy for optimal mobile performance

All API calls are handled through the centralized `api.js` file using Axios with proper error handling, authentication, and optimistic UI updates.

## <br><br>

# Development Features:

### **Development Tools**

- `DevLoginForm` - Admin-only development login shortcuts
- `ToastTester` - Toast notification testing component
- `TestPage` - Testing page for development features

### **Error Handling**

- Comprehensive error boundaries
- User-friendly error messages
- Graceful fallbacks for failed API calls
- Loading states for better UX

### **Performance Optimizations**

- Optimistic UI updates for voting and commenting
- Infinite scroll for comments and topic articles
- Image lazy loading and optimization
- Mobile-specific optimizations
- Efficient re-rendering with React hooks

### **Accessibility**

- Semantic HTML structure
- Screen reader support
- Keyboard navigation
- Focus management
- ARIA labels and descriptions

## <br><br>

# Future Considerations:

- [ ] Add dark mode support
- [ ] Implement real-time notifications
- [ ] Add article search functionality
- [ ] Enhance mobile navigation
- [ ] Add article bookmarking
- [ ] Implement user following system
- [ ] Add article sharing features
- [ ] Enhance accessibility features
- [ ] Add offline support with service workers
- [ ] Implement progressive web app features

> This portfolio project was created as part of a Digital Skills Bootcamp in Software Engineering provided by [Northcoders](https://northcoders.com/)
