"use client"

import { useEffect, useRef, useState } from "react"
import { ChevronLeft, ChevronRight, ArrowUpRight, Clock } from "lucide-react"
import { Link } from "react-router-dom"
import "./Carousel.css"
import { useNews } from "../../Services/NewsContext"

export default function NewsCarousel(props) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const langString = localStorage.getItem("lang")
  const savedLang = langString ? JSON.parse(langString) : null

  const [news, setNews] = useState([])
  const { getNews, langId } = useNews()

  const ArStyle = {
    fontFamily: "var(--MNF_Body_AR)",
  }

  const EnStyle = {
    fontFamily: "var(--MNF_Body_EN)",
  }

  const scroll = (direction: "left" | "right") => {
    const card = scrollRef.current?.childNodes[0].childNodes[0]

    if (scrollRef.current && card) {
      const scrollAmount = card.clientWidth + 24
      const newScrollLeft =
        direction === "left" ? scrollRef.current.scrollLeft - scrollAmount : scrollRef.current.scrollLeft + scrollAmount

      scrollRef.current.scrollTo({
        left: newScrollLeft,
        behavior: "smooth",
      })
    }
  }

  useEffect(() => {
    const fetchNews = async () => {
      const newsData = await getNews(langId)
      setNews(newsData.data)
    }

    fetchNews()
  }, [langId])

  return (
    <div className="modern-news-carousel">
      <div className="carousel-header">
        <h2 className="carousel-title" style={savedLang?.code === `ar` ? ArStyle : EnStyle}>
          Latest News
        </h2>
      </div>

      <div className="carousel-container">
        <div ref={scrollRef} className="carousel-scroll custom-scrollbar">
          <div className="carousel-content">
            {news?.slice(0, 10).map((newsItem, index) => (
              <article key={index} className="news-card modern-card">
                <div className="card-image-container">
                  <img
                    src={newsItem.image || "/placeholder.svg"}
                    alt={newsItem?.translations[0]?.header}
                    className="card-image"
                    loading="lazy"
                  />
                  <div className="image-overlay"></div>
                  <div className="card-badge">
                    <Clock size={12} />
                    <span>Latest</span>
                  </div>
                </div>

                <div className="card-content">
                  <div className="card-text">
                    <h3 className="card-title" style={savedLang?.code === `ar` ? ArStyle : EnStyle}>
                      {newsItem?.translations[0]?.header?.slice(0, 85)}
                      {newsItem?.translations[0]?.header?.length > 85 && "..."}
                    </h3>

                    <div className="card-meta">
                      <span className="read-time">2 min read</span>
                    </div>
                  </div>

                  <Link
                    to={`/details`}
                    state={{ news: newsItem }}
                    className="card-link"
                    onClick={() => window.scrollTo(0, 0)}
                    aria-label={`Read more about ${newsItem?.translations[0]?.header}`}
                  >
                    <span>Read More</span>
                    <ArrowUpRight size={16} />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>

        <button
          onClick={() => scroll("left")}
          className="carousel-nav-button carousel-nav-left"
          aria-label="Previous news"
        >
          <ChevronLeft size={24} />
        </button>
        <button
          onClick={() => scroll("right")}
          className="carousel-nav-button carousel-nav-right"
          aria-label="Next news"
        >
          <ChevronRight size={24} />
        </button>
      </div>
    </div>
  )
}
