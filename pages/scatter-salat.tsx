import { ScatterPlot } from "../components";
import React from "react";
import data from "../data/scatter-salat.json";
import ingred from "../data/scatter-salat-ingred.json";
import kraje from "../data/scatter-salat-kraje.json";
import { includes } from "lodash";

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
    };
  }),
];

const ScatterSalat = () => {
  return (
    <ScatterPlot series={series} categories={ingred}>
      {" "}
    </ScatterPlot>
  );
};

export default ScatterSalat;
