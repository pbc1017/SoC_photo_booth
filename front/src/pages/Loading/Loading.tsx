import React, { useState, useRef, useEffect } from "react";
import { Button } from "components/Button";
import { useNavigate, useLocation } from "react-router-dom"; // useLocation 추가
import toast, { Toaster } from "react-hot-toast";
import { NotifyModal } from "components/NotifyModal";
import loading from "assets/images/loading.png";
import home_example from "assets/images/home_example.png";
import "./style.css";
import { error } from "console";

let errorOccurred = false;

type InputState = {
  value: string;
  isValid: boolean;
};

export const Loading = (): JSX.Element => {
  // modal 설정
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [warningMessage, setWarningMessage] = useState<string>("");
  const [shouldNavigateAfterClose, setShouldNavigateAfterClose] =
    useState(false);

  //이거 수정해야 함
  const api_link = "http://localhost:8000/";

  const handleAlert = (message: string): void => {
    setWarningMessage(message);
    setIsModalOpen(true);
  };
  const closeModal = (): void => {
    setIsModalOpen(false);
    if (shouldNavigateAfterClose) {
      setShouldNavigateAfterClose(false); // 상태를 초기화
      if (!errorOccurred) {
        navigate("/result", { state: { imageSrc } });
      }
    }
  };

  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty("--vh", `${vh}px`);
  // window.addEventListener("resize", () => {
  //   let vh = window.innerHeight * 0.01;
  //   document.documentElement.style.setProperty("--vh", `${vh}px`);
  // });
  const navigate = useNavigate();
  const location = useLocation(); // location 가져오기

  // 넘겨받은 이미지 src 가져오기
  const imageSrc = location.state?.imageSrc || home_example; // 초기 이미지를 원한다면 `home_example`로 설정 가능

  function getCurrentDateTime(): string {
    const now = new Date();

    const year = now.getFullYear().toString().slice(-2);
    const month = String(now.getMonth() + 1).padStart(2, "0"); // 월은 0부터 시작하기 때문에 1을 더해줍니다.
    const day = String(now.getDate()).padStart(2, "0");
    const hour = String(now.getHours()).padStart(2, "0");
    const minute = String(now.getMinutes()).padStart(2, "0");

    return `${year}${month}${day}${hour}${minute}`;
  }

  const handleSkipClick = async () => {
    try {
      console.log(`${api_link}share`);
      const response = await fetch(`${api_link}share`, {
        method: "POST",
      });

      if (response.status === 200) {
        console.log("POST 요청이 성공적으로 처리되었습니다.");
      }
    } catch (error) {
      console.error("POST 요청 중 오류가 발생했습니다:", error);
    }
    navigate("/result", { state: { imageSrc } });
  };

  const [studentNumber, setStudentNumber] = useState<InputState>({
    value: "",
    isValid: true,
  });
  const [name, setName] = useState<InputState>({ value: "", isValid: true });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: "studentNumber" | "name"
  ) => {
    const newValue = e.target.value;
    let isValid = false;

    if (type === "studentNumber") {
      isValid = /^[0-9]*$/.test(newValue);
      if (isValid) {
        setStudentNumber({ value: newValue, isValid });
      } else {
        toast.error("학번은 숫자만 입력할 수 있습니다.", { duration: 3000 });
      }
    } else if (type === "name") {
      isValid = /^[\p{L}\s]*$/u.test(newValue);
      if (isValid) {
        setName({ value: newValue, isValid });
      } else {
        toast.error("이름은 한글 또는 영문만 입력할 수 있습니다.", {
          duration: 3000,
        });
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
          onChange={(e) => handleInputChange(e, "studentNumber")}
          className="input-number"
        />
        <input
          type="text"
          placeholder="이름을 입력하세요"
          value={name.value}
          onChange={(e) => handleInputChange(e, "name")}
          className="input-name"
        />
        <Toaster />
        <Button
          className="button-2"
          text="건너뛰기"
          onClick={handleSkipClick}
        />
        <img className="element-loading" alt="Element" src={loading} />{" "}
        {/* 넘겨받은 이미지 src 사용 */}
        <div className="title-1">만드는중</div>
        <div className="title-2" style={{ textAlign: "center" }}>
          사진을 인쇄하려면 학번(전화번호)과
          <br />
          이름을 입력해주세요.
        </div>
      </div>
      <NotifyModal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        message={warningMessage}
      />
    </div>
  );
};
