import React, { useState } from "react";
import { Button } from "components/Button";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router";
import {PhotoEditGrid} from 'components/PhotoEditGrid';
import "./style.css";

export const PhotoSelect = (): JSX.Element => {
  const location = useLocation();
  const state = location.state as { numPhoto : number };
  const numPhoto = state.numPhoto;
  console.log(numPhoto);
  const [compressedImages, setCompressedImages] = useState<string[]>([]);
  const navigate = useNavigate(); 
  const handleNextClick = () => {
    // "Next" 버튼을 클릭하면 FrameSelect 페이지로 이동하면서 compressedImages를 전달
    console.log(compressedImages);
    navigate("/frameselect", { state: { 
      numPhoto : numPhoto,
      compressedImages : compressedImages 
    } }); // selectedOption을 state로 전달
  };

  const handlePrevClick = () => {
    navigate("/numberselect"); // 이전 버튼 클릭시 "/" 라우터로 이동
  };
  
  return (
    <div>
      <PhotoEditGrid setCompressedImages={setCompressedImages} numPhoto={numPhoto} />

      <div className="bottom-bar">
            <Button className="button-instance-prev" text="이전" onClick={handlePrevClick}/>
            <div className="text-wrapper-3">2/4</div>
            <Button className="button-instance-next" text="다음" onClick={handleNextClick}/>
          </div>
    </div>
  );
};

// export const PhotoSelect = (): JSX.Element => {
//     let vh = window.innerHeight * 0.01
//     document.documentElement.style.setProperty('--vh', `${vh}px`)
//     window.addEventListener('resize', () => {
//         let vh = window.innerHeight * 0.01
//         document.documentElement.style.setProperty('--vh', `${vh}px`)
//     })

//     const [selectedOption, setSelectedOption] = useState<number | null>(null); // 마지막으로 선택된 옵션 저장

//     const navigate = useNavigate(); // navigate 함수 생성
//     const handlePrevClick = () => {
//         navigate("/"); // 이전 버튼 클릭시 "/" 라우터로 이동
//     };
//     const handleNextClick = () => {
//       if (selectedOption !== null) {
//           navigate("/photoselect", { state: { selectedOption } }); // selectedOption을 state로 전달
//       }
//     };

//     const handleOptionClick = (optionIndex: number) => {
//         setSelectedOption(optionIndex);
//     };

//     const options = [option1, option2, option3, option4];
//     const selectedOptions = [option1_1, option2_1, option3_1, option4_1];


//     return (
//       <div className="number-select">
//         <div className="div">
//           <h1 className="h-1">사진 개수 선택</h1>
//           <div className="text-wrapper-2">원하는 사진 개수를 선택해주세요</div>
//           <div className="bottom-bar">
//             <Button className="button-instance-prev" text="이전" onClick={handlePrevClick}/>
//             <div className="text-wrapper-3">1/4</div>
//             <Button className="button-instance-next" text="다음" onClick={handleNextClick}/>
//           </div>
//         </div>
//       </div>
//     );
// };