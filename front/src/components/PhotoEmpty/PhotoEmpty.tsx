import PropTypes from "prop-types";
import React from "react";
import { useEffect, useState } from "react";
import {ImageCropper} from "components/ImageCropper";
import {useImageCompress} from "hook/useImageCompress";
import { dataURItoFile } from "utils/common";
import "./index.css";

interface Props{
  widthIsBigger: boolean;
  index: number;
  onCompressImage: (index: number, compressedImage: string) => void;
}

export const PhotoEmpty :React.FC<Props> = ({ 
  widthIsBigger,
  index, 
  onCompressImage
}) => {
  const [uploadImage, setUploadImage] = useState<string | null>(null);
  const [compressedImage, setCompressedImage] = useState<string | null>(null);
  const { isLoading: isCompressLoading, compressImage } = useImageCompress();

  const handleUploadImage = (image: string) => setUploadImage(image);

  const handleCompressImage = async () => {
    if (!uploadImage) return;

    const imageFile = dataURItoFile(uploadImage);

    const compressedImage = await compressImage(imageFile);

    // 이미지 서버 저장 로직
    if (!compressedImage) return;
    const imageUrl = URL.createObjectURL(compressedImage);
    setCompressedImage(imageUrl);
    onCompressImage(index, imageUrl);
  };

  useEffect(() => {
    if (uploadImage) {
      handleCompressImage();
    }
  }, [uploadImage]);

  const aspectRatio = widthIsBigger ? 4 / 3 : 3 / 4;

  return (
    <div className="PhotoEmpty">
      <div className="givenPhoto">
        {compressedImage ? (
          <img src={compressedImage} />
        ) : (
          <div className="cover">
            {isCompressLoading ? "이미지 압축 중.." : "이미지가 없어요."}
          </div>
        )}
        <ImageCropper aspectRatio={aspectRatio} onCrop={handleUploadImage}>
          <button className="image-upload-button">📷</button>
        </ImageCropper>
      </div>
    </div>
  );
}
