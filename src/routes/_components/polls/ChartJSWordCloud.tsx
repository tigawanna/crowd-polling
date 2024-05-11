import { Chart } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, CategoryScale, BarElement, LinearScale } from "chart.js";
import { WordCloudChart, WordCloudController, WordElement } from "chartjs-chart-wordcloud";


interface ChartJSWordCloudProps {
  data_list: { key: string; value: number }[];
}

export default function ChartJSWordCloud({ data_list }: ChartJSWordCloudProps) {
    const total = data_list.reduce((a, b) => a + b.value, 0);
  ChartJS.register(
    WordCloudChart,
    WordCloudController,
    WordElement,
    ArcElement,
    CategoryScale,
    BarElement,
    LinearScale
  );

  const data = {
    labels: data_list.map((d) => d.key),
    datasets: [
      {
        label: "",
        data: data_list.map((d) => 10 + d.value),
      },
    ],
  };

  return (
    <div style={{ width: "90vw", height: "90vh", display: "grid", padding: "10px" }}>
      <div style={{ width: "90vw", placeSelf: "center", height: "90vh" }}>
        <Chart
          type="wordCloud"
          className=""
          options={{
            plugins: {
              legend: {
                display: false,
              },
            },
          }}
          data={{
            labels: data_list.map((d) => d.key),
            datasets: [
              {
                label: "",
                data: data_list.map((d) => 10 + d.value),
                color: data_list.map((d) => generateRandomHSLColor(d.value)),
                size: (ctx) => {
                //   const total = ctx.dataset.data.reduce((a, b) => a + b, 0);
                  const value = ctx.dataset.data[ctx.dataIndex];
                  const minFontSize = 10;
                  const maxFontSize = 200;

                  const fontSize = minFontSize + (maxFontSize - minFontSize) * (value / total);

                  return fontSize;
                },
              },
            ],
          }}
        />
      </div>
    </div>
  );
}


export function generateRandomHSLColor(randomNumber: number): string {
  // Generate random values for hue (0-360), saturation (0-1), and lightness (0-1)
  const hue = Math.floor(Math.random() * 300);
  const saturation = Math.floor(Math.random() * (100 - randomNumber + 1)) + 30;
  const lightness = Math.floor(Math.random() * (70 - 40 + 1)) + 50;
  // Return the HSL color string with formatted values (ensure two decimal places for saturation and lightness)
  return `hsl(${hue}, ${saturation.toFixed(2)}%, ${lightness.toFixed(2)}%,1)`;
}
