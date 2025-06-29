import "./PostArticlePage.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UploadIcon } from "lucide-react";

import { useUser } from "../../context";
import { postNewArticle, getTopics } from "../../api/api";
import { capitaliseFirstLetter } from "../../utils/capitaliseFirstLetter";
import AvatarCropModal from "../../components/AvatarCropModal/AvatarCropModal.jsx";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/gif", "image/webp"];

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
  const [isSubmitting, setIsSubmitting] = useState(false); // 🆕 Track submission state

  // Crop modal states
  const [cropModalOpen, setCropModalOpen] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  // 🆕 Form validation - check if all required fields are filled
  const isFormValid =
    form.title.trim().length > 0 && // Title is required and not just whitespace
    form.body.trim().length > 0 && // Body is required and not just whitespace
    form.topic.length > 0 && // Topic is selected
    !isSubmitting; // Not currently submitting

  // File validation
  const validateFile = (file) => {
    if (!file) return "No file selected";
    if (!ALLOWED_TYPES.includes(file.type)) {
      return "Please select a valid image file (JPEG, PNG, GIF, or WebP)";
    }
    if (file.size > MAX_FILE_SIZE) {
      return "File size must be less than 5MB";
    }
    return null;
  };

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
    // Cleanup object URLs
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
      if (imagePreview) URL.revokeObjectURL(imagePreview);
    };
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    // 🆕 Clear any previous error messages when user starts typing
    if (message) setMessage("");
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const validationError = validateFile(file);
      if (validationError) {
        setMessage(validationError);
        return;
      }

      setMessage("");
      setImagePreview(URL.createObjectURL(file));
      setSelectedFile(file);
      setCropModalOpen(true);
    }
  };

  const handleCropComplete = (croppedBlob) => {
    try {
      const croppedFile = new File(
        [croppedBlob],
        selectedFile?.name || "article-image.jpg",
        { type: "image/jpeg" }
      );

      setForm((prev) => ({ ...prev, article_img_url: croppedFile }));

      // Clean up old preview URL
      if (previewUrl) URL.revokeObjectURL(previewUrl);

      // Create new preview URL
      setPreviewUrl(URL.createObjectURL(croppedFile));
      setMessage("");
    } catch (err) {
      console.error("Crop processing failed", err);
      setMessage("Failed to process cropped image. Please try again.");
    } finally {
      setCropModalOpen(false);
      if (imagePreview) URL.revokeObjectURL(imagePreview);
      setImagePreview(null);
      setSelectedFile(null);
    }
  };

  const handleCropCancel = () => {
    setCropModalOpen(false);
    if (imagePreview) URL.revokeObjectURL(imagePreview);
    setImagePreview(null);
    setSelectedFile(null);
    setMessage("");

    // Reset file input
    const fileInput = document.getElementById("article_img_url");
    if (fileInput) fileInput.value = "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 🆕 Double-check validation before submitting
    if (!isFormValid) {
      setMessage("Please fill in all required fields");
      return;
    }

    setIsSubmitting(true); // 🆕 Disable button during submission
    setMessage(""); // Clear any previous messages

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
      setIsSubmitting(false); // 🆕 Re-enable button on error
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
          placeholder="*Article Title"
          required
          maxLength={200}
          disabled={isSubmitting} // 🆕 Disable during submission
        />

        <select
          className="post-article-select-topic"
          name="topic"
          value={form.topic}
          onChange={handleInputChange}
          required
          disabled={isSubmitting}
        >
          <option value="">*Select Topic</option>
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
          placeholder="*Write your article here..."
          rows={12}
          required
          disabled={isSubmitting} // 🆕 Disable during submission
        />

        <label
          htmlFor="article_img_url"
          className={`post-article-file-upload-label ${
            isSubmitting ? "disabled" : ""
          }`} // 🆕 Add disabled class
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
          disabled={isSubmitting} // 🆕 Disable during submission
        />

        {previewUrl && (
          <div className="image-preview">
            <p>Image Preview:</p>
            <img
              src={previewUrl}
              alt="Article preview"
              className="post-article-image-preview"
            />
            <button
              type="button"
              onClick={() => {
                // Allow re-cropping
                if (form.article_img_url) {
                  setImagePreview(URL.createObjectURL(form.article_img_url));
                  setSelectedFile(form.article_img_url);
                  setCropModalOpen(true);
                }
              }}
              className="recrop-button"
              disabled={isSubmitting} // 🆕 Disable during submission
            >
              Re-crop Image
            </button>
          </div>
        )}

        {/* Crop Modal */}
        {cropModalOpen && imagePreview && (
          <AvatarCropModal
            imageSrc={imagePreview}
            onCancel={handleCropCancel}
            onCropComplete={handleCropComplete}
            aspectRatio={16 / 9}
            cropShape="rect"
            title="Crop Article Image"
          />
        )}

        {/* 🆕 Submit button with validation and loading state */}
        <button
          type="submit"
          disabled={!isFormValid || isSubmitting}
          className={`submit-button ${!isFormValid ? "disabled" : ""} ${
            isSubmitting ? "submitting" : ""
          }`}
        >
          {isSubmitting ? "Posting..." : "Submit"}
        </button>
      </form>

      {message && (
        <p
          className={`form-message ${
            message.includes("Failed") ? "error" : ""
          }`}
        >
          {message}
        </p>
      )}
    </div>
  );
}
