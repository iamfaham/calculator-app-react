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
  const periodClick = () => {
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

  // User clicks number
  const handleClickNumber = () => {
    const numberString = value.toString();
    let numberValue;
    if (numberString === 0 && calc.num === 0) {
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

  //  User click equals
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

  //  User clicks factorial
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

  // User clicks invert sign button
  const invertSignClick = () => {
    setCalc({
      num: calc.num ? calc.num * -1 : 0,
      res: calc.num ? calc.res * -1 : 0,
      sign: "",
    });
  };

  const handleBtnClick = () => {
    const results = {
      ".": periodClick,
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
      return handleClickNumber();
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
