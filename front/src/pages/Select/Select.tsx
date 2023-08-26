import React, { useState } from "react";
import { Button } from "components/Button";
import { useNavigate } from "react-router-dom";
import { SelectNumber } from "components/SelectNumber";
import { SelectPhoto } from "components/SelectPhoto";
import { SelectFrame } from "components/SelectFrame";
import { SelectFilter } from "components/SelectFilter";
import html2canvas from "html2canvas";
import { useRef } from "react";
import  {WarningModal}  from 'components/WarningModal';

import "./style.css";

export const Select = (): JSX.Element => {
    // modal 설정
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [warningMessage, setWarningMessage] = useState<string>("");

    const handleAlert = (message: string): void => {
      setWarningMessage(message);
      setIsModalOpen(true);
    };

    const closeModal = (): void => {
      setIsModalOpen(false);
    };

    let vh = window.innerHeight * 0.01
    document.documentElement.style.setProperty('--vh', `${vh}px`)
    window.addEventListener('resize', () => {
        let vh = window.innerHeight * 0.01
        document.documentElement.style.setProperty('--vh', `${vh}px`)
    })

    const [page, setPage] = useState<number>(1);
    const [selectedOption, setSelectedOption] = useState<number | null>(null); // 마지막으로 선택된 옵션 저장
    const [compressedImages, setCompressedImages] = useState<string[]>([]);
    const [selectedFrameOption, setSelectedFrameOption] = useState(0); // 상태를 저장하는 Hook

    const navigate = useNavigate(); // navigate 함수 생성
    
    const divRef = useRef<HTMLDivElement>(null);
    let imageBlob: Blob | null = null;
    
    const applyFilter = (img: HTMLImageElement, filterOption: number): string => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      if (ctx) {
        canvas.width = img.naturalWidth;
        canvas.height = img.naturalHeight;
        ctx.drawImage(img, 0, 0, img.naturalWidth, img.naturalHeight);
    
        // 픽셀 데이터 가져오기
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const pixels = imageData.data;
    
        // 필터 옵션에 따른 처리
        switch (filterOption) {
          case 1: // 밝게
            for (let i = 0; i < pixels.length; i += 4) {
              pixels[i] += 50; // R
              pixels[i + 1] += 50; // G
              pixels[i + 2] += 50; // B
            }
            break;
          case 2: // 흑백
            for (let i = 0; i < pixels.length; i += 4) {
              const grayscale = pixels[i] * 0.3 + pixels[i + 1] * 0.59 + pixels[i + 2] * 0.11;
              pixels[i] = grayscale; // R
              pixels[i + 1] = grayscale; // G
              pixels[i + 2] = grayscale; // B
            }
            break;
          case 3: // 홀수 인덱스 흑백
            for (let y = 0; y < canvas.height; y++) {
              for (let x = 0; x < canvas.width; x++) {
                const index = (y * canvas.width + x) * 4;
                if (index % 2 === 0) continue;
                const grayscale = pixels[index] * 0.3 + pixels[index + 1] * 0.59 + pixels[index + 2] * 0.11;
                pixels[index] = grayscale; // R
                pixels[index + 1] = grayscale; // G
                pixels[index + 2] = grayscale; // B
              }
            }
            break;
          default:
            break;
        }
    
        ctx.putImageData(imageData, 0, 0);
      }
      return canvas.toDataURL();
    };
    
    const getFilterOption = (filter: string): number => {
      // 필터 문자열을 기반으로 필요한 옵션을 반환
      if (filter.includes('brightness')) {
        if (filter.includes('grayscale')) {
          return 3;
        }
        return 1;
      }
      if (filter.includes('grayscale')) return 2;
      // 추가 필터 옵션은 여기에 맞게 구현
      return 0; // 기본값
    };

    const handleDownload = async () => {
      if (!divRef.current) return;
  
      try {
        const div = divRef.current;
        const images = div.querySelectorAll('img');
        const originalSrc: string[] = [];
  
        images.forEach((image, index) => {
          const img = image as HTMLImageElement;
          originalSrc[index] = img.src; // 원래 src를 저장
          const filter = getComputedStyle(img).filter;
          const filterOption = getFilterOption(filter); // 필터 옵션을 숫자로 변환
          img.src = applyFilter(img, filterOption);
        });
  
        // 모든 이미지의 소스가 변환된 후 10ms 지연
        setTimeout(async () => {
          const canvas = await html2canvas(div, {
            scale: 2,
            backgroundColor: null // 배경색을 투명하게 설정
          });
          canvas.toBlob(
            (blob) => {
              if (blob !== null) {
                imageBlob = blob;
                console.log(imageBlob);
                // saveAs(blob, 'result.jpeg');
                // uploadBlobToS3(imageBlob!, 'test.jpeg');

                const imageUrl = URL.createObjectURL(blob); // Blob을 URL로 변환
                navigate('/loading', { state: { imageSrc: imageUrl } }); // URL을 다음 경로로 전달
              }
            },
            'image/png',
            0.8
          );

  
          // 이미지를 원래 상태로 되돌림
          images.forEach((image, index) => {
            const img = image as HTMLImageElement;
            img.src = originalSrc[index];
          });
        }, 10);
      } catch (error) {
        console.error('Error converting div to image:', error);
      }
    };

    // 이전 버튼 클릭 핸들러
    const handlePrevClick = () => {
      if (page === 1) {
        navigate("/");
      } else {
        setPage(page - 1);
      }
    };

    // 다음 버튼 클릭 핸들러
    const handleNextClick = () => {
      if (page === 4) {
        handleDownload();
        // navigate("/loading");
      } else if (page === 1 && selectedOption !== null) {
        setPage(page + 1);
      } else if(page === 2){
        console.log(compressedImages.length);
        console.log((selectedOption as number) + 1);
        let imageNum = [1,2,4,6];
        if(compressedImages.length === imageNum[(selectedOption as number)] && compressedImages[0] !== undefined){
          setPage(page + 1);
        }
        else{
          handleAlert("사진을 모두 선택해주세요.");
        }
      } else if (page > 1) {
        setPage(page + 1);
      }
    };

    const renderComponent = () => {
      if (page === 1) {
        return (
          <SelectNumber
            selectedOption={selectedOption}
            handleOptionClick={handleOptionClick}
          />
        );
      } else if (page === 2) {
        return <SelectPhoto 
          SelectOption={selectedOption as number}
          setCompressedImages={setCompressedImages}
        />; // SelectPhoto 컴포넌트 렌더링
      } else if (page == 3) {
        return <SelectFrame
          photoOption={selectedOption as number}
          compressedImages={compressedImages}
          selectedFrameOption={selectedFrameOption}
          setSelectedFrameOption={setSelectedFrameOption}
        />
      } else if (page == 4) {
        return <SelectFilter
          photoOption={selectedOption as number}
          compressedImages={compressedImages}
          selectedFrameOption={selectedFrameOption}
          divRef={divRef}
        />
      }
    };

    const handleOptionClick = (optionIndex: number) => {
        setSelectedOption(optionIndex);
        setCompressedImages([]);
    };

    const h1s = ["사진 개수 선택","사진 선택","프레임 선택","필터 선택"];
    const h2s = ["원하는 사진 개수를 선택해주세요","원하는 사진을 선택/촬영해주세요","원하는 프레임을 선택해주세요","원하는 필터를 선택해주세요"]
    return (
      <div className="select">
        <div className="div">
          <div className="h-1">{h1s[page-1]}</div>
          <div className="text-wrapper-2">{h2s[page-1]}</div>
          {renderComponent()}
          <div className="bottom-bar">
          
            <Button className="button-instance-prev" text="이전" onClick={handlePrevClick}/>
            <div className="text-wrapper-3">{page}/4</div>
            <Button className="button-instance-next" text="다음" onClick={handleNextClick}/>
            
          </div>
        </div>
        {/* <div className='finalPhoto' ref={divRef} style={{ display: 'none' }}>
          {photoList}
        </div> */}
        <WarningModal
              isOpen={isModalOpen}
              onRequestClose={(closeModal)}
              message={warningMessage}
            />
      </div>
    );
};