import Home from "./HomePage/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import News from "./NewsPage/News"
<<<<<<< HEAD
import Details from "./NewsDetails/Details";

=======
import NewsDetails from "./NewsDetails/SectionOne/SectionOne"
>>>>>>> e48829a503ea1fd2767f795eacda82a6347329e4
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/news" element={<News />} />
<<<<<<< HEAD
        <Route path="/" element={<Details title="title 1" description="des 1" date="1-1-2000" />} />
=======
        <Route path="/details" element={<NewsDetails />} />
>>>>>>> e48829a503ea1fd2767f795eacda82a6347329e4
      </Routes>
    </Router>
  );
}

export default App;
