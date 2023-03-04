import Highcharts, { seriesType } from "highcharts";
import HighchartsReact from "highcharts-react-official";
import HighchartsMap from "highcharts/modules/map";
import { Asap } from "@next/font/google";
import world from "@highcharts/map-collection/custom/world-palestine-highres.geo.json";
//import geojson from "@highcharts/map-collection/countries/de/de-all.geo.json";

if (typeof Highcharts === "object") {
  HighchartsMap(Highcharts);
}

interface Props {
  data: {
    ["hc-a2"]: string;
    name: string | undefined;
    value: number;
  }[];
  setSelectedCountry: (selectedCountry: string) => void;
  colorAxisMax?: number;
}

const asap = Asap({ weight: "400", subsets: ["latin"] });

const decline = (n: number) => {
  switch (n) {
    case 1:
      return "návštěva";
    case 2:
      return "návštěvy";
    case 3:
      return "návštěvy";
    case 4:
      return "návštěvy";
    default:
      return "návštěv";
  }
};

const WorldMap = (props: Props) => {
  const options: any = {
    chart: {
      map: world,
      animation: false,
      style: {
        fontFamily: asap.style.fontFamily,
      },
    },
    title: {
      text: "",
    },
    credits: {
      enabled: false,
    },
    mapNavigation: {
      enabled: true,
      buttonOptions: {
        verticalAlign: "bottom",
      },
    },
    mapView: {
      zoom: -3,
    },
    tooltip: {
      formatter: function (this: any) {
        return (
          this.point.options.name +
          ": " +
          this.point.value +
          " " +
          decline(this.point.value)
        );
      },
    },

    colorAxis: {
      tickPixelInterval: 100,
      max: props.colorAxisMax,
      minColor: "#fee8c8",
      maxColor: "#e34a33",
    },
    series: [
      {
        data: props.data,
        joinBy: ["iso-a2", "hc-a2"],
        name: "Zemanovo cestování",
        states: {
          hover: {
            color: "#80cdc1",
            brightness: 1,
          },
          select: {
            color: "#018571",
            brightness: 1,
          },
        },
        dataLabels: {
          enabled: true,
          formatter: function (this: any) {
            return this.point.options.name;
          },
          nullFormatter: function (this: any) {
            return;
          },
        },
        events: {
          mouseOver: function (this: any, e: any) {
            document.body.style.cursor = "pointer";
          },
          mouseOut: function (this: any, e: any) {
            document.body.style.cursor = "";
          },
        },
        allowPointSelect: true,
        point: {
          events: {
            select: function (this: any, e: any) {
              props.setSelectedCountry(
                this.series.chart.getSelectedPoints()[0].options["hc-a2"]
              );
            },
            unselect: function (this: any, e: any) {
              props.setSelectedCountry(
                this.series.chart.getSelectedPoints()[0].options["hc-a2"]
              );
            },
          },
        },
      },
    ],
  };

  return (
    <HighchartsReact
      highcharts={Highcharts}
      options={options}
      constructorType="mapChart"
    />
  );
};

export { WorldMap };
