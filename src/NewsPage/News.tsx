import React, { useState, useEffect } from "react";
import Header from "../HomePage/Header/Header";
import Footer from "../HomePage/Footer/Footer";
import "./News.css";
import { Search, Calendar, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { newsData } from '../data/newsdata';

const NewsPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [filteredNews, setFilteredNews] = useState(newsData);
  const [displayedCount, setDisplayedCount] = useState(6);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    let filtered = newsData;

    if (searchTerm) {
      filtered = filtered.filter(
        (news) =>
          news.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          news.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (dateFrom) {
      filtered = filtered.filter((news) => new Date(news.date) >= new Date(dateFrom));
    }

    if (dateTo) {
      filtered = filtered.filter((news) => new Date(news.date) <= new Date(dateTo));
    }

    setFilteredNews(filtered);
    setDisplayedCount(6); // Reset display count when filters change
  }, [searchTerm, dateFrom, dateTo]);

  const clearFilters = () => {
    setSearchTerm('');
    setDateFrom('');
    setDateTo('');
  };

  const handleShowMore = () => {
    setIsLoading(true);
    setTimeout(() => {
      setDisplayedCount(prev => prev + 6);
      setIsLoading(false);
    }, 800);
  };

  const displayedNews = filteredNews.slice(0, displayedCount);
  const hasMoreNews = displayedCount < filteredNews.length;

  return (
    <div className="news-page">
      <Header index={4} />

      {/* Animated SVG Background Elements */}
      <div className="svg-decorations">
        <div className="floating-shape shape-1"></div>
        <div className="floating-shape shape-2"></div>
        <div className="floating-shape shape-3"></div>
      </div>

      <div className="news-container">


        <div className="search-section fade-in">
          <div className="search-filters">
            <div className="search-group">
              <div className="search-input-wrapper">
                <Search className="search-icon" size={20} />
                <input
                  id="search"
                  type="text"
                  placeholder="ابحث بعنوان الخبر أو مضمونه..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="search-input"
                />
              </div>
            </div>

            <div className="date-filters">
              <div className="date-group">
                <label htmlFor="dateFrom" className="date-label">من تاريخ</label>
                <div className="date-input-wrapper">
                  <Calendar className="date-icon" size={18} />
                  <input
                    id="dateFrom"
                    type="date"
                    value={dateFrom}
                    onChange={(e) => setDateFrom(e.target.value)}
                    className="date-input"
                  />
                </div>
              </div>

              <div className="date-group">
                <label htmlFor="dateTo" className="date-label">إلى تاريخ</label>
                <div className="date-input-wrapper">
                  <Calendar className="date-icon" size={18} />
                  <input
                    id="dateTo"
                    type="date"
                    value={dateTo}
                    onChange={(e) => setDateTo(e.target.value)}
                    className="date-input"
                  />
                </div>
              </div>

              <button onClick={clearFilters} className="clear-filters-btn">
                مسح التصفية
              </button>
            </div>
          </div>
        </div>

        {/* News Results Summary */}
       

        <div className="news-grid fade-in-stagger">
          {displayedNews.map((news, index) => (
            <article
              key={news.id}
              className={`news-card ${index % 3 === 0 ? 'featured-card' : ''}`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="news-card-image">
                <img src={news.image} alt={news.title} />
                <div className="image-overlay"></div>
              </div>
              <div className="news-card-content">
                <div className="news-meta">
                  
                  <span className="news-card-date">
                    {new Date(news.date).toLocaleDateString("ar-EG", {
                      year: "numeric",
                      month: "long",
                      day: "numeric"
                    })}
                  </span>
                </div>
                <h3 className="news-card-title">{news.title}</h3>
                <p className="news-card-excerpt">{news.excerpt}</p>
                <Link to={`/news/${news.id}`} className="read-more-btn">
                  اقرأ المزيد <ChevronRight size={16} />
                </Link>
              </div>
            </article>
          ))}
        </div>

        {/* Show More Button */}
        {hasMoreNews && (
          <div className="show-more-section fade-in">
            <button
              onClick={handleShowMore}
              className={`show-more-btn ${isLoading ? 'loading' : ''}`}
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <div className="loading-spinner"></div>
                  جارٍ التحميل...
                </>
              ) : (
                <>
                  عرض المزيد 
                  <ChevronRight size={16} />
                </>
              )}
            </button>
          </div>
        )}

        {filteredNews.length === 0 && (
          <div className="no-results fade-in">
            <div className="no-results-icon">📰</div>
            <h3>لم يتم العثور على أي أخبار</h3>
            <p>لم يتم العثور على أي أخبار تطابق البحث. جرب تعديل معايير البحث.</p>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default NewsPage;