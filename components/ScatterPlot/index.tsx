import Highcharts, { seriesType } from "highcharts";
import HighchartsReact from "highcharts-react-official";

const ScatterPlot = (props: any) => {
  const options = {
    title: {
      text: undefined,
    },
    chart: {
      type: "scatter",
      height: props.height,
      animation: false,
    },
    series: props.series,
    xAxis: {
      title: { text: props.xTitle },
      labels: {
        format: props.xLabelsFormat,
      },
    },
    yAxis: {
      categories: props.categories,
      reversed: true,
      title: {
        enabled: false,
      },
      labels: {
        padding: props.yLabelPadding,
        allowOverlap: props.yLabelOverlap,
      },
      crosshair: props.yCrosshair,
    },
    tooltip: { formatter: props.tooltipFormatter },
    plotOptions: {
      series: {
        animation: false,
      },
    },
    credits: {
      enabled: false,
    },
    legend: {
      itemDistance: props.legendItemDistance,
      margin: props.legendMargin,
      verticalAlign: props.legendVerticalAlign,
      align: props.legendAlign,
      padding: props.legendPadding,
    },
  };

  return <HighchartsReact highcharts={Highcharts} options={options} />;
};

export { ScatterPlot };
