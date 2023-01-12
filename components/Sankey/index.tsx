import Highcharts from "highcharts";
import highchartsSankey from "highcharts/modules/sankey";
import HighchartsReact from "highcharts-react-official";

if (typeof Highcharts === "object") {
  highchartsSankey(Highcharts);
}

const Sankey = (props: any) => {
  const options = {
    chart: {
      height: props.height,
    },
    title: {
      text: undefined,
    },
    credits: {
      enabled: false,
    },
    accessibility: {
      point: {
        valueDescriptionFormat:
          "{index}. {point.from} to {point.to}, {point.weight}.",
      },
    },
    series: [
      {
        data: props.data,
        type: "sankey",
        name: "",
      },
    ],
  };

  return <HighchartsReact highcharts={Highcharts} options={options} />;
};

export { Sankey };
