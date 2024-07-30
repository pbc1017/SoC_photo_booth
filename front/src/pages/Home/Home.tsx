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
    
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [printCnt, setPrintCnt] = useState<Number>(0);
    const [makeCnt, setMakeCnt] = useState<Number>(0);
    const closeModal = (): void => {
        setIsModalOpen(false);
      };
    const navigate = useNavigate(); // navigate 함수 생성
    const handleStartClick = () => {
        navigate("/select");
    };
    const handleHelpClick = () => {
        setIsModalOpen(true);
    };

    const loadingdata = async() => {
        try {
            // 서버 주소는 본인의 환경에 맞게 수정하세요.
            var response = await fetch("https://socphoto.shop/api/print");
            var data1 = await response.json();
            setPrintCnt(data1.printRequestCount);
            console.log('shareRequestCount:', data1.printRequestCount);
            response = await fetch("https://socphoto.shop/api/share");
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
                <Button className="button-2" text="도움말" onClick={handleHelpClick}/>
                <h1 className="h-1">
                    SA
                    <br />
                    SH
                    <br />
                    <span className="green">24</span>
                </h1>
                <img className="element" alt="Element" src={home_example} />
                <NotifyModal
                    isOpen={isModalOpen}
                    onRequestClose={(closeModal)}
                    message={"SPARCS AI Startup Hackathon 2024에서 운영중인 웹페이지입니다. 팀원들과 즐거운 추억을 쌓을 수 있는 행사가 될 수 있기를 바랍니다. 감사합니다."}
                    sign={"- SPARCS 기획팀"}
                />
            </div>
        </div>
    );
};