import React, { useState } from "react";
import frame1 from "assets/images/frame_image_1.png";
import frame2 from "assets/images/frame_image_2.png";
import frame3 from "assets/images/frame_image_3.png";
import frame4 from "assets/images/frame_image_4.png";
import cover1 from "assets/images/frame_cover_1.png";
import cover2 from "assets/images/frame_cover_2.png";
import cover3 from "assets/images/frame_cover_3.png";
import cover4 from "assets/images/frame_cover_4.png";
import button1 from "assets/images/frame_button_1.png";
import button2 from "assets/images/frame_button_2.png";
import button3 from "assets/images/frame_button_3.png";
import button4 from "assets/images/frame_button_4.png";
import "./style.css";

interface SelectFrameProps {
  photoOption: number;
  compressedImages: string[];
  selectedFrameOption: number;
  setSelectedFrameOption: React.Dispatch<React.SetStateAction<number>>;
}

export const SelectFrame: React.FC<SelectFrameProps> = ({
  photoOption,
  compressedImages,
  selectedFrameOption,
  setSelectedFrameOption,
}) => {
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
    <img
      key={index}
      className={`Photo-${numPhoto}-${index}`}
      src={compressedImages[index]}
    />
  ));

  const frameArray = [frame1, frame2, frame3, frame4];
  const coverArray = [cover1, cover2, cover3, cover4];
  const buttonArray = [button1, button2, button3, button4];

  return (
    <div className="options">
      <div className="photosOut" />
      <div className="photos">
        <img className="photo-frame" src={frameArray[selectedFrameOption]} />
        {photoList}
        <img className="photo-frame" src={coverArray[selectedFrameOption]} />d
      </div>
      <div className="frame-buttons">
        {Array.from({ length: 4 }, (_, index) => (
          <img
            className={`button-${index}`}
            src={buttonArray[index]}
            key={index}
            onClick={() => setSelectedFrameOption(index)}
            style={{
              outline:
                selectedFrameOption === index ? "2px solid black" : "none",
            }} // 현재 선택된 버튼만 윤곽선을 검정색으로 설정
          />
        ))}
      </div>
    </div>
  );
};
