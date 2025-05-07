import React, { useState, useEffect } from 'react';
import './Sector.css';

// Type definition for sector data
export type SectorType = {
    id: string;
    title: string;
    icon: string;
    description: string;
    detailText: string;
};

// Sample sector data
const defaultSectors: SectorType[] = [
    {
        id: "academic",
        title: "القطاع الأكاديمي",
        icon: "academic",
        description: "برامج البكالوريوس والدراسات العليا المعتمدة",
        detailText: "يشمل القطاع الأكاديمي جميع البرامج التعليمية من مرحلة البكالوريوس إلى الدراسات العليا، ويوفر للطلاب فرصة الحصول على شهادات معترف بها دوليًا في مجالات متنوعة مثل الهندسة والطب والعلوم والآداب. كما يتضمن برامج تبادل الطلاب مع الجامعات العالمية ومنح دراسية للطلاب المتفوقين."
    },
    {
        id: "research",
        title: "قطاع البحوث",
        icon: "research",
        description: "مراكز البحث العلمي والتطوير التكنولوجي",
        detailText: "يضم قطاع البحوث مجموعة من المعامل المتطورة ومراكز البحث العلمي التي تعمل على تطوير الابتكارات في مختلف المجالات العلمية والتكنولوجية. يتم تمويل المشاريع البحثية من خلال شراكات مع القطاع الخاص والمنح الحكومية والدولية، ويشارك الطلاب والباحثون في نشر الأبحاث في المجلات العلمية المرموقة."
    },
    {
        id: "medical",
        title: "القطاع الطبي",
        icon: "medical",
        description: "كليات الطب والمستشفيات التعليمية",
        detailText: "يتكون القطاع الطبي من كليات الطب والصيدلة والأسنان والتمريض، بالإضافة إلى المستشفيات التعليمية التي توفر الرعاية الصحية للمجتمع وفرص التدريب العملي للطلاب. يتم تجهيز المرافق الطبية بأحدث التقنيات والمعدات الطبية لضمان جودة الخدمات العلاجية والتعليمية."
    },
    {
        id: "technical",
        title: "القطاع التقني",
        icon: "technical",
        description: "مختبرات الحاسوب والتعليم الإلكتروني",
        detailText: "يهتم القطاع التقني بتوفير بنية تحتية تكنولوجية حديثة تدعم العملية التعليمية والبحثية، بما في ذلك مختبرات الحاسوب ومنصات التعليم الإلكتروني وخدمات الإنترنت عالية السرعة. كما يقدم دورات تدريبية في مجالات البرمجة والذكاء الاصطناعي وتحليل البيانات لتأهيل الطلاب لسوق العمل."
    }
];

// Icon rendering function
const renderIcon = (iconName: string) => {
    switch (iconName) {
        case 'academic':
            return (
                <svg className="sector-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 3L1 9L12 15L21 10.09V17H23V9M5 13.18V17.18L12 21L19 17.18V13.18L12 17L5 13.18Z" fill="currentColor" />
                </svg>
            );
        case 'research':
            return (
                <svg className="sector-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M18 4H16V2H18V4ZM12 18C8.69 18 6 15.31 6 12C6 8.69 8.69 6 12 6C15.31 6 18 8.69 18 12C18 15.31 15.31 18 12 18ZM12 8C9.79 8 8 9.79 8 12C8 14.21 9.79 16 12 16C14.21 16 16 14.21 16 12C16 9.79 14.21 8 12 8ZM18 16H16V22H18V16Z" fill="currentColor" />
                </svg>
            );
        case 'medical':
            return (
                <svg className="sector-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M19 3H5C3.89 3 3 3.89 3 5V19C3 20.11 3.89 21 5 21H19C20.11 21 21 20.11 21 19V5C21 3.89 20.11 3 19 3ZM18 14H14V18H10V14H6V10H10V6H14V10H18V14Z" fill="currentColor" />
                </svg>
            );
        case 'technical':
            return (
                <svg className="sector-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4 2H20C21.1 2 22 2.9 22 4V16C22 17.1 21.1 18 20 18H16L12 22L8 18H4C2.9 18 2 2.9 2 16V4C2 2.9 2.9 2 4 2ZM4 4V16H8.83L12 19.17L15.17 16H20V4H4Z" fill="currentColor" />
                </svg>
            );
        default:
            return (
                <svg className="sector-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 3L1 9L12 15L21 10.09V17H23V9M5 13.18V17.18L12 21L19 17.18V13.18L12 17L5 13.18Z" fill="currentColor" />
                </svg>
            );
    }
};

// Props interface for the Sector component
interface SectorProps {
    backgroundImageUrl?: string;
    customSectors?: SectorType[];
    classificationTitle?: string;
    classificationText?: string;
    titleText?: string;
    titleCount?: string;
    descriptionText?: string;
    noteText?: string;
    footerText?: string;
}

