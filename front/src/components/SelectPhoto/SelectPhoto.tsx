import React from "react";

type SelectNumberProps = {
};

export const SelectPhoto = ({
  
}: SelectNumberProps): JSX.Element => {
  return (
    <div className="options">
      {/* {options.map((option, index) => (
        <img
          key={index}
          className={`option-${index}`}
          alt="Option"
          src={selectedOption === index ? selectedOptions[index] : option}
          onClick={() => handleOptionClick(index)}
        />
      ))} */}
    </div>
  );
};
