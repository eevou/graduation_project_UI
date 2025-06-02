import React, { createContext, useContext, useState, useEffect } from "react";
import api from "./api.js";

const NewsContext = createContext();

export const NewsProvider = ({ children }) => {
  const [news, setNews] = useState(null);
  const [loading, setLoading] = useState(true);

  const getNews = async () => {
    try {
      const response = await api.get("/News");
      setNews(response.data);
    } catch (error) {
      console.error("Error fetching news:", error);
      setNews(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getNews();
  }, []);

  return (
    <NewsContext.Provider value={{ news, loading }}>{children}</NewsContext.Provider>
  );
};

export const useNews = () => useContext(NewsContext);
