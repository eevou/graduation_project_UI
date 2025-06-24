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
<<<<<<< HEAD
=======

>>>>>>> 104b955f94e4050bad86b2918dac83a259b67100
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

<<<<<<< HEAD
      return response.data.data

=======
      return response.data;
>>>>>>> 104b955f94e4050bad86b2918dac83a259b67100
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
