import React, { useState } from "react";
import { Button } from "components/Button";
import { useNavigate } from "react-router-dom";
import { SelectNumber } from "components/SelectNumber";
import { SelectPhoto } from "components/SelectPhoto";
import { SelectFrame } from "components/SelectFrame";
import html2canvas from "html2canvas";
import saveAs from "file-saver";
import { useRef } from "react";
import * as AWS from 'aws-sdk';
import { S3 } from 'aws-sdk';

import option1 from "assets/images/option1.png";
import option2 from "assets/images/option2.png";
import option3 from "assets/images/option3.png";
import option4 from "assets/images/option4.png";
import option1_1 from "assets/images/option1-1.png";
import option2_1 from "assets/images/option2-1.png";
import option3_1 from "assets/images/option3-1.png";
import option4_1 from "assets/images/option4-1.png";

import "./style.css";
import { SelectFilter } from "components/SelectFilter";

AWS.config.update({
  region: 'ap-northeast-2', 
  credentials: new AWS.Credentials('AKIA2ZMSTBKSABGLE55S', 'kKwA1kt7HQb97YVTBYchqFw0SD21WFd/H5V0eK5u'), 
});

const s3 = new AWS.S3();

export const Select = (): JSX.Element => {
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
    
    const applyFilter = (img: HTMLImageElement, filter: string) => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      if (ctx) {
        canvas.width = img.naturalWidth;
        canvas.height = img.naturalHeight;
        ctx.filter = filter;
        ctx.drawImage(img, 0, 0, img.naturalWidth, img.naturalHeight);
      }
      return canvas.toDataURL();
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
          img.src = applyFilter(img, filter);
        });
  
        // 모든 이미지의 소스가 변환된 후 10ms 지연
        setTimeout(async () => {
          const canvas = await html2canvas(div, { scale: 2 });
          canvas.toBlob(
            (blob) => {
              if (blob !== null) {
                imageBlob = blob;
                console.log(imageBlob);
                saveAs(blob, 'result.jpeg');
                uploadBlobToS3(imageBlob!, 'test.jpeg');
              }
            },
            'image/jpeg',
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

    const uploadBlobToS3 = async (blob: Blob, fileName: string) => {
      const params: AWS.S3.PutObjectRequest = {
        Bucket: 'socframe',
        Key: fileName,
        Body: blob,
        ContentType: 'image/jpeg', 
      };
  
      try {
        const response = await s3.upload(params).promise();
        console.log('Uploaded to S3:', response);
      } catch (error) {
        console.error('Error uploading to S3:', error);
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
      } else if (page > 1) {
        setPage(page + 1);
      }
    };

    const renderComponent = () => {
      if (page === 1) {
        return (
          <SelectNumber
            options={optionImg}
            selectedOptions={selectedOptionImg}
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
    };

    const optionImg = [option1, option2, option3, option4];
    const selectedOptionImg = [option1_1, option2_1, option3_1, option4_1];
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
      </div>
    );
};