import React from "react";
import styles from './css/Gallery.module.css';

const xButton = (props) => {
  console.log(props);
 return (
  <img
    className={props.className}
    onClick={props.click}
    src='https://sb-gallery1.s3-us-west-1.amazonaws.com/cancel.svg'
    height={30} width={30}
  />
 );
}

export default xButton;