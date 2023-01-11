import React from "react";
import Link from "next/link";
import Head from "next/head";
import data from "../data/sankey-prez.json";
import { usePostMessageWithHeight } from "../hooks";

let series: { from: string; to: string; weight: number }[] = [];

data.map(volici => {
  const from: string = Object.keys(volici)[0];
  Object.keys(volici[from]).map(to => {});
});

const SankeyPrez = () => {
  return <div>hovno</div>;
};

export default SankeyPrez;
