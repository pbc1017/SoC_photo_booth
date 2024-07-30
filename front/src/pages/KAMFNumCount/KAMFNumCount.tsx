import React, { useState, useEffect } from "react";
import { Button } from "components/Button";
import { useNavigate, useLocation } from "react-router-dom"; // useLocation 추가
import "./style.css";
import { request } from "http";

export const KAMFNumCount = (): JSX.Element => {
  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty("--vh", `${vh}px`);
  window.addEventListener("resize", () => {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);
  });
  const [myCount, setMyCount] = useState<number>(0);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [totalSum, setTotalSum] = useState<number>(0); // totalSum 상태 추가
  const [deltaCount, setDeltaCount] = useState<number>(0); // 변동된 카운트

  useEffect(() => {
    const fetchTotalCount = async () => {
      try {
        const response = await fetch('https://socphoto.shop/total-count');
        const data = await response.json();
        setTotalCount(data.totalCount);
        setTotalSum(data.totalSum); // totalSum 상태 업데이트
      } catch (error) {
        console.error('Error fetching total count:', error);
      }
    };

    fetchTotalCount();
    const interval = setInterval(fetchTotalCount, 10000); // 10초마다 total count 갱신

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const sendCount = async () => {
      try {
        if (deltaCount !== 0) {
          await fetch('https://socphoto.shop/update-count', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ count: deltaCount }),
          });
          setDeltaCount(0); // 데이터 전송 후 deltaCount 초기화
        }
      } catch (error) {
        console.error('Error sending count:', error);
      }
    };

    const interval = setInterval(sendCount, 5000); // 5초마다 변동된 카운트 서버로 전송

    return () => clearInterval(interval);
  }, [deltaCount]);

  const handleAdd = () => {
    setMyCount((prev) => prev + 1);
    setDeltaCount((prev) => prev + 1);
  };

  const handleSubtract = () => {
    setMyCount((prev) => prev - 1);
    setDeltaCount((prev) => prev - 1);
  };

  return (
    <div className="App">
      <h1>2023 KAMF 관객 집계</h1>
      <h2>내가 센 입장 관객수: {myCount}</h2>
      <h2>현재 입장 관객수: {totalCount}</h2>
      <h2>누적 입장 관객수: {totalSum}</h2>
      <button className="plus" onClick={handleAdd}>+</button>
      <button className="minus" onClick={handleSubtract}>-</button>
    </div>
  );
};
