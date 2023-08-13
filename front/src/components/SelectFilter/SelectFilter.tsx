import React, {useState} from 'react';
import { PhotoEmpty } from 'components/PhotoEmpty';
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
  const photoList = Array.from({ length: numPhoto }, (_, index) => (
    <img key={index}  className={`PhotoEmpty-${numPhoto}-${index}`} src={compressedImages[index]}/>
  ));

  const frameArray = [
    "https://img.freepik.com/premium-vector/white-texture-round-striped-surface-white-soft-cover_547648-928.jpg",
    "https://i.namu.wiki/i/nZ-acc7hcoYljIzwubPljI1eh88XAdU9k23Ep9X0yZdNeW01KWqrkgKM81qrZ5caBaaWNGpJgAyI-OSue8JqAQ.webp",
    "https://i.namu.wiki/i/kUK4aBN3nm1tpjk_8kWwrswOn25jaIJhu3rvsCTey7PVEa062IJi7NhlOI20eUOzeudcGqQzHCtmXbgfxK86bw.webp",
    "https://blog.kakaocdn.net/dn/rsYqr/btrgazUk5x7/w4Tq7vShA7qY66gM2Pl1aK/img.jpg"]

  return (
    <div className="options">
      <div className='photos' ref={divRef}>
        <img className="photo-frame" src={frameArray[selectedFrameOption]}/>
        {photoList}
      </div>
      <div className="frame-buttons">
        {Array.from({ length: 4 }, (_, index) => (
          <button
            key={index}
            onClick={() => setSelectedFilterOption(index)}
            style={{ outline: selectedFilterOption === index ? '2px solid black' : 'none' }} // 현재 선택된 버튼만 윤곽선을 검정색으로 설정
          >
            Filter {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};