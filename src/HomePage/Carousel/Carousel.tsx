import React, { useRef } from "react";
import { ChevronLeft, ChevronRight, ArrowUpRight } from "lucide-react";
import "./Carousel.css";

interface NewsItem {
  id: number;
  title: string;
  image: string;
  link: string;
}

const newsItems: NewsItem[] = [
  {
    id: 1,
    title:
      "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quo libero illo facere adipisci? Eligendi quos, odit unde odio reprehenderit similique.",
    image:
      "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=200&h=150",
    link: "#",
  },
  {
    id: 2,
    title:
      "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quo libero illo facere adipisci? Eligendi quos, odit unde odio reprehenderit similique.",
    image:
      "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&q=80&w=200&h=150",
    link: "#",
  },
  {
    id: 3,
    title:
      "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quo libero illo facere adipisci? Eligendi quos, odit unde odio reprehenderit similique.",
    image:
      "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=200&h=150",
    link: "#",
  },
  {
    id: 4,
    title:
      "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quo libero illo facere adipisci? Eligendi quos, odit unde odio reprehenderit similique.",
    image:
      "https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&q=80&w=200&h=150",
    link: "#",
  },
  {
    id: 5,
    title:
      "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quo libero illo facere adipisci? Eligendi quos, odit unde odio reprehenderit similique.",
    image:
      "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&q=80&w=200&h=150",
    link: "#",
  },
  {
    id: 6,
    title:
      "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quo libero illo facere adipisci? Eligendi quos, odit unde odio reprehenderit similique.",
    image:
      "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&q=80&w=200&h=150",
    link: "#",
  },
  {
    id: 7,
    title:
      "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quo libero illo facere adipisci? Eligendi quos, odit unde odio reprehenderit similique.",
    image:
      "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?auto=format&fit=crop&q=80&w=200&h=150",
    link: "#",
  },
  {
    id: 8,
    title:
      "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quo libero illo facere adipisci? Eligendi quos, odit unde odio reprehenderit similique.",
    image:
      "https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&q=80&w=200&h=150",
    link: "#",
  },
  {
    id: 9,
    title:
      "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quo libero illo facere adipisci? Eligendi quos, odit unde odio reprehenderit similique.",
    image:
      "https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&q=80&w=200&h=150",
    link: "#",
  },
  {
    id: 10,
    title:
      "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quo libero illo facere adipisci? Eligendi quos, odit unde odio reprehenderit similique.",
    image:
      "https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&q=80&w=200&h=150",
    link: "#",
  },
  {
    id: 11,
    title:
      "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quo libero illo facere adipisci? Eligendi quos, odit unde odio reprehenderit similique.",
    image:
      "https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&q=80&w=200&h=150",
    link: "#",
  },
  {
    id: 12,
    title:
      "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quo libero illo facere adipisci? Eligendi quos, odit unde odio reprehenderit similique.",
    image:
      "https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&q=80&w=200&h=150",
    link: "#",
  },
];

export default function NewsCarousel() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const card = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current && card.current) {
      const scrollAmount = card.current.clientWidth + 24;
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

  return (
    <div className="news-carousel">
      <div className="news-carousel-container">
        <div ref={scrollRef} className="news-carousel-scroll custom-scrollbar">
          <div className="news-carousel-content">
            {newsItems.map((item, index) => (
              <div key={item.id} className="news-card" ref={card}>
                <div className="news-card-inner">
                  <div className="news-card-content">
                    <div
                      className={
                        index % 2 === 0
                          ? "news-card-text"
                          : "news-card-text news-card-text-right"
                      }
                    >
                      <h3 className="news-card-title">{item.title}</h3>
                      <a href={item.link} className="news-card-link">
                        Read more
                        <ArrowUpRight />
                      </a>
                    </div>
                    <div
                      className={
                        index % 2 === 0
                          ? "news-card-image-container"
                          : "news-card-image-container news-card-image-container-right"
                      }
                    >
                      <img
                        src={item.image}
                        alt={item.title}
                        className={
                          index % 2 === 0
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
