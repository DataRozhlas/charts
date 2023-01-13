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
      type: "sankey",
    },
    title: {
      text: undefined,
    },
    credits: {
      enabled: false,
    },
    series: [
      {
        data: props.data,
        name: "",
        nodes: props.nodes,
        nodeWidth: props.nodeWidth,
      },
    ],
  };

  return <HighchartsReact highcharts={Highcharts} options={options} />;
};

export { Sankey };