const Sector: React.FC<SectorProps> = ({
    backgroundImageUrl = '/lovable-uploads/adbacd39-be45-44c5-9a13-fd7441d62670.png',
    customSectors = defaultSectors,
    classificationTitle = "التصنيف الدولي",
    classificationText = "تُصنف الجامعة من بين أفضل المؤسسات التعليمية في العالم، إذ تحتل المرتبة 150 في تصنيف شنغهاي العالمي للجامعات، والمرتبة 120 في تصنيف التايمز للتعليم العالي، كما تتبوأ مكانة متقدمة في تصنيفات QS للجامعات العالمية.",
    titleText = "ثلاث و عشرون كلية و معهد",
    titleCount = "+20",
    descriptionText = "تتكون الجامعة من أكثر من 20 كلية ومعهدًا متخصصًا في مختلف المجالات العلمية والإنسانية، وتضم أقسامًا رائدة في الهندسة والطب والعلوم والآداب. تقدم الجامعة أكثر من 100 برنامج دراسي للبكالوريوس والدراسات العليا، مع تركيز خاص على البرامج البينية متعددة التخصصات. تحظى الجامعة بالاعتراف الإقليمي والدولي للتميز الأكاديمي، وتتميز بعلاقات تعاون قوية مع الجامعات العالمية المرموقة.",
    noteText = "تخرج من الجامعة منذ تأسيسها أكثر من 50 ألف خريج، من بينهم العديد من القادة والعلماء والمفكرين. معدل التوظيف للخريجين يصل إلى 90٪ خلال العام الأول بعد التخرج - وفقًا لإحصاءات عام 2023.",
    footerText = "© 2023 - جميع الحقوق محفوظة"
}) => {
    const [mounted, setMounted] = useState(false);
    const [expandedSector, setExpandedSector] = useState<string | null>(null);

    useEffect(() => {
        setMounted(true);
    }, []);

    const toggleSector = (sectorId: string) => {
        if (expandedSector === sectorId) {
            setExpandedSector(null);
        } else {
            setExpandedSector(sectorId);
        }
    };

    return (
        <div className="page-container">
            {/* شريط التنقل العلوي */}
            <nav className="nav-bar">
                <div className="nav-container">
                    <div className="nav-logo"></div>
                    <div className="nav-links">
                        <a href="#" className="nav-link">الرئيسية</a>
                        <a href="#" className="nav-link">الكليات</a>
                        <a href="#" className="nav-link">البحث العلمي</a>
                        <a href="#" className="nav-link">القبول والتسجيل</a>
                    </div>
                    <div className="nav-actions">
                        <button className="nav-icon-button">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </button>
                        <button className="nav-icon-button hamburger-button">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </button>
                    </div>
                </div>
            </nav>

            {/* قسم الهيرو مع صورة والتصنيف الدولي */}
            <div className={`section-transition ${mounted ? 'section-visible' : 'section-hidden'}`}>
                <div className="hero-container">
                    {/* صورة الهيرو مع تأثير التكبير */}
                    <div
                        className="hero-image"
                        style={{
                            backgroundImage: `url(${backgroundImageUrl})`
                        }}
                    ></div>

                    {/* طبقة تغميق لتحسين رؤية النص */}
                    <div className="hero-overlay"></div>

                    {/* مربع التصنيف الدولي مع تحريك */}
                    <div className="classification-box">
                        <h2 className="classification-title">{classificationTitle}</h2>
                        <p className="classification-text">{classificationText}</p>
                    </div>
                </div>
            </div>

            {/* قسم العنوان مع العدد والوصف */}
            <div className={`section-transition delay-100 ${mounted ? 'section-visible' : 'section-hidden'}`}>
                <div className="title-container">
                    {/* العنوان والعدد مع تأثيرات حركية */}
                    <div className="title-header">
                        <h2 className="title-text">{titleText}</h2>
                        <div className="title-count">{titleCount}</div>
                    </div>

                    {/* الوصف مع تأثير حركي */}
                    <p className="title-description">{descriptionText}</p>

                    {/* ملاحظة صغيرة مع تأثير حركي */}
                    <p className="title-note">{noteText}</p>
                </div>
            </div>

            {/* قسم القطاعات */}
            <section className="sectors-container">
                {/* لجميع الشاشات، نريد عرض القطاعات بشكل رأسي */}
                <div className="sectors-list">
                    {customSectors.map((sector, index) => (
                        <div
                            key={sector.id}
                            className={`sector-item ${mounted ? 'visible' : ''}`}
                            style={{ transitionDelay: `${(index + 2) * 100}ms` }}
                        >
                            <div className="sector-panel">
                                <div
                                    className={`sector-header ${expandedSector === sector.id ? 'expanded' : ''}`}
                                    onClick={() => toggleSector(sector.id)}
                                >
                                    <div className="sector-content">
                                        <div className={`sector-icon-wrapper ${expandedSector === sector.id ? 'expanded' : ''}`}>
                                            {renderIcon(sector.icon)}
                                        </div>
                                        <h3 className="sector-title">{sector.title}</h3>
                                        <p className="sector-description">{sector.description}</p>
                                        <div className={`sector-chevron ${expandedSector === sector.id ? 'expanded' : ''}`}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                <polyline points="6 9 12 15 18 9"></polyline>
                                            </svg>
                                        </div>
                                    </div>
                                </div>

                                {/* المحتوى القابل للتوسيع مع تحسين التحريكات */}
                                <div className={`sector-expandable ${expandedSector === sector.id ? 'expanded' : ''}`}>
                                    <div className={`sector-expandable-content ${expandedSector === sector.id ? 'expanded' : ''}`}>
                                        <p className="sector-detail-text">{sector.detailText}</p>
                                        <button className="sector-more-button">
                                            المزيد من المعلومات
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* تذييل الصفحة */}
            <footer className="footer">
                <div className="footer-container">
                    <div className="footer-content">
                        <p className="footer-text">{footerText}</p>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Sector;
