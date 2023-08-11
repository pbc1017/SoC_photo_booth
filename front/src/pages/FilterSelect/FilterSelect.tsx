import React, { useState } from "react";
import { Button } from "components/Button";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router";
import {PhotoFilterGrid} from 'components/PhotoFilterGrid';
import "./style.css";

import option1 from "assets/images/option1.png";
import option2 from "assets/images/option2.png";
import option3 from "assets/images/option3.png";
import option4 from "assets/images/option4.png";
import option1_1 from "assets/images/option1-1.png";
import option2_1 from "assets/images/option2-1.png";
import option3_1 from "assets/images/option3-1.png";
import option4_1 from "assets/images/option4-1.png";

// import frame_0 from "assets/images/frame-0.png";
// import frame_1 from "assets/images/frame-1.png";
// import frame_2 from "assets/images/frame-1.png";
// import frame_3 from "assets/images/frame-1.png";
// 나중에 frame 이미지로 변경해야 함

export const FilterSelect = (): JSX.Element => {
  const location = useLocation();
  const { numPhoto, compressedImages, selectedFrame } = location.state;
  console.log(compressedImages);
  const [selectedOption, setSelectedOption] = useState<number>(0); // 마지막으로 선택된 옵션 저장
  const navigate = useNavigate(); 
  const handleNextClick = () => {
    // "Next" 버튼을 클릭하면 FrameSelect 페이지로 이동하면서 compressedImages를 전달
    console.log(compressedImages);
    navigate("/filedownload", { state: { 
        numPhoto : numPhoto,
        compressedImages : compressedImages,
        selectedFrame : selectedFrame,
        selectedFilter : selectedOption
    } }); // selectedOption을 state로 전달
  };

  const handlePrevClick = () => {
    navigate("/Frameselect", {state:{numPhoto : numPhoto, compressedImages:compressedImages}}); // 이전 버튼 클릭시 "/" 라우터로 이동
    };
  
  const handleOptionClick = (optionIndex: number) => {
        setSelectedOption(optionIndex);
    };

    const options = [option1, option2, option3, option4];
    const selectedOptions = [option1_1, option2_1, option3_1, option4_1];

  return (
    <div>
      <PhotoFilterGrid numPhoto = {numPhoto} photoImages = {compressedImages} selectedFrame = {selectedFrame} selectedFilter = {selectedOption} />
        <div>
          {options.map((option, index) => (
              <img
                  key={index}
                  className={`option-${index}`}
                  alt="Option"
                  src={selectedOption === index ? selectedOptions[index] : option}
                  onClick={() => handleOptionClick(index)}
              />
          ))}
        </div>

      <div className="bottom-bar">
            <Button className="button-instance-prev" text="이전" onClick={handlePrevClick}/>
            <div className="text-wrapper-3">4/4</div>
            <Button className="button-instance-next" text="다음" onClick={handleNextClick}/>
          </div>
    </div>
  );
};
