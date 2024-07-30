import React from "react";
import "./style.css";

interface Props {
    className?: string; // className이 선택적인 프로퍼티로 변경
    text: string;
    onClick?: () => void; // onClick이 선택적인 프로퍼티로 변경
}

export const Button = ({ className = "", text, onClick }: Props): JSX.Element => {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
    window.addEventListener('resize', () => {
        let vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
    });

    return (
        <button className={`button ${className}`} onClick={onClick || undefined}>
            <div className="text-wrapper">{text}</div>
        </button>
    );
};
