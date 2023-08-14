import ReactDOM from 'react-dom';
import { useRef, useState, useCallback } from "react";
import { Cropper, ReactCropperElement } from "react-cropper";
import "cropperjs/dist/cropper.css";

interface PropsType {
  onCrop: (image: string) => void;
  aspectRatio: number;
  children: React.ReactNode;
  hasImage: boolean; 
}

export const ImageCropper = ({ children, aspectRatio, onCrop, hasImage }: PropsType) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const cropperRef = useRef<ReactCropperElement>(null);
  const [image, setImage] = useState<null | string>(null);
  const originalImageRef = useRef<string | null>(null); // 원본 이미지 URL을 저장할 ref 생성

  const handleChildrenClick = useCallback(() => {
    if (hasImage) {
      const isConfirmed = window.confirm("이미지를 삭제하시겠습니까?");
      if (isConfirmed) {
        onCrop(""); // PhotoEmpty 컴포넌트에서 이미지 상태 업데이트
        setImage(null); // ImageCropper 컴포넌트에서 이미지 상태 업데이트
      }
    } else {
      if (inputRef.current) inputRef.current.click();
    }
  }, [hasImage, onCrop]);

  const resizeImage = (imageSrc: string, factor = 8): Promise<string> => {
    return new Promise((resolve) => {
      const img = new Image();
      img.src = imageSrc;
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const width = img.width / factor;
        const height = img.height / factor;
  
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        ctx?.drawImage(img, 0, 0, width, height);
  
        resolve(canvas.toDataURL());
      };
    });
  };
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const files = e.target.files;
    if (!files) return;
    const file = files[0];
  
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = async () => {
      const originalSrc = reader.result as string;
      originalImageRef.current = originalSrc; // 원본 이미지를 저장
      const resizedImage = await resizeImage(originalSrc); // 이미지 리사이징
      setImage(resizedImage);
    };
  };
  
  const getCropData = useCallback(() => {
    if (cropperRef.current?.cropper && originalImageRef.current) {
      const cropper = cropperRef.current.cropper; // 여기서 cropper를 변수로 추출
  
      // 원본 이미지 불러오기
      const originalImage = new Image();
      originalImage.src = originalImageRef.current;
  
      originalImage.onload = () => {
        // 크롭 영역 가져오기
        const cropData = cropper.getData(); // 여기서 직접 사용
  
        // 원본 이미지와 리사이징된 이미지 사이의 스케일 계산
        const scale = originalImage.width / (cropper.getImageData().naturalWidth || 1);
  
        // 캔버스 생성 및 크기 설정
        const canvas = document.createElement('canvas');
        canvas.width = cropData.width * scale;
        canvas.height = cropData.height * scale;
        const ctx = canvas.getContext('2d');
  
        // 원본 이미지에서 크롭 영역에 해당하는 부분을 그리기
        ctx?.drawImage(
          originalImage,
          cropData.x * scale, cropData.y * scale,
          cropData.width * scale, cropData.height * scale,
          0, 0,
          cropData.width * scale, cropData.height * scale
        );
  
        // 크롭된 이미지 데이터 가져오기
        const croppedDataURL = canvas.toDataURL();
  
        // 부모 컴포넌트로 크롭된 이미지 데이터 전달
        onCrop(croppedDataURL);
  
        // 크롭 모달 닫기
        setImage(null);
      };
    }
  }, [onCrop]);

  return (
    <>
      <input
        type="file"
        ref={inputRef}
        style={{ display: "none" }}
        onChange={handleFileChange}
      />
      <span onClick={handleChildrenClick}>{children}</span>
      {image && ReactDOM.createPortal(
        <div className="container">
          <div className="backdrop" />
          <div className="modal">
            <h3>이미지 편집하기</h3>
            <div className="content-wrapper">
              <div className="content">
              <Cropper
                ref={cropperRef}
                aspectRatio={aspectRatio}
                src={image}
                viewMode={1}
                style={{ width: 300, height: 300 }} // 화면에 표시되는 크기
                background={false}
                responsive
                autoCropArea={1}
                checkOrientation={false}
                guides
              />
              </div>
            </div>
            <div className="footer">
              <button onClick={() => setImage(null)}>취소</button>
              <button className="crop" onClick={getCropData}>
                적용하기
              </button>
            </div>
          </div>
        </div>,
        document.body // body에 직접 렌더링
      )}
    </>
  );
};

export default ImageCropper;