import { useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';

import {getAgeInYears, getStatusClass} from '../helpers';
import SlideShow from './SlideShow';
const CardModal = ({ selectedDogData, dotsOnHorizontal, handleCloseModal }) => {
  const dialog = useRef();

  useEffect(() => {
    dialog.current.showModal();
  }, []);

function handleCloseOnOffClick(e) {
  if(e.target === dialog.current) {
    handleCloseModal()
  }
}
  
// TERNARY TEXT 
  const catText = selectedDogData.cats === "no" 
  ? "No cats" 
  : selectedDogData.cats === "yes" ? "Cats OK" : "Cats unknown";
  const pedigreeText = selectedDogData.pedigree === "yes" ? "Greyhound" : "Sighthound mix";

  const statusClass = getStatusClass(selectedDogData.status);

  return createPortal(
    <dialog className='modal' ref={dialog} onClose={handleCloseModal} onClick={handleCloseOnOffClick}>
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
              <span className="pedigree male">Sire: {selectedDogData.sire}</span>
              <span className="pedigree female">Dam: {selectedDogData.dam}</span>
            </li>}
          </ul>
          {selectedDogData.media.videoUrl && <a className="selected-dog-video-link" href={selectedDogData.media.videoUrl} target="_blank" rel="noreferrer"
>Check out my video</a>}
        </div>
        <div className='selected-dog-media'>
          {selectedDogData.media.imageGallery.length > 1 
          ? <SlideShow images={selectedDogData.media.imageGallery} color={selectedDogData.color} dotsOnHorizontal={dotsOnHorizontal}/>
          :<img src={selectedDogData.media.imageGallery[0]} alt={`a ${selectedDogData.color} greyhound`} />
          }
        </div>
      </div>
      <button className="close-modal-btn" onClick={handleCloseModal} aria-label="Close modal">X</button>
    </dialog>,
    document.getElementById('modal')
  );
};

export default CardModal;
