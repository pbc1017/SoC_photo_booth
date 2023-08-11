import React, { useState } from "react";
import { Button } from "components/Button";
import { useNavigate } from "react-router-dom";
import { SelectNumber } from "components/SelectNumber";
import { SelectPhoto } from "components/SelectPhoto"; // 가정: SelectPhoto가 이 경로에 존재함

import option1 from "assets/images/option1.png";
import option2 from "assets/images/option2.png";
import option3 from "assets/images/option3.png";
import option4 from "assets/images/option4.png";
import option1_1 from "assets/images/option1-1.png";
import option2_1 from "assets/images/option2-1.png";
import option3_1 from "assets/images/option3-1.png";
import option4_1 from "assets/images/option4-1.png";

import "./style.css";

export const Select = (): JSX.Element => {
    let vh = window.innerHeight * 0.01
    document.documentElement.style.setProperty('--vh', `${vh}px`)
    window.addEventListener('resize', () => {
        let vh = window.innerHeight * 0.01
        document.documentElement.style.setProperty('--vh', `${vh}px`)
    })

    const [page, setPage] = useState<number>(1);
    const [selectedOption, setSelectedOption] = useState<number | null>(null); // 마지막으로 선택된 옵션 저장

    const navigate = useNavigate(); // navigate 함수 생성
    
    // 이전 버튼 클릭 핸들러
    const handlePrevClick = () => {
      if (page === 1) {
        navigate("/");
      } else {
        setPage(page - 1);
      }
    };

    // 다음 버튼 클릭 핸들러
    const handleNextClick = () => {
      if (page === 4) {
        navigate("/loading");
      } else if (page === 1 && selectedOption !== null) {
        setPage(page + 1);
      } else if (page > 1) {
        setPage(page + 1);
      }
    };

    const renderComponent = () => {
      if (page === 1) {
        return (
          <SelectNumber
            options={optionImg}
            selectedOptions={selectedOptionImg}
            selectedOption={selectedOption}
            handleOptionClick={handleOptionClick}
          />
        );
      } else if (page === 2) {
        return <SelectPhoto 
          SelectOption={selectedOption as number}
        />; // SelectPhoto 컴포넌트 렌더링
      }
    };

    const handleOptionClick = (optionIndex: number) => {
        setSelectedOption(optionIndex);
    };

    const optionImg = [option1, option2, option3, option4];
    const selectedOptionImg = [option1_1, option2_1, option3_1, option4_1];
    const h1s = ["사진 개수 선택","사진 선택","프레임 선택","필터 선택"];
    const h2s = ["원하는 사진 개수를 선택해주세요","원하는 사진을 선택/촬영해주세요","원하는 프레임을 선택해주세요","원하는 필터를 선택해주세요"]
    return (
      <div className="number-select">
        <div className="div">
          <div className="h-1">{h1s[page-1]}</div>
          <div className="text-wrapper-2">{h2s[page-1]}</div>
          {renderComponent()}
          <div className="bottom-bar">
            <Button className="button-instance-prev" text="이전" onClick={handlePrevClick}/>
            <div className="text-wrapper-3">{page}/4</div>
            <Button className="button-instance-next" text="다음" onClick={handleNextClick}/>
          </div>
        </div>
      </div>
    );
};