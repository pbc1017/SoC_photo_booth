import React, { useState } from "react";
import { Button } from "components/Button";
import { useNavigate, useLocation } from "react-router-dom"; // useLocation 추가
import "./style.css";

export const Result = (): JSX.Element => {
  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty("--vh", `${vh}px`);
  window.addEventListener("resize", () => {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);
  });
  const navigate = useNavigate();
  const location = useLocation(); // location 가져오기

  // 넘겨받은 이미지 src 가져오기
  const imageSrc = location.state?.imageSrc || ""; // 초기 이미지를 원한다면 `home_example`로 설정 가능

  const handleShareClick = async () => {
    // 이미지를 Fetch로 가져옵니다.
    const response = await fetch(imageSrc);
    const blob = await response.blob();
  
    // Blob을 File 객체로 변환합니다.
    const file = new File([blob], 'image.png', { type: 'image/png' });
  
    // 네이티브 공유 다이얼로그를 열고 이미지를 공유합니다.
    try {
      if (navigator.share) {
        await navigator.share({
          files: [file],
          title: '공유 이미지',
          text: '<전산네컷>에서 제작한 이미지 입니다! \n나도 만들러 가기: https://naver.com',
        });
      } else {
        alert('이 브라우저에서는 이미지 공유 기능이 지원되지 않습니다.');
      }
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  const handleSaveClick = () => {
    // 이미지를 다운로드
    const link = document.createElement("a");
    link.href = imageSrc;
    link.download = "image.png";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const [studentNumber, setStudentNumber] = useState("");
  const [name, setName] = useState("");

  return (
    <div className="home">
      <div className="div">
        <Button className="button-1" text="저장하기" onClick={handleSaveClick} />
        <Button className="button-2" text="공유하기" onClick={handleShareClick}/>
        <img className="element" alt="Element" src={imageSrc} /> {/* 넘겨받은 이미지 src 사용 */}
      </div>
    </div>
  );
};
