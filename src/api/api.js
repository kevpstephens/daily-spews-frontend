import axios from "axios";

const api = axios.create({
  baseURL: "https://nc-news-api-gtk7.onrender.com/api",
});

export const getArticles = async () => {
  const res = await api.get("/articles");
  return res.data;
};

export const getTopics = async () => {
  const res = await api.get("/topics");
  return res.data;
};

export const getArticleById = async (article_id) => {
  const res = await api.get(`/articles/${article_id}`);
  return res.data;
};

export const getCommentByArticleId = async (article_id) => {
  const res = await api.get(`/articles/${article_id}/comments`);
  return res.data;
};
