import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { formatTime } from "@/lib/utils";

const TimerComponent: React.FC = () => {
  const timeLeft = useSelector((state: RootState) => state.timer.timeLeft);

  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <h1 style={{ marginLeft: "8px" }}>
        Aprovecha la oferta, queda poco tiempo: {formatTime(timeLeft)}
      </h1>
    </div>
  );
};

export default TimerComponent;
