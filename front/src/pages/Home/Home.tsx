import React, {useState} from "react";
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
    const closeModal = (): void => {
        setIsModalOpen(false);
      };
    const navigate = useNavigate(); // navigate 함수 생성
    const handleStartClick = () => {
        navigate("/select");
    };

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
            </div>
            <NotifyModal
                isOpen={isModalOpen}
                onRequestClose={(closeModal)}
                message={"베타버전 입니다.\n9/1(금) 00:00 정식 출시"}
            />
        </div>
    );
};