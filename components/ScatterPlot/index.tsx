import Highcharts, { seriesType } from "highcharts";
import HighchartsReact from "highcharts-react-official";

const ScatterPlot = (props: any) => {
  const options = {
    title: {
      text: undefined,
    },
    chart: {
      type: "scatter",
      height: 750,
      animation: false,
    },
    series: props.series,
    xAxis: {},
    yAxis: {
      categories: props.categories,
      reversed: true,
      title: {
        enabled: false,
      },
    },
    plotOptions: {
      series: {
        animation: false,
      },
    },
    credits: {
      enabled: false,
    },
  };

  return <HighchartsReact highcharts={Highcharts} options={options} />;
};

export { ScatterPlot };
