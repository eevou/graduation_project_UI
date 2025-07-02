import React, { useState, useEffect } from "react";
import Header from "../HomePage/Header/Header";
import Footer from "../HomePage/Footer/Footer";
import "./News.css";
import { Calendar, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useNews } from "../Services/NewsContext";
import { useTranslation } from "react-i18next";

const pageSize = 9;

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

const NewsPage: React.FC = () => {
  const [news, setNews] = useState<Article[]>([]);
  const [search, setSearch] = useState("");
  const { getNews, langId, loading } = useNews();

  const { i18n, t } = useTranslation("News");

  const [pagesCount, setPagesCount] = useState(0);
  const pages = Array.from({ length: pagesCount }, (_, i) => i + 1);

  const today = new Date().toISOString().split("T")[0];
  const [filters, setFilters] = useState({
    pageSize: pageSize,
    pageNumber: 1,
    Search: "",
    date1: "",
    date2: today,
  });

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await getNews(
          langId,
          filters.pageNumber,
          filters.pageSize,
          filters.Search,
          filters.date1,
          filters.date2
        );
        setNews(response.data);
        setPagesCount(Math.ceil(response.count / pageSize));
      } catch (error) {
        console.error("Error fetching news:", error);
      }
    };

    fetchNews();
  }, [langId, filters]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFilters((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
      pageNumber: 1,
    }));
    console.log(filters);
  };

  const navigateToPage = (page) => {
    if (page !== filters.pageNumber) {
      setFilters((prev) => ({ ...prev, pageNumber: page }));
    }
  };

  const pArStyle = {
    fontFamily: "var(--MNF_Body_AR)",
    fontSize: "13px",
    padding: "16px 20px 16px 50px",
  };
  const pEnStyle = {
    fontFamily: "var(--MNF_Body_EN)",
    padding: "16px 50px 16px 20px",
  };

  return (
    <div className="news-page">
      <Header index={4} />

      {/* Animated SVG Background Elements */}
      <div className="svg-decorations">
        <div className="floating-shape shape-1"></div>
        <div className="floating-shape shape-2"></div>
        <div className="floating-shape shape-3"></div>
      </div>

      <div
        className="news-container"
        style={langId === 1 ? pArStyle : pEnStyle}
      >
        <div className="search-section fade-in">
          <div className="search-filters">
            <div className="search-group">
              <div className="search-input-wrapper">
                <input
                  id="search"
                  type="text"
                  style={langId === 1 ? pArStyle : pEnStyle}
                  placeholder={t("searchPlaceholder")}
                  onChange={(e) => setSearch(e.target.value)}
                  className="search-input"
                />
                <i
                  className="fa-solid fa-magnifying-glass search-icon"
                  onClick={() =>
                    setFilters((prev) => ({ ...prev, Search: search }))
                  }
                  style={langId === 1 ? { left: "16px" } : { right: "15px" }}
                ></i>
              </div>
            </div>

            <div className="date-filters">
              <div className="date-group">
                <label htmlFor="dateFrom" className="date-label">
                  {t("fromDate")}
                </label>
                <div className="date-input-wrapper">
                  <input
                    id="dateFrom"
                    type="date"
                    value={filters.date1}
                    name="date1"
                    onChange={(e) => handleChange(e)}
                    className="date-input"
                  />
                </div>
              </div>

              <div className="date-group">
                <label htmlFor="dateTo" className="date-label">
                  {t("toDate")}
                </label>
                <div className="date-input-wrapper">
                  <input
                    id="dateTo"
                    type="date"
                    value={filters.date2}
                    name="date2"
                    onChange={(e) => handleChange(e)}
                    className="date-input"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="news-grid fade-in-stagger">
          {news.map((news, index) => (
            <article
              key={news.newsId}
              className={`news-card ${index % 3 === 0 ? "featured-card" : ""}`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="news-card-image">
                <img src={news.image} alt={news?.translations[0]?.header} />
                <div className="image-overlay"></div>
              </div>
              <div className="news-card-content">
                <div className="news-meta">
                  <span className="news-card-date">
                    {new Date(news?.date).toLocaleDateString()}
                  </span>
                </div>
                <h3 className="news-card-title">
                  {news?.translations[0]?.header}
                </h3>
                <p className="news-card-excerpt">
                  {news?.translations[0]?.abbreviation}
                </p>
                <Link to={`/news/${news.newsId}`} className="read-more-btn" onClick={() => window.scrollTo(0, 0)}>
                  {t("readMore")}
                  <ChevronRight size={16} />
                </Link>
              </div>
            </article>
          ))}
        </div>

        {news.length === 0 && (
          <div className="no-results fade-in">
            <div className="no-results-icon">📰</div>
            <h3>{t("noResultsTitle")}</h3>
            <p>{t("noResultsText")}</p>
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
            <i className="fa-solid fa-left-long"></i>
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
      <Footer />
    </div>
  );
};

export default NewsPage;
