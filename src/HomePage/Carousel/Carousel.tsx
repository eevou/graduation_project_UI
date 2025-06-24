import React, { use, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import "./Carousel.css";
import { useNews } from "../../Services/NewsContext";

export default function NewsCarousel(props) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const langString = localStorage.getItem("lang");
  const savedLang = langString ? JSON.parse(langString) : null;

  const [news, setNews] = useState([]);
  const { getNews, langId } = useNews();

  const ArStyle = {
    fontFamily: "var(--MNF_Body_AR)",
    // fontSize: "16px"
  };

  const EnStyle = {
    fontFamily: "var(--MNF_Body_EN)",
  };

  const scroll = (direction: "left" | "right") => {
    const card = scrollRef.current?.childNodes[0].childNodes[0];

    if (scrollRef.current && card) {
      const scrollAmount = card.clientWidth + 24;
      const newScrollLeft =
        direction === "left"
          ? scrollRef.current.scrollLeft - scrollAmount
          : scrollRef.current.scrollLeft + scrollAmount;

      scrollRef.current.scrollTo({
        left: newScrollLeft,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    const fetchNews = async () => {
      const newsData = await getNews(langId);
      setNews(newsData.data);
    };

    fetchNews();
  }, [langId]);  

  return (
    <div className="news-carousel">
      <div className="news-carousel-container">
        <div ref={scrollRef} className="news-carousel-scroll custom-scrollbar">
          <div className="news-carousel-content">
            {news?.slice(0, 10).map((news, index) => (
              <div key={index} className="news-card">
                <div className="news-card-inner">
                  <div className="news-card-content">
                    <div
                      className={
                        index % 2 === 0
                          ? "news-card-text"
                          : "news-card-text news-card-text-right"
                      }
                    >
                      <h3
                        className="news-card-title"
                        style={savedLang?.code === `ar` ? ArStyle : EnStyle}
                      >
                        {news?.translations[0]?.header?.slice(0, 75)}
                        {news?.translations[0]?.header?.length > 75 && "..."}
                      </h3>
                      <Link
                        to={`/details`}
                        state={{ news }}
                        className="arrowlinks"
                        onClick={() => window.scrollTo(0, 0)}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          height="24px"
                          viewBox="0 -960 960 960"
                          width="24px"
                          fill="#1f1f1f"
                        >
                          <path d="m242-246-42-42 412-412H234v-60h480v480h-60v-378L242-246Z" />
                        </svg>
                      </Link>
                    </div>
                    <div
                      className={
                        index % 2 !== 0
                          ? "news-card-image-container"
                          : "news-card-image-container news-card-image-container-right"
                      }
                    >
                      <svg width="0" height="0">
                        <clipPath id="img-container">
                          <path
                            d="M3.99997 20C3.99997 8.95433 12.9543 0 24 0H170C181.046 0 190 8.95431 190 20V187.088C190 201.067 176.026 210.733 162.946 205.803L16.9462 150.774C9.15647 147.838 3.99997 140.384 3.99997 132.059V20Z"
                            fill="#D9D9D9"
                            className="svg-path"
                          />
                        </clipPath>
                      </svg>

                      <img
                        style={{ clipPath: "url(#img-container)" }}
                        src={news.image}
                        alt=""
                        className={
                          index % 2 !== 0
                            ? "news-card-image"
                            : "news-card-image news-card-image-right"
                        }
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={() => scroll("left")}
          className="carousel-button carousel-button-left"
        >
          <ChevronLeft />
        </button>

        <button
          onClick={() => scroll("right")}
          className="carousel-button carousel-button-right"
        >
          <ChevronRight />
        </button>
      </div>
    </div>
  );
}
