import React from 'react'
import './carousel.css';
import AwesomeSlider from 'react-awesome-slider';
import 'react-awesome-slider/dist/styles.css';
import img1 from "../../Global/images/internaute/1.png" 
import img2 from "../../Global/images/internaute/2.png" 
import img3 from "../../Global/images/internaute/3.png" 


export default function NavCarousel() {
    return (
        <div className="carousel">
            <AwesomeSlider>
               <div data-src={img1} />
               <div data-src={img2} />
               <div data-src={img3} />
            </AwesomeSlider>
        </div>
    )
}
