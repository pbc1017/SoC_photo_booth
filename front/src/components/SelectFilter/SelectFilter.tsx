import React, {useEffect, useState} from 'react';
import { PhotoEmpty } from 'components/PhotoEmpty';
import frame1 from "assets/images/frame_image_1.png";
import frame2 from "assets/images/frame_image_2.png";
import frame3 from "assets/images/frame_image_3.png";
import frame4 from "assets/images/frame_image_4.png";
import cover1 from "assets/images/frame_cover_1.png";
import cover2 from "assets/images/frame_cover_2.png";
import cover3 from "assets/images/frame_cover_3.png";
import cover4 from "assets/images/frame_cover_4.png";
import button1 from "assets/images/filter_button_1.png";
import button2 from "assets/images/filter_button_2.png";
import button3 from "assets/images/filter_button_3.png";
import button4 from "assets/images/filter_button_4.png";
import "./style.css"

interface SelectFilterProps {
  photoOption: number;
  compressedImages: string[];
  selectedFrameOption: number;
  divRef: React.RefObject<HTMLDivElement>;
}

export const SelectFilter: React.FC<SelectFilterProps> = ({ photoOption,compressedImages,selectedFrameOption,divRef }) => {
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
  
  const [selectedFilterOption, setSelectedFilterOption] = useState(0); // 상태를 저장하는 Hook
  const numPhoto = getPhotoEmptyCount();

  const [imageFilter, setImageFilter] = useState('');

  useEffect(() => {
    // 일시적으로 filter를 비워주는 작업
    setImageFilter('');

    // 필요한 필터를 적용하는 작업 (200ms 후에 실행)
    const timer = setTimeout(() => {
      switch (selectedFilterOption) {
        case 0:
          setImageFilter(''); // 아무런 변경을 하지 않음
          break;
        case 1:
          setImageFilter('brightness(1.2)'); // 사진을 조금 더 밝게 만듦
          break;
        case 2:
          setImageFilter('grayscale(1)'); // 사진을 흑백으로 바꿈
          break;
        case 3:
          setImageFilter(''); // 홀수 인덱스 사진만 흑백으로 만드는 로직은 별도로 처리
          break;
        default:
          setImageFilter('');
          break;
      }
    }, 10);

    return () => {
      clearTimeout(timer);
    };
  }, [selectedFilterOption]);

  const photoList = Array.from({ length: numPhoto }, (_, index) => (
    <img
      key={index}
      className={`Photo-${numPhoto}-${index}`}
      src={compressedImages[index]}
      style={{ filter: (selectedFilterOption == 3 && index % 2 == 1) ? 'grayscale(1)' : imageFilter }}
    />
  ));

  const frameArray = [frame1,frame2,frame3,frame4]
  const coverArray = [cover1,cover2,cover3,cover4]
  const buttonArray = [button1, button2, button3, button4]

  return (
    <div className="options">
      <div className='photosOut'/>
      <div className='photos' ref={divRef}>
        <img className="photo-frame" src={frameArray[selectedFrameOption]}/>
        {photoList}
        <img className="photo-frame" src={coverArray[selectedFrameOption]}/>
      </div>
      <div className="frame-buttons">
        {Array.from({ length: 4 }, (_, index) => (
          <img
            className={`button-${index}`}
            src={buttonArray[index]}
            key={index}
            onClick={() => setSelectedFilterOption(index)}
            style={{ outline: selectedFilterOption === index ? '2px solid black' : 'none' }} // 현재 선택된 버튼만 윤곽선을 검정색으로 설정
          />
        ))}
      </div>
    </div>
  );
};