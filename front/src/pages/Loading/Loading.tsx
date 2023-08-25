import React, { useState ,useRef,useEffect} from "react";
import { Button } from "components/Button";
import { useNavigate, useLocation } from "react-router-dom"; // useLocation 추가
import * as AWS from 'aws-sdk';
import toast, { Toaster } from 'react-hot-toast';
import "./style.css";
import { NotifyModal } from "components/NotifyModal";


AWS.config.update({
    region: 'ap-northeast-2', 
    credentials: new AWS.Credentials('AKIA2ZMSTBKSABGLE55S', 'kKwA1kt7HQb97YVTBYchqFw0SD21WFd/H5V0eK5u'), 
});

const s3 = new AWS.S3();

type InputState = {
  value: string;
  isValid: boolean;
};

export const Loading = (): JSX.Element => {
  // modal 설정
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [warningMessage, setWarningMessage] = useState<string>("");
  
  const handleAlert = (message: string): void => {
    setWarningMessage(message);
    setIsModalOpen(true);
  };
  let closeModal = (): void => {
    setIsModalOpen(false);
  };
  const closeAndMove = (): void => {
    setIsModalOpen(false);
    navigate("/result", {state: {imageSrc}});
  };
  

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
    if (studentNumber.value === "" || name.value === "") {
    handleAlert("학번 이름 필수");  // 수정하자
    return;
    }
    // 이미지를 Blob으로 가져옴
    const response = await fetch(imageSrc);
    const blob = await response.blob();
  
    // 파일 이름 설정 (원하는 이름으로 변경 가능)
    const fileName = studentNumber.toString() + '_' + name + '.jpg';
  
    // Blob을 S3로 전송
    await uploadBlobToS3(blob, fileName);
    await asyncAlert("인쇄 완료");
    navigate("/result", {state: {imageSrc}});
  };

  const handleSkipClick = () => {
    // "/result" 경로로 이동하면서 imageSrc 전달
    navigate("/result", { state: { imageSrc } });
  };

  const asyncAlert = (message:string) => {
    return new Promise((resolve, reject) => {
      handleAlert(message);
      const originalClose = closeModal;
      closeModal = () => {
        originalClose();
        resolve(1);
      }
    });
  }
  const [studentNumber, setStudentNumber] = useState<InputState>({ value: "", isValid: true });
  const [name, setName] = useState<InputState>({ value: "", isValid: true });

  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, type: "studentNumber" | "name") => {
    const newValue = e.target.value;
    let isValid = false;

    if (type === "studentNumber") {
      isValid = /^[0-9]*$/.test(newValue);
      if (isValid) {
        setStudentNumber({ value: newValue, isValid });
      }
      else {
        toast.error(
          "학번은 숫자만 입력할 수 있습니다.",
          {duration: 1500}
        )
      }
    } 
    else if (type === "name") {
      isValid =  /^[\p{L}\s]*$/u.test(newValue);
      if (isValid) {
        setName({ value: newValue, isValid });
      }
      else{
        toast.error(
          "이름은 한글 또는 영문만 입력할 수 있습니다.",
          {duration: 1500}
        )
      }
    }
  };

  return (
    <div className="home">
    <div className="div">
    <input
    type="text"
    placeholder="학번을 입력하세요"
    value={studentNumber.value}
    onChange={(e) =>  handleInputChange(e, "studentNumber")}
    />
    <input
    type="text"
    placeholder="이름을 입력하세요"
    value={name.value}
    onChange={(e) =>  handleInputChange(e, "name")}
    />
    
    <Toaster/>
    <Button className="button-1" text="인쇄하기" onClick={handlePrintClick} />
    <Button className="button-2" text="건너뛰기" onClick={handleSkipClick}/>
    <img className="element" alt="Element" src={imageSrc} /> {/* 넘겨받은 이미지 src 사용 */}
    </div>
    <NotifyModal
              isOpen={isModalOpen}
              onRequestClose={(closeModal)}
              message={warningMessage}
            />
    </div>
  );
  
};
