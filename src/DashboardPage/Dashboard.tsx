import React, { use, useEffect, useState } from "react";
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
import api from "../Services/api";
import { data } from "react-router-dom";

const pageSize = 20;

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

  const { getNews, langId, loading } = useNews();

  const [articles, setArticles] = useState<Article[]>([]);
  const [successfull, setSuccessfull] = useState(false);
  const [addingLoading, setAddingLoading] = useState(false);
  const [filters, setFilters] = useState({
    pageSize: pageSize,
    pageNumber: 1,
    search: null,
    date1: null,
    data2: null,
  });
  const [pagesCount, setPagesCount] = useState(0);
  const pages = Array.from({ length: pagesCount }, (_, i) => i + 1);

  const langString = localStorage.getItem("lang");
  const savedLang = langString ? JSON.parse(langString) : null;
  const { i18n, t } = useTranslation("Dashboard");

  useEffect(() => {
    const fetchNews = async () => {
      const newsData = await getNews(
        langId,
        filters.pageNumber,
        filters.pageSize,
        filters.search,
        filters.date1,
        filters.data2
      );
      setArticles(newsData.data);
      setPagesCount(Math.ceil(newsData.count / pageSize));
    };

    fetchNews();
  }, [filters, successfull, langId]);

  // Form state

  const [formData, setFormData] = useState({
    date: "",
    source: "",
    imageUrl: null,
    isFeatured: false,
    header: "",
    abbreviation: "",
    body: "",
    languageId: "",
    newsId: "",
    additionalImages: [],
  });

  const handleInputChange = (
    e: React.ChangeEvent<
      | HTMLInputElement
      | HTMLTextAreaElement
      | HTMLSelectElement
      | HTMLFormElement
    >
  ) => {
    const { name, value, type } = e.target;
    if (type === "checkbox") {
      setFormData((prev) => ({
        ...prev,
        [name]: (e.target as HTMLInputElement).checked,
      }));
    } else if (type === "file") {
      const selectedFile = (e.target as HTMLInputElement).files?.[0];
      if (!selectedFile) return;

      setFormData((prev) => ({ ...prev, [name]: selectedFile }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleAdditionalImageChange = (index: number, event) => {
    const selectedFile = event.target.files[0];

    const newImages = [...formData.additionalImages];
    newImages[index] = selectedFile;
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (currentView === "create") {
      const form = new FormData();
      form.append("Date", formData.date);
      form.append("Image", formData.imageUrl);
      form.append("IsFeatured", String(formData.isFeatured));

      form.append("Translations[0].header", formData.header);
      form.append("Translations[0].abbreviation", formData.abbreviation);
      form.append("Translations[0].body", formData.body);
      form.append("Translations[0].source", formData.source);
      form.append("Translations[0].languageId", formData.languageId);

      formData.additionalImages.forEach((file) => {
        form.append("Gallary", file);
      });

      setAddingLoading(true);

      try {
        const response = await api.post("/news", form, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        setSuccessfull(true);
      } catch (error) {
        console.error("Error uploading:", error);
      } finally {
        setAddingLoading(false);
      }
    } else if (currentView === "edit" && editingArticle) {
      setArticles((prev) =>
        prev.map((article) =>
          article.newsId === editingArticle.newsId
            ? {
                ...article,
                ...formData,
                newsId: editingArticle.newsId,
                gallaries: formData.additionalImages.filter(
                  (img) => img.trim() !== ""
                ),
                // Ensure these fields are present and updated as needed
                ownerId: article.ownerId,
                image: formData.imageUrl || article.image,
                translations: [
                  {
                    header: formData.header,
                    abbreviation: formData.abbreviation,
                    body: formData.body,
                    id: article.translations[0]?.id ?? 0,
                    source: formData.source,
                    languageId:
                      Number(formData.languageId) ||
                      article.translations[0]?.languageId ||
                      1,
                    newsId: editingArticle.newsId,
                  },
                ],
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

  const handleDelete = async (id: string) => {
    console.log("Deleting article with ID:", id);
    if (window.confirm("Are you sure you want to delete this article?")) {
      setArticles((prev) => prev.filter((article) => article.newsId !== id));
      try {
        const response = await api.delete("/News", {
          params: { id: id },
        });
        console.log("Article deleted successfully:", response.data);
      } catch (error) {
        console.error("Error deleting article:", error);
      }
    }
  };

  const handleCancel = () => {
    resetForm();
    setCurrentView("list");
  };

  const navigateToPage = (page) => {
    if (page !== filters.pageNumber) {
      setFilters((prev) => ({ ...prev, pageNumber: page }));
    }
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

  if (loading) {
    return (
      <div className="dashboard-loading">
        <p>{t("loading")}</p>
        <i className="fa-solid fa-circle-notch loading-icon"></i>
      </div>
    );
  }

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
            style={savedLang?.code === `ar` ? pArStyle : pEnStyle}
          >
            <Plus size={16} />
            {t("button.create")}
          </button>
          <button
            className={
              currentView === "list" ? "view-list-btn active" : "view-list-btn"
            }
            onClick={() => setCurrentView("list")}
            style={savedLang?.code === `ar` ? pArStyle : pEnStyle}
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
                  <img
                    src={article.image}
                    alt={article?.translations[0]?.header}
                  />
                  {article.isFeatured && (
                    <p className="featured-badge">{t("badge.featured")}</p>
                  )}
                </div>
                <div className="article-content">
                  <div>
                    <div className="article-meta">
                      <span className="article-date">
                        {new Date(article.date).toLocaleDateString()}
                      </span>
                    </div>
                    <h3 className="article-title">
                      {article?.translations[0]?.header}
                    </h3>
                    <p className="article-source">
                      {t("article.source")}: {article?.translations[0]?.source}
                    </p>
                    <div
                      className="article-summary"
                      dangerouslySetInnerHTML={{
                        __html: article?.translations?.[0]?.body
                          ? truncate(article.translations[0].body, 50, {})
                          : "<span>لا يوجد محتوى</span>",
                      }}
                    />
                  </div>

                  <div className="article-actions">
                    <button
                      className="edit-btn"
                      onClick={() => handleEdit(article)}
                      style={savedLang?.code === `ar` ? pArStyle : pEnStyle}
                    >
                      <Edit size={16} />
                      {t("article.edit")}
                    </button>
                    <button
                      className="delete-btn"
                      onClick={() => handleDelete(article?.newsId)}
                      style={savedLang?.code === `ar` ? pArStyle : pEnStyle}
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
                  <label htmlFor="imageUrl" className="dropArea">
                    <input
                      type="file"
                      id="imageUrl"
                      name="imageUrl"
                      onChange={handleInputChange}
                      required
                      style={{ marginTop: "10px", display: "none" }}
                    />
                    {formData.imageUrl ? (
                      <p>{formData.imageUrl.name}</p>
                    ) : (
                      <p>{t("selectImage")}</p>
                    )}
                  </label>
                </div>

                <div className="form-group">
                  <label>{t("form.additionalImages")} *</label>

                  <div className="addition-img-container">
                    {formData.additionalImages.map((image, index) => (
                      <div key={index} className="additional-image-row">
                        <label
                          htmlFor={`gallary-input-${index}`}
                          className="dropArea"
                        >
                          <input
                            type="file"
                            id={`gallary-input-${index}`}
                            required
                            style={{ display: "none" }}
                            placeholder="Additional image URL"
                            onChange={(e) => {
                              handleAdditionalImageChange(index, e);
                            }}
                          />
                          {image ? (
                            <p>{image.name}</p>
                          ) : (
                            <p>{t("selectImage")}</p>
                          )}
                        </label>

                        {formData.additionalImages.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeAdditionalImageField(index)}
                            className="remove-addition-img-btn"
                            style={
                              savedLang?.code === `ar` ? pArStyle : pEnStyle
                            }
                          >
                            {t("form.removeImage")}
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                  <button
                    type="button"
                    onClick={addAdditionalImageField}
                    className="add-addition-img-btn"
                    style={savedLang?.code === `ar` ? pArStyle : pEnStyle}
                  >
                    {t("form.addImage")}
                  </button>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="header">{t("form.header")} *</label>
                    <input
                      type="text"
                      id="header"
                      name="header"
                      value={formData.header}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="abbreviation">
                      {t("form.abbreviation")} *
                    </label>
                    <input
                      type="text"
                      id="abbreviation"
                      name="abbreviation"
                      value={formData.abbreviation}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="languageId">{t("form.languageId")} *</label>
                    <select
                      id="languageId"
                      name="languageId"
                      value={formData.languageId}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="">{t("form.selectLanguage")}</option>
                      <option value="1">Arabic</option>
                      <option value="2">English</option>
                      <option value="3">Spanish</option>
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
                    style={{ height: "320px", backgroundColor: "white" }}
                    required
                    onTextChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        body: e.htmlValue ?? "",
                      }))
                    }
                  />
                </div>

                <div className="form-actions">
                  <button
                    type="submit"
                    className="edit-btn"
                    style={savedLang?.code === `ar` ? pArStyle : pEnStyle}
                  >
                    {addingLoading ? (
                      <i className="fa-solid fa-circle-notch loading-icon"></i>
                    ) : currentView === "create" ? (
                      t("form.create")
                    ) : (
                      t("form.update")
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={handleCancel}
                    className="cansel-btn"
                    style={savedLang?.code === `ar` ? pArStyle : pEnStyle}
                  >
                    {t("form.cancel")}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        <div className="pagination">
          <button
            className="pagination-arrow"
            onClick={() => {
              setFilters((prev) => ({
                ...prev,
                pageNumber: filters.pageNumber - 1,
              }));
              window.scrollTo(0, 0);
            }}
            disabled={filters.pageNumber <= 1 ? true : false}
          >
            <i className="fa-solid fa-left-long" ></i>
          </button>

          <span>
            {pages.map((page) => (
              <span
                key={page}
                className={
                  filters.pageNumber === page
                    ? "pagination-pages page-active"
                    : "pagination-pages"
                }
                onClick={() => {
                  navigateToPage(page);
                  window.scrollTo(0, 0);
                }}
              >
                {page}
              </span>
            ))}
          </span>

          <button
            className="pagination-arrow"
            onClick={() => {
              setFilters((prev) => ({
                ...prev,
                pageNumber: filters.pageNumber + 1,
              }));
              window.scrollTo(0, 0);
            }}
            disabled={filters.pageNumber >= pagesCount ? true : false}
          >
            <i className="fa-solid fa-right-long"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewsManagementDashboard;
