import React from "react";

import option1 from "assets/images/option1.png";
import option2 from "assets/images/option2.png";
import option3 from "assets/images/option3.png";
import option4 from "assets/images/option4.png";
import option1_1 from "assets/images/option1-1.png";
import option2_1 from "assets/images/option2-1.png";
import option3_1 from "assets/images/option3-1.png";
import option4_1 from "assets/images/option4-1.png";

import "./style.css"

type SelectNumberProps = {
  selectedOption: number | null;
  handleOptionClick: (optionIndex: number) => void;
};

export const SelectNumber = ({
  selectedOption,
  handleOptionClick,
}: SelectNumberProps): JSX.Element => {
  const options = [option1, option2, option3, option4];
  const selectedOptions = [option1_1, option2_1, option3_1, option4_1];
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
