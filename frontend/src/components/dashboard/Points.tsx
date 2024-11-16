import { Bar } from "react-chartjs-2";
import {
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Chart,
} from "chart.js";
import { useEffect, useRef, useState } from "react";

Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);
const WeeklyBarChart = () => {
  const daysOfWeek = [
    "Wk 40",
    "Wk 41",
    "Wk 42",
    "Wk 43",
    "Wk 44",
    "Wk 45",
    "Wk 46",
  ];
  const dataValues = daysOfWeek.map(() => Math.floor(Math.random() * 101));

  const data = {
    labels: daysOfWeek,
    datasets: [
      {
        label: "Weekly Values",
        data: dataValues,
        borderColor: "rgba(251, 133, 0, 1)",
        backgroundColor: "rgba(251, 133, 0, 0.5)",
        borderWidth: 2,
        borderRadius: Number.MAX_VALUE,
        borderSkipped: false,
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        display: false,
      },
    },
    maintainAspectRatio: false,
  };

  return <Bar data={data} options={options} />;
};

const Points = () => {
  const canvaRef = useRef<HTMLDivElement | null>(null);
  const [dimension, setDimension] = useState<{ width: number; height: number }>(
    { width: 0, height: 0 }
  );

  useEffect(() => {
    if (canvaRef.current) {
      setDimension({
        width: canvaRef.current.clientWidth,
        height: canvaRef.current.clientHeight * 1,
      });
    }
  }, [canvaRef]);

  return (
    <div className="relative w-full h-full flex flex-col">
      <h2>Points</h2>
      <div
        className="relative max-w-full py-5 flex flex-1 items-center justify-center"
        ref={canvaRef}
      >
        {dimension.width && (
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
            style={{
              maxHeight: `${dimension.height}px`,
              height: `${dimension.height}px`,
              width: `${dimension.width}px`,
            }}
          >
            <WeeklyBarChart />
          </div>
        )}
      </div>
    </div>
  );
};

export default Points;
