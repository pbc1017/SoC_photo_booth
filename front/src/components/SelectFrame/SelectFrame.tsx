import React, {useState} from 'react';
import { PhotoEmpty } from 'components/PhotoEmpty';
import frame1 from "assets/images/frame_image_1.jpeg";
import frame2 from "assets/images/frame_image_2.jpg";
import frame3 from "assets/images/frame_image_3.jpeg";
import frame4 from "assets/images/frame_image_4.jpeg";
import "./style.css"

interface SelectFrameProps {
  photoOption: number;
  compressedImages: string[];
  selectedFrameOption: number;
  setSelectedFrameOption: React.Dispatch<React.SetStateAction<number>>
}

export const SelectFrame: React.FC<SelectFrameProps> = ({ photoOption,compressedImages,selectedFrameOption,setSelectedFrameOption }) => {
  const getPhotoEmptyCount = () => {
    switch (photoOption) {
      case 0:
        return 1;
      case 1:
        return 2;
      case 2:
        return 4;
      case 3:
        return 6;
      default:
        return 0;
    }
  };
  
  const numPhoto = getPhotoEmptyCount();
  const photoList = Array.from({ length: numPhoto }, (_, index) => (
    <img key={index}  className={`PhotoEmpty-${numPhoto}-${index}`} src={compressedImages[index]}/>
  ));

  const frameArray = [frame1,frame2,frame3,frame4]

  return (
    <div className="options">
      <div className='photos'>
        <img className="photo-frame" src={frameArray[selectedFrameOption]}/>
        {photoList}
      </div>
      <div className="frame-buttons">
        {Array.from({ length: 4 }, (_, index) => (
          <button
            key={index}
            onClick={() => setSelectedFrameOption(index)}
            style={{ outline: selectedFrameOption === index ? '2px solid black' : 'none' }} // 현재 선택된 버튼만 윤곽선을 검정색으로 설정
          >
            Option {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};