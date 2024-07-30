import React, { useState } from 'react';
import "./index.css";
import {Button} from "components/Button";
import AWS from 'aws-sdk';

interface Props {}

export const SearchBar : React.FC<Props> = () => {
  
  const [searchResults, setSearchResults] = useState<string[]>([]);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const handleSearchClick = async () => {
    setSelectedImage(null);
    const searchTerm = (document.querySelector('.SearchInput') as HTMLInputElement).value;

    // AWS 설정
    AWS.config.update({
      region: 'ap-northeast-2',
      accessKeyId: 'AKIASXX4F2YI6VYLYLNU',
      secretAccessKey: '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'
    });
    
    const s3 = new AWS.S3();
    try {
      const data = await s3.listObjectsV2({ Bucket: 'soc-photo' }).promise();
      const filteredResults = (data.Contents?.filter(item => item.Key?.includes(searchTerm)).map(item => item.Key).filter(Boolean) || []) as string[];
      setSearchResults(filteredResults); 
    } catch (error) {
      console.error('S3 검색 중 오류 발생:', error);
    }
  };

  const handleImageNameClick = (imageName: string) => {
    setSelectedImage(imageName);
  };

  return(
    <div className='searchbar'>
      <input type="text" className="SearchInput" placeholder="이름을 입력하세요"/>
      <Button className="button" text="찾기" onClick={handleSearchClick} />
      <div className='search-results'>
        {searchResults.map((result, index) => (
          <p key={index} onClick={() => handleImageNameClick(result)}>
            {result}
          </p>
        ))}
      </div>
      {selectedImage && 
        <div className='selected-image'>
          <img className = 'selected-img' src={`https://soc-photo.s3.ap-northeast-2.amazonaws.com/${selectedImage}`} alt={`Selected ${selectedImage}`} />
        </div>
      }
    </div>
  );
};

export default SearchBar;
