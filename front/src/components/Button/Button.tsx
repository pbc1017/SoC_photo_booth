import React from "react";
import "./style.css";

interface Props {
    className: string;
    text: string;
}

export const Button = ({ className, text }: Props): JSX.Element => {
    return (
        <div className={`button ${className}`}>
            <div className="text-wrapper">{text}</div>
        </div>
    );
};
