import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./HomePage/Home";
import News from "./NewsPage/News";
import Details from "./NewsDetails/Details";
import ContactUs from "./ContactUsPage/ContactUs";
import Collage from "./Collages/Collages";
import Programs from "./ProgramsPage/Programs";
import LoginForm from "./LoginPage/LoginForm";
import SignUp from "./SignUpPage/SignUp";
import { AuthProvider } from "./Services/authContext";
import { NewsProvider } from "./Services/NewsContext";

function App() {
  return (
    <NewsProvider>
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/news" element={<News />} />
            <Route path="/details" element={<Details />} />
            <Route path="/contact-us" element={<ContactUs />} />
            <Route path="/collage" element={<Collage />} />
            <Route path="/programs" element={<Programs />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/signup" element={<SignUp />} />
          </Routes>
        </Router>
      </AuthProvider>
    </NewsProvider>
  );
}

export default App;
