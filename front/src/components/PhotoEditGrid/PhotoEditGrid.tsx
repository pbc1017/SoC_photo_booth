import React from 'react';
import { PhotoEmpty } from "../PhotoEmpty";
import "./index.css";

interface PhotoEditGridProps {
  setCompressedImages: React.Dispatch<React.SetStateAction<string[]>>;
  numPhoto: number;
}

export const PhotoEditGrid: React.FC<PhotoEditGridProps> = ({ setCompressedImages, numPhoto }) => {
  const wib = numPhoto === 2 || numPhoto === 6 ;
  const handleCompressImage = async (index: number, compressedImage: string) => {
    setCompressedImages(prevCompressedImages => {
      const newCompressedImages = [...prevCompressedImages];
      newCompressedImages[index] = compressedImage;
      return newCompressedImages;
    });
  };
 
  const photoList = Array.from({ length: numPhoto }, (_, index) => (
    <div key={index}  className={`rectangle-${numPhoto}-${index+1}`}>
      <PhotoEmpty widthIsBigger={wib} index={index} onCompressImage={handleCompressImage} />
    </div>
  ));
  //<div className='items'><PhotoEmpty widthIsBigger={true}></PhotoEmpty></div>
  
  return(
    <div className='container'>
      {photoList}
    </div>
  );

};

export default PhotoEditGrid;