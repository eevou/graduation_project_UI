import Home from "./HomePage/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import News from "./NewsPage/News"
import Details from "./NewsDetails/Details";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/news" element={<News />} />
        <Route path="/" element={<Details title="title 1" description="des 1" date="1-1-2000" />} />
      </Routes>
    </Router>
  );
}

export default App;
