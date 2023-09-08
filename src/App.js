import "./App.css";
import Wrapper from "./components/Wrapper";
import Screen from "./components/Screen";
import ButtonBox from "./components/ButtonBox";
import Button from "./components/Button";
import CalcProvider from "./context/CalcContext";
import Header from "./components/Header";
import Footer from "./components/Footer";

const btnValues = [
  ["AC", "+-", "%", "/"],
  [7, 8, 9, "*"],
  [4, 5, 6, "-"],
  [1, 2, 3, "+"],
  [0, "00", ".", "!"],
  ["="],
];

function App() {
  return (
    <CalcProvider>
      <Header />
      <Wrapper>
        <Screen />
        <ButtonBox>
          {btnValues.flat().map((btn, index) => {
            return <Button value={btn} key={index} />;
          })}
        </ButtonBox>
      </Wrapper>
      <Footer />
    </CalcProvider>
  );
}

export default App;
