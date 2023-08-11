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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const files = e.target.files;
    if (!files) return;
    const file = files[0];
  
    resizeImage(file, 1000, 750).then((resizedImage) => {
      setImage(resizedImage);
    });
  };

  const getCropData = useCallback(() => {
    if (typeof cropperRef.current?.cropper !== "undefined") {
      onCrop(cropperRef.current?.cropper.getCroppedCanvas().toDataURL());
      setImage(null);
    }
  },[onCrop]);

  const resizeImage = (file: File, maxWidth: number, maxHeight: number): Promise<string> => {
    return new Promise((resolve) => {
      const img = new Image();
      img.src = URL.createObjectURL(file);
      img.onload = () => {
        const canvas = document.createElement("canvas");
        let width = img.width;
        let height = img.height;
  
        if (width > height) {
          if (width > maxWidth) {
            height *= maxWidth / width;
            width = maxWidth;
          }
        } else {
          if (height > maxHeight) {
            width *= maxHeight / height;
            height = maxHeight;
          }
        }
  
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        ctx?.drawImage(img, 0, 0, width, height);
  
        resolve(canvas.toDataURL());
      };
    });
  };

  return (
    <>
      <input
        type="file"
        ref={inputRef}
        style={{ display: "none" }}
        onChange={handleFileChange}
      />
      <span onClick={handleChildrenClick}>{children}</span>
      {image && (
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
                  width={800}
                  height={500}
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
        </div>
      )}
    </>
  );
};

export default ImageCropper;