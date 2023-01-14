import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { Asap } from "@next/font/google";

const asap = Asap({ weight: "400", subsets: ["latin"] });

const Bar = (props: any) => {
  const options: any = {
    chart: {
      height: props.height,
      animation: false,
      type: "bar",
      style: {
        fontFamily: asap.style.fontFamily,
      },
    },
    colors: props.colors,
    title: {
      text: undefined,
    },
    credits: {
      enabled: false,
    },
    xAxis: { categories: props.categories },
    yAxis: {
      title: {
        enabled: props.yAxisTitleEnabled,
      },
      labels: {
        format: props.labelFormat,
      },
      reversedStacks: false,
    },
    plotOptions: {
      series: {
        stacking: props.stacking,
        animation: props.animation,
        dataLabels: {
          enabled: props.dataLabelsEnabled,
          format: "{point.y:.0f} %",
        },
      },
    },
    legend: {
      verticalAlign: props.legendVerticalAlign,
    },
    tooltip: {
      shared: props.sharedTooltip,
      valueSuffix: props.valueSuffix,
      valueDecimals: props.valueDecimals,
    },
    series: props.data,
  };

  return <HighchartsReact highcharts={Highcharts} options={options} />;
};

export { Bar };
