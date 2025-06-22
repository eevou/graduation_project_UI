import React, { createContext, useContext, useState, useEffect } from "react";
import api from "./api.js";

const NewsContext = createContext();

export const NewsProvider = ({ children }) => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  const langString = localStorage.getItem("lang");
  var savedLang = langString ? JSON.parse(langString) : null;

  const getNews = async (
    langId,
    pageIndex = 1,
    pageSize = 10,
    date1 = null,
    date2 = null
  ) => {
    try {
<<<<<<< HEAD
      const response = await api.get("/News");
      setNews(response.data);

      console.log("News fetched successfully:", response.data);
=======
      const response = await api.get("/News", {
        params: {
          langId: langId,
          pageSize: pageSize,
          pageIndex: pageIndex,
          dateTime1: date1,
          dateTime2: date2,
        },
      });

      return response.data.data
>>>>>>> 12b062b5d4a7eebbd34fda34468af9d8032bd89d

    } catch (error) {
      console.error("Error fetching news:", error);
      return null
    } finally {
      setLoading(false);
    }
  };

  return (
    <NewsContext.Provider value={{ news, loading, getNews }}>
      {children}
    </NewsContext.Provider>
  );
};

export const useNews = () => useContext(NewsContext);
