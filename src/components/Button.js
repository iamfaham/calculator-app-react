import React, { useContext } from "react";
import { CalcContext } from "../context/CalcContext";

const getStyleName = (btn) => {
  const className = {
    "=": "equals",
    "*": "operations",
    "+": "operations",
    "-": "operations",
    "!": "operations",
    "%": "operations",
    "/": "operations",
    "+-": "operations",
    AC: "operations",
  };
  return className[btn];
};

const Button = ({ value }) => {
  const { calc, setCalc } = useContext(CalcContext);
  // User clicks period
  const commaClick = () => {
    setCalc({
      ...calc,
      num: !calc.num.toString().includes(".") ? calc.num + value : calc.num,
    });
  };
  // User clicks AC
  const clearClick = () => {
    setCalc({
      sign: "",
      num: 0,
      res: 0,
    });
  };
  // Usef clicks number

  const handleClickButton = () => {
    const numberString = value.toString();
    let numberValue;
    if (numberString === 0 && calc.nunm === 0) {
      numberValue = "0";
    } else {
      numberValue = Number(calc.num + numberString);
    }

    setCalc({
      ...calc,
      num: numberValue,
    });
  };

  // User clicks some operation
  const signClick = () => {
    setCalc({
      sign: value,
      res: !calc.res && calc.num ? calc.num : calc.res,
      num: 0,
    });
  };

  //   user click equals
  const equalsClick = () => {
    if (calc.res && calc.num) {
      const math = (a, b, sign) => {
        const result = {
          "+": (a, b) => a + b,
          "-": (a, b) => a - b,
          "*": (a, b) => a * b,
          "/": (a, b) => a / b,
        };
        return result[sign](a, b);
      };
      setCalc({
        res: math(calc.res, calc.num, calc.sign),
        sign: "",
        num: 0,
      });
    }
  };

  //   User clicks Percent

  const percentClick = () => {
    setCalc({
      num: calc.num / 100,
      res: calc.res / 100,
      sign: "",
    });
  };

  //   user clicks factorial sign

  const factorialClick = () => {
    const factorial = () => {
      var ans = 1;
      for (var i = calc.num; i > 0; i--) {
        ans *= i;
      }
      return ans;
    };
    setCalc({
      num: factorial(),
      res: factorial(),
      sign: "",
    });
  };

  // User clicks invert Sign button
  const invertSignClick = () => {
    setCalc({
      num: calc.num ? calc.num * -1 : 0,
      res: calc.num ? calc.res * -1 : 0,
      sign: "",
    });
  };

  const handleBtnClick = () => {
    const results = {
      ".": commaClick,
      AC: clearClick,
      "/": signClick,
      "!": factorialClick,
      "*": signClick,
      "-": signClick,
      "+": signClick,
      "%": percentClick,
      "=": equalsClick,
      "+-": invertSignClick,
    };
    if (results[value]) {
      return results[value]();
    } else {
      return handleClickButton();
    }
  };
  return (
    <button
      onClick={handleBtnClick}
      className={`${getStyleName(value)} button`}
    >
      {value}
    </button>
  );
};

export default Button;
