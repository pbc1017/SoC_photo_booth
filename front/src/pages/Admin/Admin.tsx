import React, {useState} from "react";
import { Button } from "components/Button";
import { useNavigate} from "react-router-dom";
import { NotifyModal } from "components/NotifyModal";
import { SearchBar } from "components/SearchBar";
//import { PhotoGallery } from "components/PhotoGallery";
import home_example from "assets/images/home_example.png"
import "./style.css";

export const Admin = (): JSX.Element => {
    let vh = window.innerHeight * 0.01
    document.documentElement.style.setProperty('--vh', `${vh}px`)
    window.addEventListener('resize', () => {
        let vh = window.innerHeight * 0.01
        document.documentElement.style.setProperty('--vh', `${vh}px`)
    })
    
    return (
        <div className="home">
            <SearchBar></SearchBar>
        </div>
    );
};