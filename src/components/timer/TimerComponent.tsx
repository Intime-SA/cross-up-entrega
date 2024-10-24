import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

const TimerComponent: React.FC = () => {
  const timeLeft = useSelector((state: RootState) => state.timer.timeLeft);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <div>
      <h1>Temporizador: {formatTime(timeLeft)}</h1>
    </div>
  );
};

export default TimerComponent;
