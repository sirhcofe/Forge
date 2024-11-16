import capybara from "@/../public/capybara.jpg";
import { Radar } from "react-chartjs-2";
import {
  Chart,
  RadialLinearScale,
  LineElement,
  PointElement,
  Filler,
} from "chart.js";

Chart.register(RadialLinearScale, LineElement, PointElement, Filler);
const RadarChartComponent = () => {
  const data = {
    labels: ["Frontend", "Backend", "UI/UX", "Web3", "Linux", "AI"],
    datasets: [
      {
        label: "Skillsets",
        data: [65, 59, 40, 60, 30, 10],
        fill: true,
        backgroundColor: "rgba(142, 202, 230, 0.2)",
        borderColor: "#8ECAE6",
        pointBackgroundColor: "#023047",
        pointBorderColor: "#fff",
        pointHoverBackgroundColor: "#fff",
        pointHoverBorderColor: "#023047",
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        display: false,
      },
    },
    elements: {
      line: {
        borderWidth: 3,
      },
    },
    scales: {
      r: {
        angleLines: {
          display: false,
        },
        suggestedMin: 0,
        suggestedMax: 100,
      },
    },
    maintainAspectRatio: false,
  };

  return <Radar data={data} options={options} />;
};

const MainContent = () => {
  return (
    <div className="relative w-full h-full flex flex-col gap-y-2 p-5">
      <div className="w-full flex gap-x-3">
        <img
          src={capybara}
          alt="capybara"
          className="w-24 h-24 rounded-full border-[3px] border-primary-dark"
        />
        <div className="flex flex-1 flex-col gap-y-1">
          <h2>Mengo</h2>
          <p>I love mango</p>
        </div>
      </div>
      <div className="flex flex-1">
        <RadarChartComponent />
      </div>
    </div>
  );
};

export default MainContent;
