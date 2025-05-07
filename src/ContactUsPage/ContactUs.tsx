import React, { useState, useEffect } from "react";
import { Phone, Mail, MapPin, Star } from "lucide-react";
import "./ContactUs.css";
import Header from "../HomePage/Header/Header";
import Footer from "../HomePage/Footer/Footer";

function ContactUs() {
  const [activeTab, setActiveTab] = useState("suggestions");
  const [formData, setFormData] = useState({
    email: "",
    orderNumber: "",
    rating: 0,
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const tabs = [
    { id: "suggestions", label: "الإقتراحات" },
    { id: "complaints", label: "الشكاوي" },
    { id: "ratings", label: "التقييمات" },
  ];

  useEffect(() => {
    document.documentElement.dir = "rtl";
    document.documentElement.lang = "ar";
    document.title = "تواصل معنا | Uprangly";

    return () => {
      document.documentElement.dir = "ltr";
      document.documentElement.lang = "en";
    };
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRatingChange = (rating: number) => {
    setFormData((prev) => ({ ...prev, rating }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      setFormData({ email: "", orderNumber: "", rating: 0, message: "" });

      setTimeout(() => setSubmitted(false), 3000);
    }, 1000);
  };

  const renderForm = () => {
    if (submitted) {
      return (
        <div className="success-message">
          {activeTab === "suggestions" &&
            "تم إرسال اقتراحك بنجاح. شكراً لتواصلك معنا!"}
          {activeTab === "complaints" &&
            "تم إرسال شكواك بنجاح. سنتواصل معك قريباً!"}
          {activeTab === "ratings" && "تم إرسال تقييمك بنجاح. نشكرك على وقتك!"}
        </div>
      );
    }

    return (
      <form onSubmit={handleSubmit} className="contact-form">
        <div className="form-group">
          <label>
            الإيميل <span className="required">*</span>
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder="أدخل بريدك الإلكتروني"
          />
        </div>

        {activeTab === "ratings" && (
          <div className="form-group">
            <label>التقييم</label>
            <div className="rating-stars">
              {[5, 4, 3, 2, 1].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => handleRatingChange(star)}
                  className="star-button"
                >
                  <Star
                    fill={formData.rating >= star ? "currentColor" : "none"}
                    className={
                      formData.rating >= star ? "star-filled" : "star-empty"
                    }
                  />
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="form-group">
          <label>
            نص الرسالة <span className="required">*</span>
          </label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            rows={5}
            placeholder={
              activeTab === "suggestions"
                ? "أدخل اقتراحك هنا..."
                : activeTab === "complaints"
                ? "اشرح مشكلتك بالتفصيل..."
                : "أخبرنا المزيد عن تجربتك..."
            }
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className={`submit-button`}
        >
          {isSubmitting ? (
            <div className="loading-wrapper">
              <div className="loading-spinner" />
              <span>جاري الإرسال...</span>
            </div>
          ) : (
            "إرسال"
          )}
        </button>
      </form>
    );
  };

  return (
    <div>
      <Header index={5}></Header>

      <div className="contact-page">
        <div className="container">
          <div className="contact-wrapper">
            {/* Contact Info Card */}
            <div className="contact-info">
              <div className="info-header">
                <h2>تواصل معنا</h2>
                <p>نحن هنا لمساعدتك والإجابة على استفساراتك</p>
              </div>

              <div className="info-items">
                <div className="info-item">
                  <div className="icon-wrapper">
                    <Phone size={20} className="contact-info-icon" />
                  </div>
                  <div className="info-content">
                    <p className="info-label">رقم الهاتف</p>
                    <p className="info-value">+1 123 456 7890</p>
                  </div>
                </div>

                <div className="info-item">
                  <div className="icon-wrapper">
                    <Mail size={20} className="contact-info-icon" />
                  </div>
                  <div className="info-content">
                    <p className="info-label">البريد الإلكتروني</p>
                    <p className="info-value">Support@uprangly.com</p>
                  </div>
                </div>

                <div className="info-item">
                  <div className="icon-wrapper">
                    <MapPin size={20} className="contact-info-icon" />
                  </div>
                  <div className="info-content">
                    <p className="info-label">العنوان</p>
                    <p className="info-value">New York, USA</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="main-content">
              {/* Tabs */}
              <div className="tabs">
                <nav>
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`tab-button ${
                        activeTab === tab.id ? "active" : ""
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </nav>
              </div>

              {/* Form Content */}
              <div className="form-container">
                <div className="form-header">
                  <h3>
                    {activeTab === "suggestions" && "الإقتراحات"}
                    {activeTab === "complaints" && "الشكاوي"}
                    {activeTab === "ratings" && "التقييمات"}
                  </h3>
                  <p>
                    {activeTab === "suggestions" &&
                      "يسعدنا تلقي اقتراحاتكم لتحسين خدماتنا"}
                    {activeTab === "complaints" &&
                      "نأسف لتجربتك السيئة. يرجى إخبارنا بما حدث لمساعدتك"}
                    {activeTab === "ratings" && "شاركنا تقييمك لتجربتك معنا"}
                  </p>
                </div>
                {renderForm()}
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer></Footer>
    </div>
  );
}

export default ContactUs;
