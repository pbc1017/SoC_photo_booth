import React, { useState } from "react";
import { Button } from "components/Button";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router";
import {PhotoFilterGrid} from 'components/PhotoFilterGrid';
import "./style.css";
import html2canvas from "html2canvas";
import saveAs from "file-saver";
import { useRef, useEffect } from "react";
import * as AWS from 'aws-sdk';
import { S3 } from 'aws-sdk';


// AWS 설정
const awsConfig = {
  region: 'ap-northeast-2', 
  credentials: new AWS.Credentials('AKIA2ZMSTBKSABGLE55S', 'kKwA1kt7HQb97YVTBYchqFw0SD21WFd/H5V0eK5u'), 
};

const s3 = new AWS.S3();

export const FileDownloadPage = (): JSX.Element => {
  let imageBlob: Blob | null = null;
  let stdNum=202145816;
  const location = useLocation();
  const { numPhoto, compressedImages, selectedFrame, selectedFilter } = location.state;
  console.log(compressedImages);
  const [selectedOption, setSelectedOption] = useState<number>(0); // 마지막으로 선택된 옵션 저장
  const navigate = useNavigate(); 
  

  
  const divRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!divRef.current) return;
    canvasToJpeg();
  }, [divRef]);



  // const handleDownload = async () => {
  //   if (!divRef.current) return;

  //   try {
  //     const div = divRef.current;
  //     const canvas = await html2canvas(div, { scale: 2 });
  //     canvas.toBlob((blob) => {
  //       if (blob !== null) {
  //         saveAs(blob, "result.png");
  //       }
  //     });
  //   } catch (error) {
  //     console.error("Error converting div to image:", error);
  //   }
  // };

  
  const canvasToJpeg = async () => {
    if (!divRef.current) return;

    try {
      const div = divRef.current;
      const canvas = await html2canvas(div, { scale: 2 });
      canvas.toBlob((blob) => {
        if (blob !== null) {
          console.log(blob)
          imageBlob = blob;
        }
      }, 'image/jpeg', 0.8);
    } catch (error) {
      console.error("Error converting div to image:", error);
    }
  };

  

  const uploadBlobToS3 = async (blob: Blob, fileName: string) => {
    const params: AWS.S3.PutObjectRequest = {
      Bucket: 'socframe',
      Key: fileName,
      Body: blob,
      ContentType: 'image/jpeg', 
      ACL: 'public-read',
    };

    try {
      const response = await s3.upload(params).promise();
      console.log('Uploaded to S3:', response);
    } catch (error) {
      console.error('Error uploading to S3:', error);
    }
  };

  const handlePrevClick = () => {
    uploadBlobToS3(imageBlob!, stdNum.toString() + '.jpeg');
  };
  const handleNextClick = () => {
    if (imageBlob) {
      saveAs(imageBlob, "result.jpeg");
    }
  };
  const divStyle: React.CSSProperties = {
    width: '1200px',
    height: '1800px'
  };
  return (
    <div>
      <div ref={divRef} style={divStyle}>
        <PhotoFilterGrid numPhoto = {numPhoto} photoImages = {compressedImages} selectedFrame = {selectedFrame} selectedFilter = {selectedOption} />
      </div>
      <div className="bottom-bar">
            <Button className="button-instance-prev" text="submit" onClick={handlePrevClick}/>
            <div className="text-wrapper-3">End!</div>
            <Button className="button-instance-next" text="download" onClick={handleNextClick}/>
          </div>
    </div>
  );
};
