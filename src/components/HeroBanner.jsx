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

  return (
    <div className="relative h-[85vh] min-h-[600px] w-full overflow-hidden"> 
      {/* increased height from 70vh to 85vh */}
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
            transform: "scale(1.05)", // slight zoom effect for more immersive look
          }}
        />
      ))}
    </div>
  );
}

export default HeroBanner;
