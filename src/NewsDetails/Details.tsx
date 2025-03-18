import React from "react";
import "./Details.css";
import SectionOne from "./SectionOne/SectionOne.tsx";
import Header from "../HomePage/Header/Header";
import Footer from "../HomePage/Footer/Footer";
function Details(props) {
    return (
    <div>
        <Header/>
        <SectionOne title={props.title} description={props.description} date={props.date}/>
        <Footer />
    </div>
);
    
}
export default Details;