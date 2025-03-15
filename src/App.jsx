import Home from "./HomePage/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import News from "./NewsPage/News"

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/news" element={<News />} />
      </Routes>
    </Router>
  );
}

export default App;
