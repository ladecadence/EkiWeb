import { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);
import { Line } from 'react-chartjs-2';
import { ApiTelemetry } from "../models/apitelemetry";
import "chart.js/auto";

interface altChartProps {
  telemetry: ApiTelemetry[];
}

function AltChart({ telemetry }: altChartProps) {
  const [data, setData] = useState({
    labels: [] as string[],
    datasets: [
      {
        data: [] as number[],
        borderColor: 'rgb(255, 99, 132)',
      }
    ]
  })

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
        display: false,
      },
      title: {
        display: true,
        text: 'Altitude',
      },
    },
  };

  useEffect(() => {
    const points = telemetry.map((telem) => telem.alt )
    const labels = telemetry.map((telem) => telem.time )

    setData({
      ...data,
      labels: labels,
      datasets: [
        {
          data: points,
          borderColor: 'purple',
        }
      ]
    });

  }, [telemetry])

  return (
    <div className="alt-chart-container">
      <Line options={options} data={data} height="200px" width="200px" />
    </div>
  );
}

export default AltChart;