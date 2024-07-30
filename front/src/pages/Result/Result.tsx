import React, { useState, useEffect } from "react";
import { Button } from "components/Button";
import { useNavigate, useLocation } from "react-router-dom"; // useLocation 추가
import home_example from "assets/images/home_example.png"
import "./style.css";
import { request } from "http";

export const Result = (): JSX.Element => {
  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty("--vh", `${vh}px`);
  window.addEventListener("resize", () => {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);
  });
  const navigate = useNavigate();
  const location = useLocation();
  const api_link_share = "https://localhost/api/share"
  const api_link_download = "https://localhost/api/photo"
  let initialImageSrc = sessionStorage.getItem('imageSrc');

// 이미지가 세션 스토리지에 없거나 유효하지 않다면 기본 이미지로 설정합니다.
if (!initialImageSrc || initialImageSrc === "null") {
  initialImageSrc = home_example;
}

// 넘겨받은 이미지 src 가져오기
const [imageSrc, setImageSrc] = useState<string>(initialImageSrc);

useEffect(() => {
  if (location.state?.imageSrc) {
    setImageSrc(location.state.imageSrc);
    sessionStorage.setItem('imageSrc', location.state.imageSrc);  // 세션 스토리지에 이미지 URL을 저장합니다.
  }
}, [location.state?.imageSrc]);
  
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
          text: '<전산네컷>에서 제작한 이미지 입니다! \n나도 만들러 가기: https://socphoto.shop/',
        });
      } else {
        alert('이 브라우저에서는 이미지 공유 기능이 지원되지 않습니다.');
      }
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  const handleSaveClick = async () => {
    // 이미지를 다운로드
    try {
      // 서버 주소는 본인의 환경에 맞게 수정하세요.
      const response = await fetch(api_link_download, {
        method: 'POST'
      });
  
      // 응답 상태가 200인 경우에 대한 처리를 합니다.
      if (response.status === 200) {
        console.log('POST 요청이 성공적으로 처리되었습니다.');
      }
      else{
        console.log('POST 실패...');
      }
    } catch (error) {
      console.error('POST 요청 중 오류가 발생했습니다:', error);
    }

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
        <div className="title-1">완성!</div>
        <div className="title-result" style={{ textAlign: 'center' }}>이제 사진을 저장하거나 공유하세요!</div>
        <Button className="button-1" text="저장하기" onClick={handleSaveClick} />
        <Button className="button-2" text="공유하기" onClick={handleShareClick}/>
        <img className="element-result" alt="Element" src={imageSrc} /> {/* 넘겨받은 이미지 src 사용 */}
      </div>
    </div>
  );
};
