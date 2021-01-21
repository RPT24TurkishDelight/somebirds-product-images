import React, { useState, useEffect }from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';
import ImageBox from './ImageBox.jsx';
import Chevron from './chevron.jsx';
import xButton from './xButton.jsx';
import styles from './css/Gallery.module.css';
const axios = require('axios');

const Gallery = (props) => {

  const [images, setImages] = useState([]);
  const [render, setRender] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [index, setIndex] = useState(null);

  useEffect(() => {
    let shoeId = props.modelId
    axios.get(`/products/${shoeId}/gallery`)
      .then((images) => {
        setImages(images.data);
        setRender(true);
      })
      .catch((err) => {
        setErrorMessage('Unable to retrieve images');
      });
  }, [])

  const buildImageComponents = (imageUrls) => {
    return imageUrls.map((image, i)=> {
      return <ImageBox url={image} location={i} click={openModal}/>
    });
  }
  /////////// modal settings and functions ///////////
  const customStyles = {
    content : {
      top                   : '50%',
      left                  : '50%',
      right                 : 'auto',
      bottom                : 'auto',
      marginRight           : '-50%',
      transform             : 'translate(-50%, -50%)'
    }
  };

  var subtitle;
  const [modalIsOpen,setIsOpen] = React.useState(false);

  function openModal(index) {
    setIsOpen(true);
    setIndex(index);
  }

  function changeImage(direction) {
    if (direction === 'left') {
      if (index === 0) {
        setIndex(images.length - 1)
      } else {
        setIndex(index - 1);
      }
    } else {
      setIndex((index + 1) % images.length)
    }
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = '#f00';
  }

  function closeModal(){
    setIsOpen(false);
  }
  /////////// end of modal s/f ///////////
  return (
    <div className={styles.wrapper}>
      {render && buildImageComponents(images)}
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >

        <h2 ref={_subtitle => (subtitle = _subtitle)}></h2>
        <div className={styles.modal}>
          <img
            className={styles.closeModal}
            onClick={closeModal}
            src='https://sb-gallery1.s3-us-west-1.amazonaws.com/cancel.svg'
            height={30} width={30}
          />
          {/* <xButton className={styles.closeModal} click={closeModal}/> */}
          <Chevron className={`${styles.chevron} ${styles.goRight}`} click={() => changeImage('right')} height={30} width={30}/>
          <Chevron className={`${styles.chevron} ${styles.goLeft}`} click={() => changeImage('left')} height={30} width={30}/>
          <img className={styles.modalImage} src={images[index]} height={1000} width={1000}/>
        </div>
        </Modal>
    </div>
  )
}

export default Gallery