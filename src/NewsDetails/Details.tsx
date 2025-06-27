import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Calendar, User, ChevronRight, ChevronLeft } from 'lucide-react';
import { newsData } from '../data/newsdata';
import './Details.css';
import Header from "../HomePage/Header/Header";
import Footer from "../HomePage/Footer/Footer";

const NewsDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const news = newsData.find((item) => item.id === parseInt(id || '0'));
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  if (!news) {
    return (
      <div className="news-details">
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
  const images = [news.image, ...(news.gallery || [])];

  // Get latest articles (excluding current article)
  const latestArticles = newsData
    .filter((item) => item.id !== news.id)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 6);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
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

      <div className={`news-details ${isVisible ? 'visible' : ''}`}>
        <div className="news-details-container">

          {/* Enhanced Breadcrumb */}
          <div className="breadcrumb-wrapper">
            <Link to="/news" className="breadcrumb-link">
              <ArrowLeft size={18} />
              <span>Back to News</span>
            </Link>
          </div>

          {/* Main Article */}
          <article className="article">
            <div className="article-header">
              <div className="title-wrapper">
                <h1 className="article-title">{news.title}</h1>
                <div className="title-underline"></div>
              </div>

              <div className="article-meta">
                <div className="meta-item">
                  <div className="meta-icon">
                    <Calendar size={16} />
                  </div>
                  <span>{new Date(news.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}</span>
                </div>
                <div className="meta-item">
                  <div className="meta-icon">
                    <User size={16} />
                  </div>
                  <span>{news.author}</span>
                </div>
              </div>
            </div>

            {/* Enhanced Image Carousel */}
            <div className="carousel-container">
              <div className="carousel-wrapper">
                <div className="carousel-images">
                  {images.map((image, index) => (
                    <div
                      key={index}
                      className={`carousel-slide ${index === currentImageIndex ? 'active' : ''}`}
                    >
                      <img src={image} alt={`${news.title} - Image ${index + 1}`} />
                      <div className="image-overlay"></div>
                    </div>
                  ))}
                </div>

                {images.length > 1 && (
                  <>
                    <button className="carousel-btn prev-btn" onClick={prevImage}>
                      <ChevronLeft size={24} />
                    </button>
                    <button className="carousel-btn next-btn" onClick={nextImage}>
                      <ChevronRight size={24} />
                    </button>

                    <div className="carousel-indicators">
                      {images.map((_, index) => (
                        <button
                          key={index}
                          className={`indicator ${index === currentImageIndex ? 'active' : ''}`}
                          onClick={() => goToImage(index)}
                        />
                      ))}
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Enhanced Content */}
            <div className="article-content">
              <div className="content-wrapper">
                <div className="article-body">
                  {news.content.split('\n\n').map((paragraph, index) => (
                    <p key={index} className={`article-paragraph fade-in-paragraph paragraph-${index}`}>
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </article>

          {/* Latest News Section */}
          <section className="latest-news-section">
            <div className="section-header">
              <h2 className="section-title">Latest News</h2>
            </div>

            <div className="latest-news-grid">
              {latestArticles.map((article, index) => (
                <article key={article.id} className={`news-card card-${index + 1}`}>
                  <div className="card-image-wrapper">
                    <img src={article.image} alt={article.title} />
                    <div className="card-overlay"></div>
                  </div>

                  <div className="card-content">
                    <div className="card-meta">
                      <span className="card-date">
                        {new Date(article.date).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric'
                        })}
                      </span>
                    </div>

                    <h3 className="card-title">{article.title}</h3>

                    <Link to={`/news/${article.id}`} className="card-link">
                      <span>Read Article</span>
                      <ChevronRight size={16} />
                    </Link>
                  </div>

                  <div className="card-number">{String(index + 1).padStart(2, '0')}</div>
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