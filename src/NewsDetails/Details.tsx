import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import {
  ArrowLeft,
  Calendar,
  User,
  ChevronRight,
  ChevronLeft,
} from "lucide-react";
import "./Details.css";
import Header from "../HomePage/Header/Header";
import Footer from "../HomePage/Footer/Footer";
import { useNews } from "../Services/NewsContext";
import api from "../Services/api";
import { useTranslation } from "react-i18next";

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

const NewsDetails: React.FC = () => {
  const { newsid } = useParams();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const { getNews, langId, loading } = useNews();
  const [news, setNews] = useState<Article[]>([]);
  const [currentNewsId, setcurrentNewsId] = useState<Article>();
  const { i18n, t } = useTranslation("News");

  useEffect(() => {
    setIsVisible(true);
  }, []);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await getNews(langId, 1, 6);
        setNews(response.data);
      } catch (error) {
        console.error("Error fetching news:", error);
      }
    };

    const fetchNewsById = async (newsId: string) => {
      try {
        const response = await api.get(`/News/${newsid}?langId=${langId}`);
        console.log("Fetched news:", response.data);
        setcurrentNewsId(response.data);
      } catch (error) {
        console.error("Error fetching news by ID:", error);
      }
    };

    if (newsid) {
      fetchNewsById(newsid);
    }
    fetchNews();
  }, [langId, newsid]);

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

  if (!currentNewsId) {
    return (
      <div className="news-details" style={langId === 1 ? pArStyle : pEnStyle}>
        <div className="news-details-container">
          <div className="not-found">
            <h1>News article not found</h1>
            <Link to="/" className="back-link">
              <ArrowLeft size={20} />
              Back to News
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Create image array for carousel
  const images = [currentNewsId?.image, ...(currentNewsId?.gallaries || [])];

  const nextImage = () => {
    setCurrentImageIndex(
      (prev) => (prev + 1) % currentNewsId?.gallaries.length
    );
  };

  const prevImage = () => {
    setCurrentImageIndex(
      (prev) =>
        (prev - 1 + currentNewsId?.gallaries.length) %
        currentNewsId?.gallaries.length
    );
  };

  const goToImage = (index: number) => {
    setCurrentImageIndex(index);
  };

  return (
    <div className="news-details-wrapper">
      <Header index={4} />

      {/* Floating SVG Background */}
      <div className="floating-shapes">
        <div className="shape shape-1"></div>
        <div className="shape shape-2"></div>
        <div className="shape shape-3"></div>
      </div>

      <div
        className={`news-details ${isVisible ? "visible" : ""}`}
        style={langId === 1 ? pArStyle : pEnStyle}
      >
        <div className="news-details-container">
          <div className="breadcrumb-wrapper">
            <Link to="/news" className="breadcrumb-link">
              <ArrowLeft size={18} />
              <span>{t("backToNews")}</span>
            </Link>
          </div>

          <article className="article">
            <div>
              <div className="article-header">
                <div className="title-wrapper">
                  <h1 className="article-title">
                    {currentNewsId?.translations?.[0]?.header
                      ? currentNewsId?.translations?.[0]?.header
                      : langId === 1
                      ? "لا يوجد محتوى متاح بهذه اللغة"
                      : "No content available in this language"}
                  </h1>
                  <div className="title-underline"></div>
                </div>

                <div className="article-meta">
                  <div className="meta-item">
                    <div className="meta-icon">
                      <Calendar size={16} />
                    </div>
                    <span>
                      {new Date(currentNewsId?.date).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>

              <div className="carousel-container">
                <div className="carousel-wrapper">
                  <div className="carousel-images">
                    {currentNewsId.gallaries?.map((image, index) => (
                      <div
                        key={index}
                        className={`carousel-slide ${
                          index === currentImageIndex ? "active" : ""
                        }`}
                      >
                        <img
                          src={image}
                          alt={`${
                            currentNewsId.translations[0]?.header ||
                            "News Article"
                          } - Image ${index + 1}`}
                        />
                        <div className="image-overlay"></div>
                      </div>
                    ))}
                  </div>

                  {currentNewsId.gallaries.length > 1 && (
                    <>
                      <button
                        className="carousel-btn prev-btn"
                        onClick={prevImage}
                      >
                        <ChevronLeft size={24} />
                      </button>
                      <button
                        className="carousel-btn next-btn"
                        onClick={nextImage}
                      >
                        <ChevronRight size={24} />
                      </button>

                      <div className="carousel-indicators">
                        {currentNewsId.gallaries?.map((_, index) => (
                          <button
                            key={index}
                            className={`indicator ${
                              index === currentImageIndex ? "active" : ""
                            }`}
                            onClick={() => goToImage(index)}
                          />
                        ))}
                      </div>
                    </>
                  )}
                </div>
              </div>

              <div className="article-content">
                <div className="content-wrapper">
                  <div className="article-body">
                    <div
                      className="article-summary"
                      dangerouslySetInnerHTML={{
                        __html: currentNewsId?.translations?.[0]?.body,
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </article>

          <section className="latest-news-section">
            <div className="section-header">
              <h2 className="section-title">{t("latestNews")}</h2>
            </div>

            <div className="latest-news-grid">
              {news.map((article, index) => (
                <article
                  key={article.newsId}
                  className={`news-card card-${index + 1}`}
                >
                  <div className="card-image-wrapper">
                    <img
                      src={article.image}
                      alt={article?.translations?.[0]?.header}
                    />
                    <div className="card-overlay"></div>
                  </div>

                  <div className="card-content">
                    <div className="card-meta">
                      <span className="card-date">
                        {new Date(article?.date).toLocaleDateString()}
                      </span>
                    </div>

                    <h3 className="card-title">
                      {article?.translations?.[0]?.header}
                    </h3>

                    <Link
                      to={`/news/${article.newsId}`}
                      className="card-link"
                      onClick={() => window.scrollTo(0, 0)}
                    >
                      <span>{t("readArticle")}</span>
                      <ChevronRight size={16} />
                    </Link>
                  </div>

                  <div className="card-number">
                    {String(index + 1).padStart(2, "0")}
                  </div>
                </article>
              ))}
            </div>
          </section>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default NewsDetails;
