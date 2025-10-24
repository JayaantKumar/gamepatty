import React, { useState, useEffect } from "react";

const heroImages = [
  "https://assets.nintendo.com/image/upload/ar_16:9,c_lpad,w_930/b_white/f_auto/q_auto/store/software/switch/70010000094158/a022cbeb7960a3ef9cf3cd1d828c3b990a940efa89ce48d09c671297218d6685",
  "https://assets.nintendo.com/image/upload/ar_16:9,c_lpad,w_930/b_white/f_auto/q_auto/store/software/switch/70010000096768/4680935f27bf5b08a5cca25268afca277c7b0f02ff1ccc89e0c86e5be5296c3c",
];

function HeroBanner() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? heroImages.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % heroImages.length);
  };

  return (
    <div className="relative h-[40vh] sm:h-[50vh] md:h-[65vh] lg:h-[85vh] min-h-[300px] sm:min-h-[400px] md:min-h-[500px] lg:min-h-[600px] w-full overflow-hidden">
      {/* Image Slides */}
      {heroImages.map((src, index) => (
        <img
          key={src}
          src={src}
          alt={`Hero banner slide ${index + 1}`}
          loading="lazy"
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${
            currentIndex === index ? "opacity-100" : "opacity-0"
          }`}
          style={{
            transform: "scale(1.05)",
          }}
        />
      ))}

      {/* Gradient Overlay for better text/button visibility */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30"></div>

      {/* Navigation Arrows - Hidden on small mobile */}
      <button
        onClick={goToPrevious}
        className="hidden sm:flex absolute left-2 md:left-4 lg:left-8 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 md:p-3 lg:p-4 rounded-full transition-all z-10 items-center justify-center"
        aria-label="Previous slide"
      >
        <svg className="w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <button
        onClick={goToNext}
        className="hidden sm:flex absolute right-2 md:right-4 lg:right-8 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 md:p-3 lg:p-4 rounded-full transition-all z-10 items-center justify-center"
        aria-label="Next slide"
      >
        <svg className="w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Dot Indicators */}
      <div className="absolute bottom-4 md:bottom-6 lg:bottom-8 left-1/2 -translate-x-1/2 flex gap-2 md:gap-3 z-10">
        {heroImages.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-2 h-2 md:w-3 md:h-3 rounded-full transition-all duration-300 ${
              currentIndex === index
                ? "bg-white w-6 md:w-8"
                : "bg-white/50 hover:bg-white/75"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Optional: Touch swipe indicators for mobile */}
      <div className="sm:hidden absolute bottom-16 left-1/2 -translate-x-1/2 flex items-center gap-2 text-white/70 text-xs">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
        </svg>
        <span>Swipe</span>
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
        </svg>
      </div>
    </div>
  );
}

export default HeroBanner;