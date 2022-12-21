import React from "react";
import Link from "next/link";
import Head from "next/head";
import { ScatterPlot } from "../components";
import data from "../data/scatter-salat.json";
import ingred from "../data/scatter-salat-ingred.json";
import kraje from "../data/scatter-salat-kraje.json";

const series = [
  ...kraje.map((kraj, index) => {
    return {
      data: data.map((item, i) => {
        return { x: item[index] * 100, y: i };
      }),
      name: kraj,
      visible: [
        "Česká republika",
        "Hlavní město Praha",
        "Kraj Vysočina",
      ].includes(kraj)
        ? true
        : false,
      marker: {
        radius: kraj === "Česká republika" ? 5 : 4,
      },
    };
  }),
];

const ScatterSalat = () => {
  return (
    <>
      <Head>
        <title>
          Jaká je pravděpodobnost přidání suroviny do bramborového salátu
        </title>
      </Head>
      <h1 className="text-2xl font-bold leading-6 pb-2">
        Jaká je pravděpodobnost přidání suroviny do&#160;bramborového salátu
      </h1>
      <h2 className="leading-4 pb-0">
        Kliknutím na název kraje zobrazíte nebo skryjete jeho data
      </h2>
      <ScatterPlot
        series={series}
        categories={ingred}
        height={800}
        xTitle={"pravděpodobnost"}
        xLabelsFormat={"{text} %"}
        yLabelPadding={0}
        yLabelOverlap={true}
        yCrosshair={true}
        legendItemDistance={0}
        legendMargin={0}
        legendPadding={8}
        legendVerticalAlign={"top"}
        legendAlign={"left"}
        tooltipFormatter={function (this: any) {
          const rounded = (Math.round(this.x * 10) / 10).toLocaleString(
            "cs-CZ"
          );
          return (
            "<strong>" +
            this.series.name +
            "</strong>" +
            "<br>" +
            ingred[this.y] +
            "<br>" +
            rounded +
            " %"
          );
        }}
      >
        {" "}
      </ScatterPlot>
      <p className="text-xs text-end">
        Zdroj:{" "}
        <Link
          href={"https://en.wikipedia.org/wiki/Bradley%E2%80%93Terry_model"}
        >
          Bradley-Terry model
        </Link>{" "}
        nad{" "}
        <Link href={"https://github.com/DataRozhlas/brsalat-analyza"}>
          daty iROZHLAS.cz
        </Link>
        , výpočty{" "}
        <Link href={"https://twitter.com/HynekCigler"}>Hynka Cíglera</Link>
      </p>
    </>
  );
};

export default ScatterSalat;
