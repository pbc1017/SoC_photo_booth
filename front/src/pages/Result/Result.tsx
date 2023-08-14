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

  const handleShareClick = () => {
    // 서버로 이미지 src 전송
    // axios.post("/api/print", { imageSrc })
    //   .then(() => {
    //     // 성공 시 처리
    //   })
    //   .catch((error) => {
    //     console.error("Print error:", error);
    //   });
  };

  const handleSaveClick = () => {
    // 이미지를 다운로드
    const link = document.createElement("a");
    link.href = imageSrc;
    link.download = "image.jpg";
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
