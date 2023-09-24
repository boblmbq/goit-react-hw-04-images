import React, { useState } from 'react';
import { Img, Li } from './ImageGalleryItem.styled';
import Modal from 'components/Modal';

const ImageGalleryItem = ({ tags, webformatURL, largeImageURL }) => {
  const [openModal, setOpenModal] = useState(false);

  const onImgClick = () => {
    setOpenModal(prev => !prev);
  };

  return (
    <>
      <Li className="gallery-item">
        <Img
          src={webformatURL}
          alt={tags}
          onClick={() => onImgClick(largeImageURL, tags)}
        />
        {openModal && (
          <Modal img={largeImageURL} alt={tags} onLeave={onImgClick} />
        )}
      </Li>
    </>
  );
};

export default ImageGalleryItem;
