import Highcharts from "highcharts";
import highchartsSankey from "highcharts/modules/sankey";
import HighchartsReact from "highcharts-react-official";
import { Asap } from "@next/font/google";

const asap = Asap({ weight: "400", subsets: ["latin"] });

if (typeof Highcharts === "object") {
  highchartsSankey(Highcharts);
}

const Sankey = (props: any) => {
  const options: any = {
    chart: {
      height: props.height,
      type: "sankey",
      style: {
        fontFamily: asap.style.fontFamily,
      },
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
        animation: false,
        nodes: props.nodes,
        nodeWidth: props.nodeWidth,
        dataLabels: {
          style: {
            fontSize: "13px",
          },
        },
        tooltip: {
          nodeFormatter: function (this: typeof options, err: any) {
            return `${this.name}<br><b>${this.sum.toLocaleString(
              "cs-CZ"
            )} hlasů</b>`;
          },
        },
      },
    ],
  };

  return <HighchartsReact highcharts={Highcharts} options={options} />;
};

export { Sankey };
