import React from "react";
import { Button } from "components/Button";
import home_example from "assets/images/home_example.png"
import "./style.css";

export const Home = (): JSX.Element => {
    return (
        <div className="home">
            <div className="div">
                <Button className="button-instance" text="시작하기"/>
                <Button className="button-2" text="도움말" />
                <h1 className="h-1">
                    전산
                    <br />
                    네컷
                </h1>
                <img className="element" alt="Element" src={home_example} />
            </div>
        </div>
    );
};