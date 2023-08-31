import React, {useState, useEffect} from "react";
import { Button } from "components/Button";
import { useNavigate} from "react-router-dom";
import { NotifyModal } from "components/NotifyModal";
import home_example from "assets/images/home_example.png"
import "./style.css";

export const Home = (): JSX.Element => {
    let vh = window.innerHeight * 0.01
    document.documentElement.style.setProperty('--vh', `${vh}px`)
    window.addEventListener('resize', () => {
        let vh = window.innerHeight * 0.01
        document.documentElement.style.setProperty('--vh', `${vh}px`)
    })
    
    const [isModalOpen, setIsModalOpen] = useState<boolean>(true);
    const [printCnt, setPrintCnt] = useState<Number>(0);
    const [makeCnt, setMakeCnt] = useState<Number>(0);
    const closeModal = (): void => {
        setIsModalOpen(false);
      };
    const navigate = useNavigate(); // navigate 함수 생성
    const handleStartClick = () => {
        navigate("/select");
    };

    const loadingdata = async() => {
        try {
            // 서버 주소는 본인의 환경에 맞게 수정하세요.
            var response = await fetch("https://localhost/api/print");
            var data1 = await response.json();
            setPrintCnt(data1.printRequestCount);
            console.log('shareRequestCount:', data1.printRequestCount);
            response = await fetch("https://localhost/api/share");
            var data2 = await response.json();
            setMakeCnt(data1.printRequestCount + data2.printRequestCount);
            console.log('printRequestCount:', data2.printRequestCount);
        } catch (error) {
            console.error('GET 요청 중 오류가 발생했습니다:', error);
        }
    }

    useEffect(() => {
        loadingdata();
    }, []);
    
    return (
        <div className="home">
            <div className="div">
                <Button className="button-1" text="시작하기" onClick={handleStartClick}/>
                <Button className="button-2" text="도움말" />
                <h1 className="h-1">
                    전산
                    <br />
                    네컷
                </h1>
                <img className="element" alt="Element" src={home_example} />
                <div className="numbers">{`만든 네컷:${makeCnt}장 인쇄한 네컷:${printCnt}장`}</div>
            </div>
        </div>
    );
};