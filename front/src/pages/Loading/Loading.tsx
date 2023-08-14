import React, { useState } from "react";
import { Button } from "components/Button";
import { useNavigate, useLocation } from "react-router-dom"; // useLocation 추가
import * as AWS from 'aws-sdk';
import { S3 } from 'aws-sdk';
import "./style.css";

AWS.config.update({
    region: 'ap-northeast-2', 
    credentials: new AWS.Credentials('AKIA2ZMSTBKSABGLE55S', 'kKwA1kt7HQb97YVTBYchqFw0SD21WFd/H5V0eK5u'), 
});

const s3 = new AWS.S3();

export const Loading = (): JSX.Element => {
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

  const uploadBlobToS3 = async (blob: Blob, fileName: string) => {
    const params: AWS.S3.PutObjectRequest = {
      Bucket: 'socframe',
      Key: fileName,
      Body: blob,
      ContentType: 'image/jpeg', 
    };

    try {
      const response = await s3.upload(params).promise();
      console.log('Uploaded to S3:', response);
    } catch (error) {
      console.error('Error uploading to S3:', error);
    }
  };

  const handlePrintClick = async () => {
    // 이미지를 Blob으로 가져옴
    const response = await fetch(imageSrc);
    const blob = await response.blob();
  
    // 파일 이름 설정 (원하는 이름으로 변경 가능)
    const fileName = studentNumber.toString() + '_' + name + '.jpg';
  
    // Blob을 S3로 전송
    await uploadBlobToS3(blob, fileName);
  
    // "/result" 경로로 이동하면서 imageSrc 전달
    navigate("/result", { state: { imageSrc } });
  };

  const handleSkipClick = () => {
    // "/result" 경로로 이동하면서 imageSrc 전달
    navigate("/result", { state: { imageSrc } });
  };

  const [studentNumber, setStudentNumber] = useState("");
  const [name, setName] = useState("");

  return (
    <div className="home">
      <div className="div">
        <input
          type="text"
          placeholder="학번을 입력하세요"
          value={studentNumber}
          onChange={(e) => setStudentNumber(e.target.value)}
          className="input-student-number"
        />
        <input
          type="text"
          placeholder="이름을 입력하세요"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="input-name"
        />
        <Button className="button-1" text="인쇄하기" onClick={handlePrintClick} />
        <Button className="button-2" text="건너뛰기" onClick={handleSkipClick}/>
        <img className="element" alt="Element" src={imageSrc} /> {/* 넘겨받은 이미지 src 사용 */}
      </div>
    </div>
  );
};
