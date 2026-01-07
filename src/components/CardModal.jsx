import { useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';

const CardModal = ({ selectedDogData, handleCloseModal }) => {
  const dialog = useRef();

  useEffect(() => {
    dialog.current.showModal();
  });
  // image hardcoded FORNOW (will be slide show of >1)
  // video (if there is one) will be a buttony link to the youtube vid.
  // a prev and next arrow for viewing the next/prev hound. Will loop. 
  function getAgeInYears(dateStr){
    const date = new Date(dateStr);
    // handle human error
    if(typeof dateStr !== 'string' || isNaN(date)){
      return "Age unknown";
    }
    const yearNow = new Date().getFullYear();
    // regex for year only:
    const regex = /^\d{4}$/;
    if(regex.test(dateStr)){
      return yearNow - Number(dateStr);
    } else {
      const birthYear = date.getFullYear();
      return yearNow - birthYear;
    }
  }
// TERNARY TEXT 
  const catText = selectedDogData.cats === "no" 
  ? "No cats" 
  : selectedDogData.cats === "yes" ? "Cats OK" : "Unknown";
  const pedigreeText = selectedDogData.pedigree === "yes" ? "Greyhound" : "Sighthound mix";

// TERNARY CLASS
const statusClass = selectedDogData.status === "adoption pending" 
? "pending" : (selectedDogData.status === "adopted" || selectedDogData.status === "injured reserve") ? "unavailable" : "available";
  return createPortal(
    <dialog className='modal' ref={dialog} onClose={handleCloseModal}>
      <div className='modal-content'>
        <div className='selected-dog-info'>
          <h2 className='selected-dog-name'>{selectedDogData.name} <span className={`status ${statusClass}`}>{selectedDogData.status}</span></h2>
          <ul className="selected-dog-extra major"> 
            <li className={`selected-dog-sex ${selectedDogData.sex}`}>{selectedDogData.sex[0].toUpperCase()}</li>
            <li className={`selected-dog-${selectedDogData.cats}-cats`}>{catText}</li>
            <li>{selectedDogData.color}</li>
            <li>{getAgeInYears(selectedDogData.whelped)}yrs</li>
            </ul>
          <div className='selected-dog-bio'>{selectedDogData.bio}</div>
          <ul className="selected-dog-extra minor">
            <li className="traits">
              <span className="trait-title">ORIGIN</span>
              <span className="trait">{selectedDogData.originLocation}</span>
            </li>
            <li className="traits">
              <span className="trait-title">PEDIGREE</span>
              <span className="trait">{pedigreeText}</span>
            </li>
            {selectedDogData.pedigree === "yes" &&<li className="traits">
              <span className="trait-title parentage">PARENTAGE</span>
              <span className="pedigree male">Sire: {selectedDogData.sire}</span>
              <span className="pedigree female">Dam: {selectedDogData.dam}</span>
            </li>}


          </ul>
          <a className="selected-dog-video-link" href={selectedDogData.media.videoUrl} target="_blank" rel="noreferrer"
>Check out my video</a>
        </div>
        <div className='selected-dog-media'>
          <div className="image-container">
            <img src={selectedDogData.media.imageGallery[0]} alt='HANDLE ME' />
          </div>
          
        </div>
      </div>
      <button className="close-modal-btn" onClick={handleCloseModal}>X</button>
    </dialog>,
    document.getElementById('modal')
  );
};

export default CardModal;

/**
 * IDEA ZONE
 * https://dribbble.com/shots/5277735-Dogs-Adoption-Landing-Page for colour
 * https://dribbble.com/shots/4411022-Dog-adoption-Concept for text part and arrows
 */
