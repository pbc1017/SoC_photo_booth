import React, { useState } from "react";
import { Button } from "components/Button";
import { useNavigate } from "react-router-dom";
import option1 from "assets/images/option1.png";
import option2 from "assets/images/option2.png";
import option3 from "assets/images/option3.png";
import option4 from "assets/images/option4.png";
import option1_1 from "assets/images/option1-1.png";
import option2_1 from "assets/images/option2-1.png";
import option3_1 from "assets/images/option3-1.png";
import option4_1 from "assets/images/option4-1.png";

import "./style.css";

export const NumberSelect = (): JSX.Element => {
    let vh = window.innerHeight * 0.01
    document.documentElement.style.setProperty('--vh', `${vh}px`)
    window.addEventListener('resize', () => {
        let vh = window.innerHeight * 0.01
        document.documentElement.style.setProperty('--vh', `${vh}px`)
    })

    const [selectedOption, setSelectedOption] = useState<number | null>(null); // 마지막으로 선택된 옵션 저장

    const navigate = useNavigate(); // navigate 함수 생성
    const handlePrevClick = () => {
        navigate("/"); // 이전 버튼 클릭시 "/" 라우터로 이동
    };

    const handleNextClick = () => {
      if (selectedOption !== null) {
          navigate("/photoselect", { state: { selectedOption } }); // selectedOption을 state로 전달
      }
    };

    const handleOptionClick = (optionIndex: number) => {
        setSelectedOption(optionIndex);
    };

    const options = [option1, option2, option3, option4];
    const selectedOptions = [option1_1, option2_1, option3_1, option4_1];


    return (
      <div className="number-select">
        <div className="div">
          <div className="h-1">사진 개수 선택</div>
          <div className="text-wrapper-2">원하는 사진 개수를 선택해주세요</div>
          <div className="options">
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
            <div className="text-wrapper-3">1/4</div>
            <Button className="button-instance-next" text="다음" onClick={handleNextClick}/>
          </div>
        </div>
      </div>
    );
};