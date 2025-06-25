import React, { useEffect, useState } from "react";
import { Star, Edit, Trash2, Plus, ArrowLeft, Menu } from "lucide-react";
import "./Dashboard.css";
import { useNews } from "../Services/NewsContext";
import Header from "../HomePage/Header/Header";
import { useTranslation } from "react-i18next";
import "primereact/resources/themes/saga-blue/theme.css"; // or any other theme
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "quill/dist/quill.snow.css";
import { Editor } from "primereact/editor";
import truncate from "html-truncate";

interface Article {
  date: string;
  ownerId: string;
  image: string;
  newsId: string;
  isFeatured: boolean;
  gallaries: string[];
  translations: {
    header: string;
    abbreviation: string;
    body: string;
    id: number;
    source: string;
    languageId: number;
    newsId: string;
  }[];
}

const NewsManagementDashboard: React.FC = () => {
  const [currentView, setCurrentView] = useState<"list" | "create" | "edit">(
    "list"
  );
  const [editingArticle, setEditingArticle] = useState<Article | null>(null);

  const { getNews, langId } = useNews();
  const [articles, setArticles] = useState<Article[]>([]);

  const langString = localStorage.getItem("lang");
  const savedLang = langString ? JSON.parse(langString) : null;
  const { i18n, t } = useTranslation("Dashboard");

  
  useEffect(() => {
    const fetchNews = async () => {
      const newsData = await getNews(langId);
      setArticles(newsData.data);
    };

    fetchNews();
  }, [langId]);

  // Form state
  const [formData, setFormData] = useState({
    date: "",
    source: "",
    imageUrl: "",
    isFeatured: false,
    header: "",
    abbreviation: "",
    body: "",
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
        gallaries: formData.additionalImages.filter((img) => img.trim() !== ""),
      };
      setArticles((prev) => [...prev, newArticle]);
    } else if (currentView === "edit" && editingArticle) {
      setArticles((prev) =>
        prev.map((article) =>
          article.newsId === editingArticle.newsId
            ? {
                ...formData,
                newsId: editingArticle.newsId,
                gallaries: formData.additionalImages.filter(
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
      date: "",
      source: "",
      imageUrl: "",
      isFeatured: false,
      header: "",
      abbreviation: "",
      body: "",
      languageId: "",
      newsId: "",
      additionalImages: [""],
    });
    setEditingArticle(null);
  };

  const handleEdit = (article: Article) => {
    setFormData({
      ...article,
      additionalImages: article.gallaries.length > 0 ? article.gallaries : [""],
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

  const pArStyle = {
    fontFamily: "var(--MNF_Body_AR)",
    fontSize: "13px",
  };

  const pEnStyle = {
    fontFamily: "var(--MNF_Body_EN)",
  };

  const headArStyle = {
    fontFamily: "var(--MNF_Heading_AR)",
  };

  const headEnStyle = {
    fontFamily: "var(--MNF_Heading_EN)",
  };

  return (
    <div className="dashboard-page">
      <Header />

      <div
        className="dashboard-content"
        style={savedLang?.code === `ar` ? pArStyle : pEnStyle}
      >
        <h1
          className="dashboard-header-title"
          style={savedLang?.code === `ar` ? headArStyle : headEnStyle}
        >
          {t("dashboard.title")}
        </h1>

        <header className="dashboard-header">
          <button
            className={
              currentView === "create" ? "create-btn active" : "create-btn"
            }
            onClick={() => {
              setCurrentView("create");
              resetForm();
            }}
          >
            <Plus size={16} />
            {t("button.create")}
          </button>
          <button
            className={
              currentView === "list" ? "view-list-btn active" : "view-list-btn"
            }
            onClick={() => setCurrentView("list")}
          >
            <Menu size={16} />
            {t("button.view")}
          </button>
        </header>

        {currentView === "list" && (
          <div className="articles-grid">
            {articles.map((article) => (
              <div key={article.newsId} className="article-card">
                <div className="article-image">
                  <img src={article.image} alt={article?.translations[0]?.header} />
                  {article.isFeatured && (
                    <p className="featured-badge">{t("badge.featured")}</p>
                  )}
                </div>
                <div className="article-content">
                  <div className="article-meta">
                    <span className="article-date">
                      {new Date(article.date).toLocaleDateString()}
                    </span>
                  </div>
                  <h3 className="article-title">{article?.translations[0]?.header}</h3>
                  <p className="article-source">
                    {t("article.source")}: {article?.translations[0]?.body}
                  </p>
                  <div
                    className="article-summary"
                    // dangerouslySetInnerHTML={{
                    //   __html: truncate(article?.translations[0]?.body, 50),
                    // }}
                  />
                  <div className="article-actions">
                    <button
                      className="edit-btn"
                      onClick={() => handleEdit(article)}
                    >
                      <Edit size={16} />
                      {t("article.edit")}
                    </button>
                    <button
                      className="delete-btn"
                      onClick={() => handleDelete(article?.newsId)}
                    >
                      <Trash2 size={16} />
                      {t("article.delete")}
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
                {currentView === "create" ? t("form.create") : t("form.update")}
              </h2>
              <form onSubmit={handleSubmit} className="article-form">
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="date">{t("form.date")} *</label>
                    <input
                      type="date"
                      id="date"
                      name="date"
                      value={formData.date}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="source">{t("form.source")} *</label>
                    <input
                      type="text"
                      id="source"
                      name="source"
                      value={formData.source}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="imageUrl">{t("form.image")} *</label>
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
                  <label>{t("form.additionalImages")}</label>
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
                          {t("form.removeImage")}
                        </button>
                      )}
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={addAdditionalImageField}
                    className="add-addition-img-btn"
                  >
                    {t("form.addImage")}
                  </button>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="header">{t("form.header")}</label>
                    <input
                      type="text"
                      id="header"
                      name="header"
                      value={formData.header}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="abbreviation">
                      {t("form.abbreviation")}
                    </label>
                    <input
                      type="text"
                      id="abbreviation"
                      name="abbreviation"
                      value={formData.abbreviation}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="languageId">{t("form.languageId")}</label>
                    <select
                      id="languageId"
                      name="languageId"
                      value={formData.languageId}
                      onChange={handleInputChange}
                    >
                      <option value="">{t("form.selectLanguage")}</option>
                      <option value="en">English</option>
                      <option value="es">Spanish</option>
                      <option value="fr">French</option>
                      <option value="de">German</option>
                    </select>
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
                      {t("form.featured")}
                    </label>
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="summary">{t("form.summary")} *</label>
                  <Editor
                    value={formData.body}
                    onTextChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        body: e.htmlValue ?? "",
                      }))
                    }
                    style={{ height: "320px", backgroundColor: "white" }}
                  />
                </div>

                <div className="form-actions">
                  <button type="submit" className="edit-btn">
                    {currentView === "create"
                      ? t("form.create")
                      : t("form.update")}
                  </button>
                  <button
                    type="button"
                    onClick={handleCancel}
                    className="cansel-btn"
                  >
                    {t("form.cancel")}
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
