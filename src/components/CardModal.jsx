
import { useRef, useEffect} from 'react';
import { createPortal } from 'react-dom';

const CardModal = ({ selectedDogData,  handleCloseModal}, ref) => {
  const dialog = useRef();

  useEffect(() => {
    dialog.current.showModal()
  })

  return createPortal(
    <dialog className="selected-dog-modal" ref={dialog} onClose={handleCloseModal}>
      <div>
        <h2>{selectedDogData.name}</h2>
        <div>Lots of stuff</div>
        <button onClick={handleCloseModal}>Close</button>
      </div>
    </dialog>,
    document.getElementById('modal')
  )
  
};

export default CardModal;
