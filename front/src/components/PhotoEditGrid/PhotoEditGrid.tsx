import React from 'react';
import { PhotoEmpty } from "../PhotoEmpty";
interface PhotoEditGridProps {
  numPhoto: number;
}

export const PhotoEditGrid: React.FC<PhotoEditGridProps> = ({ numPhoto }) => {
  return(
    <div className='container'>
      <div className='items'><PhotoEmpty widthIsBigger={true}></PhotoEmpty></div>
      <div className='items'><PhotoEmpty widthIsBigger={false}></PhotoEmpty></div>
      <div className='items'><PhotoEmpty widthIsBigger={true}></PhotoEmpty></div>
      <div className='items'><PhotoEmpty widthIsBigger={false}></PhotoEmpty></div>
      <div className='items'><PhotoEmpty widthIsBigger={true}></PhotoEmpty></div>
      <div className='items'><PhotoEmpty widthIsBigger={false}></PhotoEmpty></div>
    </div>
  )
};