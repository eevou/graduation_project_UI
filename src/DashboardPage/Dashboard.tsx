import React, { useState } from "react";
import { Star, Edit, Trash2, Plus, ArrowLeft, Menu } from "lucide-react";
import "./Dashboard.css";
import Header from "../HomePage/Header/Header";

interface Article {
  title: string;
  date: string;
  source: string;
  summary: string;
  imageUrl: string;
  isFeatured: boolean;
  header: string;
  abbreviation: string;
  content: string;
  languageId: string;
  newsId: string;
  additionalImages: string[];
}

const NewsManagementDashboard: React.FC = () => {
  const [currentView, setCurrentView] = useState<"list" | "create" | "edit">(
    "list"
  );
  const [editingArticle, setEditingArticle] = useState<Article | null>(null);

  // Mock data
  const [articles, setArticles] = useState<Article[]>([
    {
      title: "Breaking: Major Tech Breakthrough Announced",
      date: "2025-01-08",
      source: "Tech News Daily",
      summary:
        "A revolutionary advancement in artificial intelligence has been unveiled by leading researchers, promising to transform multiple industries.",
      imageUrl:
        "https://images.pexels.com/photos/546819/pexels-photo-546819.jpeg?auto=compress&cs=tinysrgb&w=400",
      isFeatured: true,
      header: "Technology",
      abbreviation: "TECH-001",
      content: "Full article content here...",
      languageId: "en",
      newsId: "NEWS-001",
      additionalImages: [],
    },
    {
      title: "Global Climate Summit Reaches Historic Agreement",
      date: "2025-01-07",
      source: "Environmental Times",
      summary:
        "World leaders have reached a landmark agreement on climate action, setting ambitious targets for carbon reduction over the next decade.",
      imageUrl:
        "https://images.pexels.com/photos/1108701/pexels-photo-1108701.jpeg?auto=compress&cs=tinysrgb&w=400",
      isFeatured: false,
      header: "Environment",
      abbreviation: "ENV-001",
      content: "Full article content here...",
      languageId: "en",
      newsId: "NEWS-002",
      additionalImages: [],
    },
    {
      title: "Economic Markets Show Strong Recovery Signs",
      date: "2025-01-06",
      source: "Financial Herald",
      summary:
        "Stock markets worldwide are showing positive trends as economic indicators suggest a robust recovery is underway.",
      imageUrl:
        "https://images.pexels.com/photos/159888/pexels-photo-159888.jpeg?auto=compress&cs=tinysrgb&w=400",
      isFeatured: true,
      header: "Finance",
      abbreviation: "FIN-001",
      content: "Full article content here...",
      languageId: "en",
      newsId: "NEWS-003",
      additionalImages: [],
    },
    {
      title: "Economic Markets Show Strong Recovery Signs",
      date: "2025-01-06",
      source: "Financial Herald",
      summary:
        "Stock markets worldwide are showing positive trends as economic indicators suggest a robust recovery is underway.",
      imageUrl:
        "https://images.pexels.com/photos/159888/pexels-photo-159888.jpeg?auto=compress&cs=tinysrgb&w=400",
      isFeatured: true,
      header: "Finance",
      abbreviation: "FIN-001",
      content: "Full article content here...",
      languageId: "en",
      newsId: "NEWS-004",
      additionalImages: [],
    },
    {
      title: "Economic Markets Show Strong Recovery Signs",
      date: "2025-01-06",
      source: "Financial Herald",
      summary:
        "Stock markets worldwide are showing positive trends as economic indicators suggest a robust recovery is underway.",
      imageUrl:
        "https://images.pexels.com/photos/159888/pexels-photo-159888.jpeg?auto=compress&cs=tinysrgb&w=400",
      isFeatured: true,
      header: "Finance",
      abbreviation: "FIN-001",
      content: "Full article content here...",
      languageId: "en",
      newsId: "NEWS-005",
      additionalImages: [],
    },
    {
      title: "Economic Markets Show Strong Recovery Signs",
      date: "2025-01-06",
      source: "Financial Herald",
      summary:
        "Stock markets worldwide are showing positive trends as economic indicators suggest a robust recovery is underway.",
      imageUrl:
        "https://images.pexels.com/photos/159888/pexels-photo-159888.jpeg?auto=compress&cs=tinysrgb&w=400",
      isFeatured: true,
      header: "Finance",
      abbreviation: "FIN-001",
      content: "Full article content here...",
      languageId: "en",
      newsId: "NEWS-006",
      additionalImages: [],
    },
    {
      title: "Economic Markets Show Strong Recovery Signs",
      date: "2025-01-06",
      source: "Financial Herald",
      summary:
        "Stock markets worldwide are showing positive trends as economic indicators suggest a robust recovery is underway.",
      imageUrl:
        "https://images.pexels.com/photos/159888/pexels-photo-159888.jpeg?auto=compress&cs=tinysrgb&w=400",
      isFeatured: true,
      header: "Finance",
      abbreviation: "FIN-001",
      content: "Full article content here...",
      languageId: "en",
      newsId: "NEWS-007",
      additionalImages: [],
    },
    {
      title: "Economic Markets Show Strong Recovery Signs",
      date: "2025-01-06",
      source: "Financial Herald",
      summary:
        "Stock markets worldwide are showing positive trends as economic indicators suggest a robust recovery is underway.",
      imageUrl:
        "https://images.pexels.com/photos/159888/pexels-photo-159888.jpeg?auto=compress&cs=tinysrgb&w=400",
      isFeatured: true,
      header: "Finance",
      abbreviation: "FIN-001",
      content: "Full article content here...",
      languageId: "en",
      newsId: "NEWS-008",
      additionalImages: [],
    },
    {
      title: "Economic Markets Show Strong Recovery Signs",
      date: "2025-01-06",
      source: "Financial Herald",
      summary:
        "Stock markets worldwide are showing positive trends as economic indicators suggest a robust recovery is underway.",
      imageUrl:
        "https://images.pexels.com/photos/159888/pexels-photo-159888.jpeg?auto=compress&cs=tinysrgb&w=400",
      isFeatured: true,
      header: "Finance",
      abbreviation: "FIN-001",
      content: "Full article content here...",
      languageId: "en",
      newsId: "NEWS-009",
      additionalImages: [],
    },
  ]);

  // Form state
  const [formData, setFormData] = useState({
    title: "",
    date: "",
    source: "",
    summary: "",
    imageUrl: "",
    isFeatured: false,
    header: "",
    abbreviation: "",
    content: "",
    languageId: "",
    newsId: "",
    additionalImages: [""],
  });

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type } = e.target;
    if (type === "checkbox") {
      setFormData((prev) => ({
        ...prev,
        [name]: (e.target as HTMLInputElement).checked,
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleAdditionalImageChange = (index: number, value: string) => {
    const newImages = [...formData.additionalImages];
    newImages[index] = value;
    setFormData((prev) => ({ ...prev, additionalImages: newImages }));
  };

  const addAdditionalImageField = () => {
    setFormData((prev) => ({
      ...prev,
      additionalImages: [...prev.additionalImages, ""],
    }));
  };

  const removeAdditionalImageField = (index: number) => {
    if (formData.additionalImages.length > 1) {
      const newImages = formData.additionalImages.filter((_, i) => i !== index);
      setFormData((prev) => ({ ...prev, additionalImages: newImages }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentView === "create") {
      const newArticle: Article = {
        ...formData,
        newsId: Date.now().toString(),
        additionalImages: formData.additionalImages.filter(
          (img) => img.trim() !== ""
        ),
      };
      setArticles((prev) => [...prev, newArticle]);
    } else if (currentView === "edit" && editingArticle) {
      setArticles((prev) =>
        prev.map((article) =>
          article.newsId === editingArticle.newsId
            ? {
                ...formData,
                newsId: editingArticle.newsId,
                additionalImages: formData.additionalImages.filter(
                  (img) => img.trim() !== ""
                ),
              }
            : article
        )
      );
    }
    resetForm();
    setCurrentView("list");
  };

  const resetForm = () => {
    setFormData({
      title: "",
      date: "",
      source: "",
      summary: "",
      imageUrl: "",
      isFeatured: false,
      header: "",
      abbreviation: "",
      content: "",
      languageId: "",
      newsId: "",
      additionalImages: [""],
    });
    setEditingArticle(null);
  };

  const handleEdit = (article: Article) => {
    setFormData({
      ...article,
      additionalImages:
        article.additionalImages.length > 0 ? article.additionalImages : [""],
    });
    setEditingArticle(article);
    setCurrentView("edit");
  };

  const handleDelete = (id: string) => {
    if (window.confirm("Are you sure you want to delete this article?")) {
      setArticles((prev) => prev.filter((article) => article.newsId !== id));
    }
  };

  const handleCancel = () => {
    resetForm();
    setCurrentView("list");
  };

  return (
    <div className="dashboard-page">
      <Header />

      <div className="dashboard-content">
        <h1 className="dashboard-header-title">News Management Dashboard</h1>
        
        <header className="dashboard-header">
          <button
            className={
              currentView === "create" ? "create-btn active" : "create-btn"
            }
            onClick={() => {setCurrentView("create"), resetForm()}}
          >
            <Plus size={16} />
            Create New Article
          </button>
          <button
            className={
              currentView === "list" ? "view-list-btn active" : "view-list-btn"
            }
            onClick={() => setCurrentView("list")}
          >
            <Menu size={16}></Menu>
            View News
          </button>
        </header>

        {currentView === "list" && (
          <div className="articles-grid">
            {articles.map((article) => (
              <div key={article.newsId} className="article-card">
                <div className="article-image">
                  <img src={article.imageUrl} alt={article.title} />
                  {article.isFeatured && (
                    <p className="featured-badge">Featured</p>
                  )}
                </div>
                <div className="article-content">
                  <div className="article-meta">
                    <span className="article-date">
                      {new Date(article.date).toLocaleDateString()}
                    </span>
                  </div>
                  <h3 className="article-title">{article.title}</h3>
                  <p className="article-source">Source: {article.source}</p>
                  <p className="article-summary">{article.summary.slice(0, 50)}...</p>
                  <div className="article-actions">
                    <button
                      className="edit-btn"
                      onClick={() => handleEdit(article)}
                    >
                      <Edit size={16} />
                      Edit
                    </button>
                    <button
                      className="delete-btn"
                      onClick={() => handleDelete(article.newsId)}
                    >
                      <Trash2 size={16} />
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {(currentView === "create" || currentView === "edit") && (
          <div className="form-container">
            <div className="form-card">
              <h2>
                {currentView === "create"
                  ? "Create New Article"
                  : "Edit Article"}
              </h2>
              <form onSubmit={handleSubmit} className="article-form">
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="title">Title *</label>
                    <input
                      type="text"
                      id="title"
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="date">Date *</label>
                    <input
                      type="date"
                      id="date"
                      name="date"
                      value={formData.date}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="source">Source *</label>
                    <input
                      type="text"
                      id="source"
                      name="source"
                      value={formData.source}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="header">Header</label>
                    <input
                      type="text"
                      id="header"
                      name="header"
                      value={formData.header}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="abbreviation">Abbreviation</label>
                    <input
                      type="text"
                      id="abbreviation"
                      name="abbreviation"
                      value={formData.abbreviation}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="languageId">Language ID</label>
                    <select
                      id="languageId"
                      name="languageId"
                      value={formData.languageId}
                      onChange={handleInputChange}
                    >
                      <option value="">Select Language</option>
                      <option value="en">English</option>
                      <option value="es">Spanish</option>
                      <option value="fr">French</option>
                      <option value="de">German</option>
                    </select>
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="newsId">News ID</label>
                    <input
                      type="text"
                      id="newsId"
                      name="newsId"
                      value={formData.newsId}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="form-group">
                    <label className="checkbox-label">
                      <input
                        type="checkbox"
                        name="isFeatured"
                        checked={formData.isFeatured}
                        onChange={handleInputChange}
                      />
                      <span className="checkmark"></span>
                      Featured Article
                    </label>
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="imageUrl">Main Image URL *</label>
                  <input
                    type="url"
                    id="imageUrl"
                    name="imageUrl"
                    value={formData.imageUrl}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Additional Images</label>
                  {formData.additionalImages.map((image, index) => (
                    <div key={index} className="additional-image-row">
                      <input
                        type="url"
                        value={image}
                        onChange={(e) =>
                          handleAdditionalImageChange(index, e.target.value)
                        }
                        placeholder="Additional image URL"
                      />
                      {formData.additionalImages.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeAdditionalImageField(index)}
                          className="remove-addition-img-btn"
                        >
                          Remove
                        </button>
                      )}
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={addAdditionalImageField}
                    className="add-addition-img-btn"
                  >
                    Add Image
                  </button>
                </div>

                <div className="form-group">
                  <label htmlFor="summary">Summary *</label>
                  <textarea
                    id="summary"
                    name="summary"
                    value={formData.summary}
                    onChange={handleInputChange}
                    rows={3}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="content">Content *</label>
                  <textarea
                    id="content"
                    name="content"
                    value={formData.content}
                    onChange={handleInputChange}
                    rows={6}
                    required
                  />
                </div>

                <div className="form-actions">
                  <button type="submit" className="edit-btn">
                    {currentView === "create"
                      ? "Create Article"
                      : "Update Article"}
                  </button>
                  <button
                    type="button"
                    onClick={handleCancel}
                    className="cansel-btn"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NewsManagementDashboard;
