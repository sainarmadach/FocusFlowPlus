import React, { useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import Download from "yet-another-react-lightbox/plugins/download";
import "yet-another-react-lightbox/styles.css";

// Import your 15 motivational images from src/assets
import img1 from "../assets/Image 1.png";
import img2 from "../assets/Image 2.png";
import img3 from "../assets/Image 3.png";
import img4 from "../assets/Image 4.png";
import img5 from "../assets/Image 5.png";
import img6 from "../assets/Image 6.png";
import img7 from "../assets/Image 7.png";
import img8 from "../assets/Image 8.png";
import img9 from "../assets/Image 9.png";
import img10 from "../assets/Image 10.png";
import img11 from "../assets/Image 11.png";
import img12 from "../assets/Image 12.png";
import img13 from "../assets/Image 13.png";
import img14 from "../assets/Image 14.png";
import img15 from "../assets/Image 15.png";

const imageList = [
  img1,
  img2,
  img3,
  img4,
  img5,
  img6,
  img7,
  img8,
  img9,
  img10,
  img11,
  img12,
  img13,
  img14,
  img15,
];

const MotivationGallery = () => {
  const [index, setIndex] = useState(-1);

  const slides = imageList.map((img) => ({
    src: img,
  }));

  return (
    <div>
      <h2 className="text-2xl font-bold text-center mb-6">
        🖼️ Motivation Gallery
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {slides.map((slide, i) => (
          <div
            key={i}
            className="bg-black rounded-md overflow-hidden shadow-lg flex items-center justify-center aspect-video cursor-pointer"
            onClick={() => setIndex(i)}
          >
            <img
              src={slide.src}
              alt={`Motivational Image ${i + 1}`}
              className="w-full h-full object-contain hover:scale-105 transition-transform duration-300"
            />
          </div>
        ))}
      </div>

      <Lightbox
        open={index >= 0}
        close={() => setIndex(-1)}
        index={index}
        slides={slides}
        plugins={[Download]}
      />
    </div>
  );
};

export default MotivationGallery;
