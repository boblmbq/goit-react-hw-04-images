import {  useEffect } from 'react';
import { Overlay, ImgWrapper } from './Modal.styled';
import { createPortal } from 'react-dom';
const rootModal = document.querySelector('#modal');

const Modal = ({ img, alt, onLeave }) => {
 

  useEffect(() => {
    function ifEscape(e) {
      if (e.code === 'Escape') onLeave();
    }
    window.addEventListener('keyup', ifEscape);
    return () => {
      window.removeEventListener('keyup', ifEscape);
    };
  }, [onLeave]);

   function ifOverlayClick(e) {
     if (e.currentTarget === e.target) onLeave();
   }

  return createPortal(
    <Overlay onClick={ifOverlayClick} className="overlay">
      <ImgWrapper className="modal">
        <img src={img} alt={alt} />
      </ImgWrapper>
    </Overlay>,
    rootModal
  );
};

export default Modal;
