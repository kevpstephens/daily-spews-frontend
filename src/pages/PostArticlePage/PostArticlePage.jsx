import "./PostArticlePage.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UploadIcon } from "lucide-react";

import { useUser } from "../../context";
import { postNewArticle, getTopics } from "../../api/api";
import { capitaliseFirstLetter } from "../../utils/capitaliseFirstLetter";

export default function PostArticlePage() {
  const { user } = useUser();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    body: "",
    topic: "",
    article_img_url: null,
  });
  const [message, setMessage] = useState("");
  const [topics, setTopics] = useState([]);

  useEffect(() => {
    const fetchTopics = async () => {
      try {
        const data = await getTopics();
        setTopics(data.topics);
      } catch (err) {
        console.error("Failed to fetch topics", err);
        setMessage("Failed to load topics. Please refresh the page.");
      }
    };

    fetchTopics();
  }, []);

  useEffect(() => {
    // Cleanup object URL when component unmounts or image changes
    return () => {
      if (form.article_img_url && typeof form.article_img_url === "object") {
        URL.revokeObjectURL(form.article_img_url);
      }
    };
  }, [form.article_img_url]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Basic validation
      if (file.size > 5 * 1024 * 1024) {
        // 5MB limit
        setMessage("Image must be less than 5MB");
        return;
      }

      if (!file.type.startsWith("image/")) {
        setMessage("Please select a valid image file");
        return;
      }

      setForm((prev) => ({ ...prev, article_img_url: file }));
      setMessage(""); // Clear any previous error messages
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!form.title.trim()) {
      setMessage("Please enter a title");
      return;
    }

    if (!form.body.trim()) {
      setMessage("Please write some content");
      return;
    }

    if (!form.topic) {
      setMessage("Please select a topic");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("title", form.title.trim());
      formData.append("body", form.body.trim());
      formData.append("topic", form.topic);
      formData.append("author", user.username);

      if (form.article_img_url) {
        formData.append("article_img", form.article_img_url);
      }

      const res = await postNewArticle(formData);
      navigate(`/articles/${res.article_id}`);
    } catch (err) {
      console.error("Error posting article:", err);
      setMessage("Failed to post article. Please try again.");
    }
  };

  return (
    <div className="post-article-page-container">
      <h1>Post a New Article</h1>

      <form onSubmit={handleSubmit}>
        <input
          name="title"
          value={form.title}
          onChange={handleInputChange}
          placeholder="Article Title"
          required
          maxLength={200}
        />

        <select
          name="topic"
          value={form.topic}
          onChange={handleInputChange}
          required
        >
          <option value="">--Select Topic--</option>
          {topics.map((topic) => (
            <option key={topic.slug} value={topic.slug}>
              {capitaliseFirstLetter(topic.slug)}
            </option>
          ))}
        </select>

        <textarea
          name="body"
          value={form.body}
          onChange={handleInputChange}
          placeholder="Write your article here..."
          rows={12}
          required
        />

        <label
          htmlFor="article_img_url"
          className="post-article-file-upload-label"
        >
          <div className="post-article-file-upload-label-content">
            <span>Upload Article Image</span>
            <UploadIcon size={20} />
          </div>
        </label>

        <input
          id="article_img_url"
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          style={{ display: "none" }}
        />

        {form.article_img_url && (
          <div className="image-preview">
            <p>Image Preview:</p>
            <img
              src={URL.createObjectURL(form.article_img_url)}
              alt="Article preview"
              className="post-article-image-preview"
            />
          </div>
        )}

        <button type="submit">Submit Article</button>
      </form>

      {message && <p className="form-message">{message}</p>}
    </div>
  );
}
