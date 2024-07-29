import React from "react";
import { useEffect, useState } from "react";
import { ImageCropper } from "components/ImageCropper";
import { useImageCompress } from "hook/useImageCompress";
import { dataURItoFile } from "utils/common";
import deleteButton from "assets/images/delete.png";
import insertButton from "assets/images/insert.png";
import "./index.css";

interface Props {
  className: string;
  widthIsBigger: boolean;
  index: number;
  onCompressImage: (index: number, compressedImage: string) => void;
}

export const PhotoEmpty: React.FC<Props> = ({
  className,
  widthIsBigger,
  index,
  onCompressImage,
}) => {
  const [uploadImage, setUploadImage] = useState<string | null>(null);
  const [compressedImage, setCompressedImage] = useState<string | null>(null);
  const { isLoading: isCompressLoading, compressImage } = useImageCompress();

  const handleUploadImage = (image: string) => {
    if (image) {
      setUploadImage(image);
    } else {
      // 이미지 삭제 처리
      setCompressedImage(null);
      setUploadImage(null);
    }
  };

  const handleCompressImage = async () => {
    if (!uploadImage) return;

    const imageFile = dataURItoFile(uploadImage);

    const compressedImage = await compressImage(imageFile);

    // 이미지 서버 저장 로직
    if (!compressedImage) return;
    const imageUrl = URL.createObjectURL(compressedImage);
    setCompressedImage(imageUrl);

    onCompressImage(index, imageUrl);

    const aspectRatioStyle = widthIsBigger
      ? { width: "100%", paddingBottom: "75%" }
      : { width: "75%", paddingBottom: "100%" };
  };

  useEffect(() => {
    if (uploadImage) {
      handleCompressImage();
    }
  }, [uploadImage]);

  const aspectRatio = widthIsBigger ? 4 / 3 : 3 / 4;

  const aspectRatioStyle = widthIsBigger
    ? { width: "200px", height: "150px" }
    : { width: "150px", height: "200px" };

  return (
    <div
      className={`PhotoEmpty-${className}-${index}`}
      style={aspectRatioStyle}
    >
      <ImageCropper
          aspectRatio={aspectRatio}
          onCrop={handleUploadImage}
          hasImage={Boolean(compressedImage)}
        >
        <div className="givenPhoto">
          {compressedImage ? (
            <img src={compressedImage} />
          ) : (
            <div className="cover">
              {isCompressLoading ? "이미지 압축 중.." : ""}
            </div>
          )}
          
            <button
              className={`image-upload-button ${
                compressedImage ? "top-right" : "center"
              }`}
            >
              <img
                className="button-img"
                alt="camera"
                src={compressedImage ? deleteButton : insertButton}
              />
            </button>
        </div>
      </ImageCropper>
    </div>
  );
};
