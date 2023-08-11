import React, { useState } from "react";
import { Button } from "components/Button";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router";
import {PhotoFilterGrid} from 'components/PhotoFilterGrid';
import "./style.css";
import html2canvas from "html2canvas";
import saveAs from "file-saver";
import { useRef } from "react";

export const FileDownloadPage = (): JSX.Element => {
  const location = useLocation();
  const { numPhoto, compressedImages, selectedFrame, selectedFilter } = location.state;
  console.log(compressedImages);
  const [selectedOption, setSelectedOption] = useState<number>(0); // 마지막으로 선택된 옵션 저장
  const navigate = useNavigate(); 
  
  const handlePrevClick = () => {
    navigate("/Filterselect", {state:{numPhoto : numPhoto, compressedImages:compressedImages, selectedFrame:selectedFrame}}); // 이전 버튼 클릭시 "/" 라우터로 이동
  };
  
  const divRef = useRef<HTMLDivElement>(null);

  const handleDownload = async () => {
    if (!divRef.current) return;

    try {
      const div = divRef.current;
      const canvas = await html2canvas(div, { scale: 2 });
      canvas.toBlob((blob) => {
        if (blob !== null) {
          saveAs(blob, "result.png");
        }
      });
    } catch (error) {
      console.error("Error converting div to image:", error);
    }
  };
  
  const handleNextClick = () => {
    //컴포넌트 png로 다운로드
    handleDownload();
  };
  return (
    <div>
      <div ref={divRef}>
        <PhotoFilterGrid numPhoto = {numPhoto} photoImages = {compressedImages} selectedFrame = {selectedFrame} selectedFilter = {selectedOption} />
      </div>
      <div className="bottom-bar">
            <Button className="button-instance-prev" text="이전" onClick={handlePrevClick}/>
            <div className="text-wrapper-3">End!</div>
            <Button className="button-instance-next" text="다음" onClick={handleNextClick}/>
          </div>
    </div>
  );
};
