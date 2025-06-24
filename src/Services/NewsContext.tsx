import React, { createContext, useContext, useState, useEffect } from "react";
import api from "./api.js";

const NewsContext = createContext();

export const NewsProvider = ({ children }) => {
  const langString = localStorage.getItem("lang");
  var savedLang = langString ? JSON.parse(langString) : null;
  
  const [news, setNews] = useState([]);
  const [langId, setLangId] = useState(savedLang ? savedLang.id : null);
  const [loading, setLoading] = useState(true);

  const getNews = async (
    langId,
    pageIndex = 1,
    pageSize = 10,
    search = null,
    date1 = null,
    date2 = null
  ) => {
    try {

      const response = await api.get("/News", {
        params: {
          langId: langId,
          pageSize: pageSize,
          pageIndex: pageIndex,
          search: search,
          dateTime1: date1,
          dateTime2: date2,
        },
      });

      return response.data;
    } catch (error) {
      console.error("Error fetching news:", error);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return (
    <NewsContext.Provider value={{ news, loading, langId, getNews, setLangId }}>
      {children}
    </NewsContext.Provider>
  );
};

export const useNews = () => useContext(NewsContext);
