import React from "react";

type SelectNumberProps = {
  options: string[];
  selectedOptions: string[];
  selectedOption: number | null;
  handleOptionClick: (optionIndex: number) => void;
};

export const SelectNumber = ({
  options,
  selectedOptions,
  selectedOption,
  handleOptionClick,
}: SelectNumberProps): JSX.Element => {
  return (
    <div className="options">
      {options.map((option, index) => (
        <img
          key={index}
          className={`option-${index}`}
          alt="Option"
          src={selectedOption === index ? selectedOptions[index] : option}
          onClick={() => handleOptionClick(index)}
        />
      ))}
    </div>
  );
};
