import React from 'react';
import "./index.css";

interface Props {
  numPhoto: number;
  photoImages: string[];
  selectedFrame : number;
}

export const PhotoFrameGrid : React.FC<Props> = ({ numPhoto, photoImages, selectedFrame }) => {
  const backgroundColor = getBackgroundColor(selectedFrame);

  const photoList = Array.from({ length: numPhoto }, (_, index) => (
    <div key={index}  className={`rectangle-${numPhoto}-${index+1}`}>
      <img className='photoImg' src={photoImages[index]} />
    </div>
  ));
  //<div className='items'><PhotoEmpty widthIsBigger={true}></PhotoEmpty></div>
  
  return(
    <div className='container' style={{ backgroundColor }}>
      {photoList}
    </div>
  );

};

function getBackgroundColor(selectedFrame: number): string {
  switch (selectedFrame) {
    case 0:
      return "#CBECFF";
    case 1:
      return "#000000";
    case 2:
      return "#FFFFFF";
    case 3:
      return "#7896FF";
    default:
      return "#d9d9d9"; // 기본 배경색
  }
}
export default PhotoFrameGrid;