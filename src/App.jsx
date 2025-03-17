import Home from "./HomePage/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import News from "./NewsPage/News"
import NewsDetails from "./NewsDetails/SectionOne/SectionOne"
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/news" element={<News />} />
        <Route path="/details" element={<NewsDetails />} />
      </Routes>
    </Router>
  );
}

export default App;
