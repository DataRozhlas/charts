import Head from "next/head";
import Link from "next/link";
import { useState, useEffect } from "react";
import { usePostMessageWithHeight } from "../hooks";
import { WorldMap } from "../components";
import data from "../data/zeman-cesty.json";

interface Visit {
  country: string;
  start: string;
  end: string;
  iso: string;
  type: string;
  desc: string;
  days: number;
}

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
const calculateMapData = (data: Visit[]) => {
  const ISOcodes = new Set(data.map(d => d.iso));
  const mapData = Array.from(ISOcodes).map(iso => {
    return {
      ["hc-a2"]: iso,
      name: data.find(d => d.iso === iso)?.country,
      value: data.filter(d => d.iso === iso).length,
    };
  });
  return mapData;
};

const countDays = (data: Visit[]) => {
  const days = data.reduce((acc, curr) => acc + curr.days, 0);
  switch (days) {
    case 1:
      return "1 den";
    case 2:
      return "2 dny";
    case 3:
      return "3 dny";
    case 4:
      return "4 dny";
    default:
      return `${days} dnů`;
  }
};

const CountryDetails = ({ data }: { data: Visit[] }) => {
  return (
    <div>
      <h3 className="text-sm font-bold">{data[0].country}</h3>
      <h4 className="text-xs pb-3">{`${data.length} ${decline(
        data.length
      )}, ${countDays(data)}`}</h4>
      {data.map((d, i) => {
        return (
          <div key={i} className="text-xs pb-2">
            <p>
              <strong>{d.start}</strong>
              {d.end ? <strong>{` – ${d.end} `}</strong> : " "}
              <strong>{d.type}</strong>
            </p>
            <p>{d.desc}</p>
          </div>
        );
      })}
    </div>
  );
};

const ZemanVyjezdy = () => {
  const { containerRef, postHeightMessage } =
    usePostMessageWithHeight("cro-zeman-vyjezdy");
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
        Zahraniční cesty prezidenta Zemana 2013 – 2023
      </h1>
      <h2 className="leading-4 pb-0">
        Kliknutím na stát zobrazíte podrobnosti
      </h2>
      <WorldMap
        data={calculateMapData(cleanData)}
        setSelectedCountry={setSelectedCountry}
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
      {selectedCountry.length > 0 && (
        <CountryDetails
          data={cleanData.filter(d => d.iso === selectedCountry)}
        />
      )}
    </div>
  );
};

export default ZemanVyjezdy;
