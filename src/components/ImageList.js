import React from 'react';
import ImageUploader from './ImageUploader';

const ImageList = () => {
  return (
    <div style={{marginTop:'10px', textAlign: "center"}}>
      <h1>Upload your Image </h1>
      <ImageUploader/>
    </div>
  );
};

export default ImageList;