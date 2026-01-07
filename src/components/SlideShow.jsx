import { useState } from 'react';

const SlideShow = ({ images, color }) => {
  const [currIdx, setCurrIdx] = useState(0);

  function handlePrevImage() {
    setCurrIdx((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  }
  function handleNextImage() {
    setCurrIdx((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  }
  // dots go to the current on click. map over and on click go to image[idx]
  // another option, so create a demo button for header and pass that on down.

  return (
    <div className='image-container'>
      <button onClick={handlePrevImage} className='nav-btn prev'></button>
      <img src={images[currIdx]} alt={`a ${color} greyhound`} />
      <button onClick={handleNextImage} className='nav-btn next'></button>
    </div>
  );
};

export default SlideShow;
