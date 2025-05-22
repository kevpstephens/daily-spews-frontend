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
  try {
    const res = await api.get(`/articles/${article_id}/comments`);
    return res.data;
  } catch (err) {
    if (err.response && err.response.status === 404) {
      return { comments: [] };
    }
    throw err;
  }
};

export const patchArticleVotes = async (article_id, inc_votes) => {
  const res = await api.patch(`/articles/${article_id}`, { inc_votes });
  return res.data;
};

export const postComment = async (article_id, commentObj) => {
  const res = await api.post(`/articles/${article_id}/comments`, commentObj);
  return res.data;
};

export const deleteCommentById = async (comment_id) => {
  const res = await api.delete(`/comments/${comment_id}`);
  return res.data
};
