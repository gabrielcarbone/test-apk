import React, { useState, useRef, useEffect, type ReactNode } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import './Carousel.css';

interface CarouselProps {
  children: ReactNode[];
  className?: string;
  showNavigation?: boolean;
  showIndicators?: boolean;
  maxIndicators?: number;
  forceHideNavigation?: boolean;
  forceHideIndicators?: boolean;
}

const Carousel: React.FC<CarouselProps> = ({
  children,
  className = '',
  showNavigation = true,
  showIndicators = true,
  maxIndicators = 5,
  forceHideNavigation = false,
  forceHideIndicators = false
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);

  const scrollToIndex = (index: number) => {
    if (carouselRef.current && children.length > 0) {
      const cardWidth = 336; // 320px + 16px gap
      carouselRef.current.scrollTo({
        left: cardWidth * index,
        behavior: 'smooth'
      });
      setCurrentIndex(index);
    }
  };

  const handlePrevious = () => {
    const newIndex = currentIndex > 0 ? currentIndex - 1 : children.length - 1;
    scrollToIndex(newIndex);
  };

  const handleNext = () => {
    const newIndex = currentIndex < children.length - 1 ? currentIndex + 1 : 0;
    scrollToIndex(newIndex);
  };

  const handleScroll = () => {
    if (carouselRef.current && children.length > 0) {
      const cardWidth = 336;
      const scrollLeft = carouselRef.current.scrollLeft;
      const newIndex = Math.round(scrollLeft / cardWidth);
      setCurrentIndex(newIndex);
    }
  };

  // Reset currentIndex cuando cambian los children
  useEffect(() => {
    if (currentIndex >= children.length && children.length > 0) {
      setCurrentIndex(0);
    }
  }, [children.length, currentIndex]);

  if (children.length === 0) {
    return null;
  }

  return (
    <div className={`carousel ${className}`}>
      <div className="carousel-wrapper">
        <div 
          ref={carouselRef}
          className={children.length === 1 ? "carousel-single" : "carousel-container"}
          onScroll={handleScroll}
        >
          {children.map((child, index) => (
            <div key={index} className="carousel-card-wrapper">
              {child}
            </div>
          ))}
        </div>

        {showNavigation && children.length > 1 && !forceHideNavigation && (
          <>
            <button className="carousel-nav-btn carousel-nav-prev" onClick={handlePrevious}>
              <ChevronLeft size={20} />
            </button>
            <button className="carousel-nav-btn carousel-nav-next" onClick={handleNext}>
              <ChevronRight size={20} />
            </button>
          </>
        )}
      </div>

      {showIndicators && children.length > 1 && !forceHideIndicators && (
        <div className="carousel-indicators">
          {Array.from({ length: Math.min(maxIndicators, children.length) }, (_, index) => {
            const dotIndex = Math.floor((currentIndex / children.length) * Math.min(maxIndicators, children.length));
            return (
              <button
                key={index}
                className={`carousel-dot ${index === dotIndex ? 'active' : ''}`}
                onClick={() => scrollToIndex(Math.floor((index / Math.min(maxIndicators, children.length)) * children.length))}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Carousel;