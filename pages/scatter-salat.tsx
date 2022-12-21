import { ScatterPlot } from "../components";
import React from "react";
import prumery from "../data/scatter-salat-prumery.json";
import data from "../data/scatter-salat.json";
import ingred from "../data/scatter-salat-ingred.json";
import kraje from "../data/scatter-salat-kraje.json";
import { includes } from "lodash";

const series = [
  {
    data: prumery.map((item, index) => {
      return { x: item, y: index };
    }),
    name: "Česká republika",
  },
  ...kraje.map((kraj, index) => {
    return {
      data: data.map((item, i) => {
        return { x: item[index], y: i };
      }),
      name: kraj,
      visible: ["Hlavní město Praha", "Jihomoravský kraj"].includes(kraj)
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
