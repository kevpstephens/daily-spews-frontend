/** ============================================================
 *! PostArticlePage.jsx
 *? URL: daily-spews.onrender.com/articles/new

 * Article creation form with image upload and cropping functionality.
 * Features form validation, file validation, and submission state management.
 * Includes image cropping modal for article thumbnails with 16:9 aspect ratio.
 *============================================================ */

import "./PostArticlePage.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useFetch from "../../hooks/useFetch.js";
import { useUser } from "../../context";
import { postNewArticle, getTopics } from "../../api/api";
import { capitaliseFirstLetter } from "../../utils/capitaliseFirstLetter";
import AvatarCropModal from "../../components/AvatarCropModal/AvatarCropModal.jsx";
import { UploadIcon } from "lucide-react";

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
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fetch available topics using useFetch hook
  const { data: topicsData, error: topicsError } = useFetch(getTopics, []);

  // Image cropping modal states
  const [cropModalOpen, setCropModalOpen] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  // Form validation - check if all required fields are filled
  const isFormValid =
    form.title.trim().length > 0 &&
    form.body.trim().length > 0 &&
    form.topic.length > 0 &&
    !isSubmitting;

  // File validation helper
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

  // Handle topics errors from useFetch
  useEffect(() => {
    if (topicsError) {
      console.error("Failed to fetch topics", topicsError);
      setMessage("Failed to load topics. Please refresh the page.");
    }
  }, [topicsError]);

  // Cleanup object URLs to prevent memory leaks
  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
      if (imagePreview) URL.revokeObjectURL(imagePreview);
    };
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    // Clear error messages when user starts typing
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

    if (!isFormValid) {
      setMessage("Please fill in all required fields");
      return;
    }

    setIsSubmitting(true);
    setMessage("");

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
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {/* Topics error message */}
      {topicsError && (
        <p className="form-message error">{topicsError.message}</p>
      )}

      {/* Post article form */}
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
            disabled={isSubmitting}
          />

          {/* Topic select */}
          <select
            className="post-article-select-topic"
            name="topic"
            value={form.topic}
            onChange={handleInputChange}
            required
            disabled={isSubmitting}
          >
            <option value="">*Select Topic</option>
            {topicsData?.topics
              ?.sort((a, b) => a.slug.localeCompare(b.slug))
              ?.map((topic) => (
                <option key={topic.slug} value={topic.slug}>
                  {capitaliseFirstLetter(topic.slug)}
                </option>
              ))}
          </select>

          {/* Article body */}
          <textarea
            name="body"
            value={form.body}
            onChange={handleInputChange}
            placeholder="*Write your article here..."
            rows={12}
            required
            disabled={isSubmitting}
          />

          {/* Article image upload */}
          <label
            htmlFor="article_img_url"
            className={`post-article-file-upload-label ${
              isSubmitting ? "disabled" : ""
            }`}
          >
            <div className="post-article-file-upload-label-content">
              <span>Upload Image</span>
              <UploadIcon
                className="post-article-file-upload-label-icon"
                size={20}
              />
            </div>
          </label>

          {/* Article image input */}
          <input
            id="article_img_url"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            style={{ display: "none" }}
            disabled={isSubmitting}
          />

          {/* Article image preview */}
          {previewUrl && (
            <div className="image-preview">
              <p>Image Preview:</p>
              <img
                src={previewUrl}
                alt="Article preview"
                className="post-article-image-preview"
              />

              {/* Re-crop image button */}
              <button
                type="button"
                onClick={() => {
                  // Allow re-cropping of current image
                  if (form.article_img_url) {
                    setImagePreview(URL.createObjectURL(form.article_img_url));
                    setSelectedFile(form.article_img_url);
                    setCropModalOpen(true);
                  }
                }}
                className="recrop-button"
                disabled={isSubmitting}
              >
                Re-crop Image
              </button>
            </div>
          )}

          {/* Image cropping modal */}
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
    </>
  );
}
