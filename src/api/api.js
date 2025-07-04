/** ============================================================
 *! api.js

 * Central API client for Daily Spews application.
 * Handles all HTTP requests to the backend server with authentication
 * support via cookies. Uses Axios with a configured base instance.
 *============================================================ */

import axios from "axios";

// Create an Axios instance with the base URL set to the environment variable
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

//! GET /api/articles
// Fetches all articles with optional sorting and topic filtering
export const getArticles = async (
  sort_by = "created_at",
  order = "desc",
  topic,
  limit,
  p
) => {
  const params = { sort_by, order };
  if (topic) params.topic = topic;
  if (limit) params.limit = limit;
  if (p) params.p = p;

  const res = await api.get("/articles", { params });
  return res.data; // should include { articles, total_count }
};

//! GET /api/topics
// Fetches all available topics from the backend
export const getTopics = async () => {
  const res = await api.get("/topics");
  return res.data;
};

//! GET /api/articles/:article_id
// Fetch a single article by its unique ID
export const getArticleById = async (article_id) => {
  const res = await api.get(`/articles/${article_id}`);
  return res.data;
};

//! GET /api/articles/:article_id/comments
// Fetch all comments related to a specific article
export const getCommentByArticleId = async (article_id, limit, p) => {
  try {
    const params = {};
    if (limit) params.limit = limit;
    if (p) params.p = p;

    const res = await api.get(`/articles/${article_id}/comments`, { params });
    return res.data;
  } catch (err) {
    // Return empty array if article has no comments (404)
    if (err.response && err.response.status === 404) {
      return { comments: [], total_count: 0 };
    }
    throw err;
  }
};

//! GET /api/articles?topic=:topic_slug
// Shortcut function to fetch articles filtered by a specific topic
export const getArticlesByTopic = async (topic_slug, limit, p) => {
  const params = { topic: topic_slug };
  if (limit) params.limit = limit;
  if (p) params.p = p;

  const res = await api.get("/articles", { params });
  return res.data; // includes articles + total_count
};

//! GET /api/users
// Fetch all users from the backend (e.g., for login or user listing)
export const getUsers = async () => {
  const res = await api.get(`/users`);
  return res.data;
};

//! GET /api/users/:username
// Fetch a single user by their unique username
export const getUserByUsername = async (username) => {
  const res = await api.get(`/users/${username}`);
  return res.data;
};

//! PATCH /api/articles/:article_id
// Increment or decrement the vote count of an article
export const patchArticleVotes = async (article_id, inc_votes) => {
  const res = await api.patch(`/articles/${article_id}`, { inc_votes });
  return res.data;
};

//! PATCH /api/comments/:comment_id
// Increment or decrement the vote count of a comment
export const patchCommentVotes = async (comment_id, inc_votes) => {
  const res = await api.patch(`/comments/${comment_id}`, { inc_votes });
  return res.data;
};

//! POST /api/articles/:article_id/comments
// Post a new comment under a specific article
// Expects commentObj to contain { username, body }
export const postComment = async (article_id, commentObj) => {
  const res = await api.post(`/articles/${article_id}/comments`, commentObj);
  return res.data;
};

//! POST /api/auth/login
// Authenticates user and sets a secure cookie (e.g., JWT)
export const loginUser = async ({ email, password }) => {
  const res = await api.post(
    "/auth/login",
    { email, password },
    { withCredentials: true }
  );
  return res.data;
};

//! POST /api/auth/logout
// Logs out the user by clearing their auth cookie on the server
export const logoutUser = async () => {
  const res = await api.post("/auth/logout", {}, { withCredentials: true });
  return res.data;
};

//! POST /api/auth/register
// Registers a new user - handles both JSON and FormData
export const registerUser = async (payload, config = {}) => {
  // Ensure withCredentials is always included
  const mergedConfig = {
    withCredentials: true,
    ...config,
  };

  const res = await api.post("/auth/register", payload, mergedConfig);
  return res.data;
};

//! DELETE /api/comments/:comment_id
// Delete a comment by its unique ID
export const deleteCommentById = async (comment_id) => {
  const res = await api.delete(`/comments/${comment_id}`);
  return res.data;
};

//! GET /api/users/me
// Fetch the currently authenticated user's info
export const getCurrentUser = async () => {
  const res = await api.get("/users/me", { withCredentials: true });
  return res.data;
};

//! POST /api/users/:username/avatar
// Upload a new avatar image for a user
export const uploadUserAvatar = async (username, file) => {
  const formData = new FormData();
  formData.append("avatar", file);

  const res = await api.post(`/users/${username}/avatar`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return res.data; // { avatar_url: "..." }
};

//! POST /api/articles
// Create a new article with the provided article data
export const postNewArticle = async (articleData) => {
  const res = await api.post("/articles", articleData);
  return res.data.newArticle;
};
