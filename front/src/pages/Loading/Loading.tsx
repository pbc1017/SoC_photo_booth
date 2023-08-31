import React, { useState ,useRef,useEffect} from "react";
import { Button } from "components/Button";
import { useNavigate, useLocation } from "react-router-dom"; // useLocation 추가
import * as AWS from 'aws-sdk';
import toast, { Toaster } from 'react-hot-toast';
import home_example from "assets/images/home_example.png"
import { NotifyModal } from "components/NotifyModal";
import "./style.css";
import { error } from 'console';


AWS.config.update({
    region: 'ap-northeast-2', 
    credentials: new AWS.Credentials('AKIASXX4F2YI6VYLYLNU', 'c9Cgx+LALeBxJLZc340jjC0AWiClZ/kbgrgBctZO'), 
});

const s3 = new AWS.S3();

let errorOccurred = false;

type InputState = {
  value: string;
  isValid: boolean;
};

export const Loading = (): JSX.Element => {
  // modal 설정
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [warningMessage, setWarningMessage] = useState<string>("");
  const [shouldNavigateAfterClose, setShouldNavigateAfterClose] = useState(false);
  
  //이거 수정해야 함
  const api_link = "https://localhost/api/print" 

  const handleAlert = (message: string): void => {
    setWarningMessage(message);
    setIsModalOpen(true);
  };
  const closeModal = (): void => {
    setIsModalOpen(false);
    if (shouldNavigateAfterClose) {
      setShouldNavigateAfterClose(false); // 상태를 초기화
      if (!errorOccurred) {
      navigate("/result", { state: { imageSrc } });}
    }
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
  const imageSrc = location.state?.imageSrc || home_example; // 초기 이미지를 원한다면 `home_example`로 설정 가능

  const uploadBlobToS3 = async (blob: Blob, fileName: string) => {
    const params: AWS.S3.PutObjectRequest = {
      Bucket: 'soc-photo',
      Key: fileName,
      Body: blob,
      ContentType: 'image/png', 
    };

    try {
      const response = await s3.upload(params).promise();
      console.log('Uploaded to S3:', response);
      return false;
    } catch (error) {
      console.error('Error uploading to S3:', error);
      return true;
    }
  };

  function getCurrentDateTime(): string {
    const now = new Date();
  
    const year = now.getFullYear().toString().slice(-2);
    const month = String(now.getMonth() + 1).padStart(2, '0'); // 월은 0부터 시작하기 때문에 1을 더해줍니다.
    const day = String(now.getDate()).padStart(2, '0');
    const hour = String(now.getHours()).padStart(2, '0');
    const minute = String(now.getMinutes()).padStart(2, '0');
  
    return `${year}${month}${day}${hour}${minute}`;
  }

  const handlePrintClick = async () => {
    if (studentNumber.value === "" || name.value === "") {
      handleAlert("학번과 이름을 모두 입력해주세요");  // 수정하자
      return;
    }
    const response = await fetch(imageSrc);
    const blob = await response.blob();
    const fileName = studentNumber.value + '_' + name.value + '_' + getCurrentDateTime() +'.png';
    errorOccurred = await uploadBlobToS3(blob, fileName);
    setShouldNavigateAfterClose(true);
    if (errorOccurred) { 
      handleAlert("인쇄 준비 중 오류가 발생했습니다. 다시 시도해주세요");
    } else { 
      try {
        // 서버 주소는 본인의 환경에 맞게 수정하세요.
        const response = await fetch(api_link, {
          method: 'POST'
        });
    
        // 응답 상태가 200인 경우에 대한 처리를 합니다.
        if (response.status === 200) {
          console.log('POST 요청이 성공적으로 처리되었습니다.');
          handleAlert("인쇄 준비 완료! 전산학부 부스에 와서 인쇄해주세요!");
        }
      } catch (error) {
        console.error('POST 요청 중 오류가 발생했습니다:', error);
        handleAlert("인쇄 준비 중 오류가 발생했습니다. 다시 시도해주세요");
      }
    }
  };

  const handleSkipClick = () => {
    navigate("/result", { state: { imageSrc } });
  };


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
          {duration: 3000}
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
          {duration: 3000}
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