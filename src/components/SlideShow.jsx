import { useState } from 'react';

const SlideShow = ({ images,dotsOnHorizontal, color }) => {
  const [currIdx, setCurrIdx] = useState(0);

  function handlePrevImage() {
    setCurrIdx((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  }
  function handleNextImage() {
    setCurrIdx((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  }
  
  function goToImage(idx) {
    setCurrIdx(idx);
  }
// to do. change the arrow from css to icon or image for a11y
  return (
    <div className='slideshow-container'>
      <div className='image-container'>
        <button onClick={handlePrevImage} className={`nav-btn prev ${dotsOnHorizontal ? "hideOnHorizontal" : ''}` } aria-label="Previous image"></button>
        <img src={images[currIdx]} alt={`a ${color} greyhound`} />
        <button onClick={handleNextImage} className={`nav-btn next ${dotsOnHorizontal ? "hideOnHorizontal" : ''}`} aria-label="Next image"></button>
      </div>
      <div className={`nav-dots-container ${dotsOnHorizontal ? "showOnHorizontal" : ''}`}>
        {images.map((img, idx) => (
          <button
            onClick={() => goToImage(idx)}
            key={idx}
            className={`nav-dot ${idx === currIdx ? 'active' : ''}`}
          ></button>
        ))}
      </div>
    </div>
  );
};

export default SlideShow;
