import Head from "next/head";
import Link from "next/link";
import { useState, useEffect } from "react";
import { usePostMessageWithHeight } from "../hooks";
import { Bar } from "../components";
import data from "../data/zeman-cesty.json";

const convertDate = (date: string) => {
  const year = date.slice(-4);
  const month = date.slice(3, 5);
  const day = date.slice(0, 2);
  return `${year}-${month}-${day}`;
};

const cleanData = data
  .filter(d => d.iso !== "CZ" && d.iso !== "")
  .map(d => {
    return {
      ...d,
      days: d.end
        ? (Date.parse(convertDate(d.end)) - Date.parse(convertDate(d.start))) /
          1000 /
          60 /
          60 /
          24
        : 1,
    };
  });

const countries = Array.from(new Set(cleanData.map(d => d.country)));

const aggVisits = {
  data: countries.map(country => {
    return [country, cleanData.filter(d => d.country === country).length];
  }),
};

const ZemanVyjezdyBar = () => {
  const { containerRef, postHeightMessage } =
    usePostMessageWithHeight("cro-zeman-bar");
  const [selectedCountry, setSelectedCountry] = useState<string>("");

  useEffect(() => {
    postHeightMessage();
  }, [postHeightMessage, selectedCountry]);

  return (
    <div className="bg-white" ref={containerRef}>
      <Head>
        <title>Zahraniční cesty prezidenta Miloše Zemana 2013 – 2023</title>
      </Head>
      <h1 className="text-2xl font-bold leading-6 pb-2">
        Kam jezdil Zeman nejčastěji?
      </h1>
      <Bar
        categories={undefined}
        data={aggVisits}
        height={400}
        stacking={undefined}
        yAxisTitleEnabled={false}
        animation={false}
        labelFormat={"{text}"}
        colors={[
          "#3f558c",
          "#5784d9",
          //   "#806cb3",
          //   "#f5ab4a",
          //   "#6cc3d9",
          //   "#f16084",
          //   "#34b2b2",
          "#b5b5bf",
        ]}
        legendVerticalAlign={"top"}
        sharedTooltip={false}
        valueSuffix={" návštěv"}
        valueDecimals={0}
        dataLabelsEnabled={false}
      />
      <p className="text-xs text-end">
        Zdroj dat:{" "}
        <Link
          href={"https://informace.rozhlas.cz/o-nas-7965109"}
          target="_blank"
        >
          Rešeršní oddělení ČRo
        </Link>
      </p>
    </div>
  );
};

export default ZemanVyjezdyBar;
