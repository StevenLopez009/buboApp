import { useState, useEffect } from "react";
import "./Carousel.css"; 

import Logo from "../../assets/img1.png";
import carrusel2 from "../../assets/img2.png";
import carrusel3 from "../../assets/img3.png";
import carrusel4 from "../../assets/img4.png";
import carrusel5 from "../../assets/img5.png";

const Carousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [Logo, carrusel2, carrusel3, carrusel4, carrusel5];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [slides.length]);

  const goToSlide = (index: any) => {
    setCurrentSlide(index);
  };

  return (
    <div className="carousel">
      <div className="carousel__image-container">
        <img
          src={slides[currentSlide]}
          alt={`Slide ${currentSlide + 1}`}
          className="carousel__image"
        />
      </div>

      <div className="carousel__dots">
        {slides.map((_, index) => (
          <span
            key={index}
            className={`carousel__dot ${
              index === currentSlide ? "carousel__dot--active" : ""
            }`}
            onClick={() => goToSlide(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;
