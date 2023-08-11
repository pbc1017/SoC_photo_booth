import React from 'react';
import { PhotoEmpty } from "../PhotoEmpty";
interface PhotoEditGridProps {
  numPhoto: number;
}

export const PhotoEditGrid: React.FC<PhotoEditGridProps> = ({ numPhoto }) => {
  return(
    <div className='container'>
      <div className='items'><PhotoEmpty widthIsBigger={true} index={0} className={''}></PhotoEmpty></div>
      <div className='items'><PhotoEmpty widthIsBigger={false} index={1} className={''}></PhotoEmpty></div>
      <div className='items'><PhotoEmpty widthIsBigger={true} index={2} className={''}></PhotoEmpty></div>
      <div className='items'><PhotoEmpty widthIsBigger={false} index={3} className={''}></PhotoEmpty></div>
      <div className='items'><PhotoEmpty widthIsBigger={true} index={4} className={''}></PhotoEmpty></div>
      <div className='items'><PhotoEmpty widthIsBigger={false} index={5} className={''}></PhotoEmpty></div>
    </div>
  )
};