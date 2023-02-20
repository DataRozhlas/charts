import { useState } from "react";
import Highcharts from "highcharts";
import hcAccess from "highcharts/modules/accessibility";
import hcMore from "highcharts/highcharts-more";
import hcDumbbell from "highcharts/modules/dumbbell";
import hcLollipop from "highcharts/modules/lollipop";
import HighchartsReact from "highcharts-react-official";
import { usePostMessageWithHeight } from "../hooks";
import data from "../data/ceny-repre.json";
import Head from "next/head";
import Link from "next/link";

if (typeof Highcharts === "object") {
  hcAccess(Highcharts);
  hcMore(Highcharts);
  hcDumbbell(Highcharts);
  hcLollipop(Highcharts);
}

const LolCeny = () => {
  const { containerRef, postHeightMessage } =
    usePostMessageWithHeight("cro-lollipop-ceny");

  const [options, setOptions] = useState({
    chart: {
      type: "lollipop",
      inverted: true,
      height: 1400,
    },
    title: {
      text: undefined,
    },
    credits: {
      enabled: false,
    },
    legend: {
      enabled: false,
    },
    xAxis: {
      type: "category",
      labels: {},
    },
    yAxis: [
      {
        min: -10,
        max: 110,
        title: {
          enabled: false,
        },
        opposite: true,
        tickInterval: 20,
        labels: {
          format: "{value} %",
          x: -8,
        },
      },
    ],
    plotOptions: {
      series: {
        color: "#d52834",
        dataLabels: {
          align: function (this: any) {
            return this.point.y > 0 ? "left" : "right";
          },
          enabled: true,
          formatter: function (this: any) {
            const rounded = Math.round(this.y * 10) / 10;
            return this.y > 0
              ? `+${rounded.toLocaleString("cs-CZ")} %`
              : `${rounded.toLocaleString("cs-CZ")} %`;
          },
          padding: 8,
        },
      },
    },
    tooltip: {
      formatter: function (this: any) {
        const rounded = Math.round(this.y * 10) / 10;
        return this.point.description;
      },
    },
    series: [
      {
        name: "Změna ceny",
        data: data,
      },
    ],
  });
  return (
    <div className="bg-white" ref={containerRef}>
      <Head>
        <title>Nejvíc zdražil cukr, vejce a sádlo</title>
      </Head>
      <h1 className="text-2xl font-bold leading-6 pb-2">
        Nejvíc zdražil cukr, vejce a sádlo
      </h1>
      <h2 className="inline-flex mb-1 items-center justify-start gap-2 w-full wrap">
        Změna ceny u vybraných potravin mezi lednem 2022 a lednem 2023
      </h2>
      <HighchartsReact
        highcharts={Highcharts}
        options={options}
        immutable={true}
      />
      <p className="text-xs text-end">
        Zdroj dat:{" "}
        <Link
          href={
            "https://vdb.czso.cz/vdbvo2/faces/index.jsf?page=vystup-objekt&pvo=CEN02A42&z=T&f=TABULKA&skupId=1793&katalog=31779&c=v3~8__RP2023&&str=v1151#w="
          }
          target="_blank"
        >
          Český statistický úřad
        </Link>
      </p>
    </div>
  );
};

export default LolCeny;
