import React from 'react';
import { PhotoEmpty } from 'components/PhotoEmpty';
import "./style.css"

interface SelectPhotoProps {
  SelectOption: number;
  setCompressedImages: React.Dispatch<React.SetStateAction<string[]>>;
}

export const SelectPhoto: React.FC<SelectPhotoProps> = ({ SelectOption,setCompressedImages }) => {
  let photoEmptyClass = '';
  const getPhotoEmptyCount = () => {
    switch (SelectOption) {
      case 0:
        photoEmptyClass = '1';
        return 1;
      case 1:
        photoEmptyClass = '2';
        return 2;
      case 2:
        photoEmptyClass = '4';
        return 4;
      case 3:
        photoEmptyClass = '6';
        return 6;
      default:
        return 0;
    }
  };
  
  const photoEmptyCount = getPhotoEmptyCount();
  const widthIsBigger = SelectOption % 2 == 1;
  const handleCompressImage = async (index: number, compressedImage: string) => {
    setCompressedImages(prevCompressedImages => {
      const newCompressedImages = [...prevCompressedImages];
      newCompressedImages[index] = compressedImage;
      return newCompressedImages;
    });
  };
  return (
    <div className="options">
      {Array.from({ length: photoEmptyCount }).map((_, index) => (
        <PhotoEmpty
        key={index}
        className={photoEmptyClass}
        widthIsBigger={widthIsBigger}
        index={index}
        onCompressImage={handleCompressImage}
      />
      ))}
    </div>
  );
};