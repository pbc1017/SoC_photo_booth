import React from 'react';
import { PhotoEmpty } from 'components/PhotoEmpty';
import "./style.css"

interface SelectPhotoProps {
  SelectOption: number;
}

export const SelectPhoto: React.FC<SelectPhotoProps> = ({ SelectOption }) => {
  let photoEmptyClass = '';
  const getPhotoEmptyCount = () => {
    switch (SelectOption) {
      case 0:
        photoEmptyClass = 'one-photo';
        return 1;
      case 1:
        photoEmptyClass = 'two-photos';
        return 2;
      case 2:
        photoEmptyClass = 'four-photos';
        return 4;
      case 3:
        photoEmptyClass = 'six-photos';
        return 6;
      default:
        return 0;
    }
  };
  
  const photoEmptyCount = getPhotoEmptyCount();
  const widthIsBigger = SelectOption % 2 == 1;

  return (
    <div className="options">
      <div className={`SelectPhoto ${photoEmptyClass}`}>
      {Array.from({ length: photoEmptyCount }).map((_, index) => (
        <PhotoEmpty
        key={index}
        className={photoEmptyClass}
        widthIsBigger={widthIsBigger}
        index={index}
      />
      ))}
      </div>
    </div>
  );
};