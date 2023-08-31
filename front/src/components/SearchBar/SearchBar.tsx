import React, { useState } from 'react';
import "./index.css";
import {Button} from "components/Button";
interface Props {
  
}

export const SearchBar : React.FC<Props> = ({}) => {
  
  const [searchResults, setSearchResults] = useState<string[]>([]);
  const [photoImages, setPhotoImages] = useState<string[]>([]); // 내부 상태로 추가

  const handleSearchClick = async () => {
    const searchTerm = (document.querySelector('.SearchInput') as HTMLInputElement).value;

    // 검색어를 서버로 보내고 검색 결과를 받아옵니다.
    try {
      const response = await fetch(`http://localhost/api/search?term=${searchTerm}`);
      const searchData = await response.json();
      setSearchResults(searchData.results); // 서버에서 받은 검색 결과를 상태로 설정
    } catch (error) {
      console.error('검색 중 오류 발생:', error);
    }
  };
  return(
    <div className='searchbar'>
      <input type="text" className="SearchInput" />
      <Button className="button" text="찾기" onClick={handleSearchClick} />
      <div className='search-results'>
        {searchResults.map((result, index) => (
          <img key={index} src={result} alt={`Result ${index}`} />
        ))}
      </div>
    </div>
  );

};

export default SearchBar;