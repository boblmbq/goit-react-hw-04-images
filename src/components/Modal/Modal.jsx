import { useCallback, useEffect } from 'react';
import { Overlay, ImgWrapper } from './Modal.styled';
import { createPortal } from 'react-dom';
const rootModal = document.querySelector('#modal');

const Modal = ({ img, alt, onLeave }) => {
  const closeModal = useCallback(
    e => {
      if (e.code === 'Escape' || e.currentTarget === e.target) {
        onLeave();
      }
    },
    [onLeave]
  );

  useEffect(() => {
    window.addEventListener('keyup', closeModal);
    return () => {
      window.removeEventListener('keyup', closeModal);
    };
  }, [closeModal]);

  return createPortal(
    <Overlay onClick={closeModal} className="overlay">
      <ImgWrapper className="modal">
        <img src={img} alt={alt} />
      </ImgWrapper>
    </Overlay>,
    rootModal
  );
};

export default Modal;
