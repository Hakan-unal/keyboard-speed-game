import { Card, Input, Row, Typography, Spin, Modal, Button } from "antd";
import useCountDown from "./hooks/useCountDown";
import { useState } from "react";
import { words } from "./staticData/words";

const { Paragraph } = Typography;
const App = () => {
  const [score, setScore] = useState<number>(0);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [inputValue, setInputValue] = useState("");
  const [isTimeEnd, setIsTimeEnd] = useState<boolean>(false);

  const handleTime = () => {
    setIsTimeEnd(true);
  };

  const handleResetGame = () => {
    setIsTimeEnd(false);
    setScore(0)
    resetCounter(59);
    setInputValue("")
  };

  const handleInput = (e: any) => {
    setInputValue(e.target.value);

    let tempScore = score;
    const shuffleIndex = Math.round(Math.random() * (words.length - 1));

    if (words[currentIndex] === e.target.value) {
      tempScore++;
      setScore(tempScore);
      setCurrentIndex(shuffleIndex);
      setInputValue("");
    }
  };

  const { secondsLeft, resetCounter } = useCountDown({
    initialSecond: 59,
    onTimerEnd: handleTime,
  });

  return (
    <Spin spinning={false}>
      <Row justify={"center"}>
        <Card
          bordered
          style={{ textAlign: "center" }}
          title={secondsLeft}
          extra={"Score:" + score}
        >
          <Paragraph keyboard>{words[currentIndex]}</Paragraph>
          <Input value={inputValue} onChange={handleInput} />
        </Card>
      </Row>

      <Modal
        style={{ textAlign: "center" }}
        title={"Your Score: " + score}
        closeIcon={null}
        footer={null}
        open={isTimeEnd}
      >
        <Button onClick={handleResetGame} block>
          {" "}
          Reset{" "}
        </Button>
      </Modal>
    </Spin>
  );
};

export default App;
