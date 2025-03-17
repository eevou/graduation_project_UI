import React from "react";
import "./Details.css";
import SectionOne from "./SectionOne/SectionOne.tsx";
import SectionTow from "./SectionTow/SectionTow.tsx";
import Header from "../HomePage/Header/Header";
import Footer from "../HomePage/Footer/Footer";
function Details() {
    return (
    <div>
        <Header/>
        <SectionOne />
        <SectionTow />
        <Footer />
    </div>
);
    
}
export default Details;