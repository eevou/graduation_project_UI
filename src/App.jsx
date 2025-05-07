import Home from "./HomePage/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import News from "./NewsPage/News"
import Details from "./NewsDetails/Details";
import ContactUs from "./ContactUsPage/ContactUs"

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/news" element={<News />} />
        <Route path="/details" element={<Details />} />
        <Route path="/contactUs" element={<ContactUs />} />
      </Routes>
    </Router>
  );
}

export default App;
