import Head from "next/head";
import Link from "next/link";
import { useState, useEffect, useMemo } from "react";
import { usePostMessageWithHeight } from "../hooks";
import { WorldMap } from "../components";
import data from "../data/prezidenti-cesty.json";

interface Visit {
  country: string;
  start: string;
  end?: string;
  iso: string;
  type?: string;
  desc?: string;
  pres: string;
}

const getCountryNames = new Intl.DisplayNames(["cs"], { type: "region" });

function decline(n: number) {
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
}

function convertDate(date: string) {
  const year = date.slice(-4);
  const month = date.slice(3, 5);
  const day = date.slice(0, 2);
  return `${year}-${month}-${day}`;
}

function calculateMapData(data: Visit[]) {
  const ISOcodes = new Set(data.map(d => d.iso));
  const mapData = Array.from(ISOcodes).map(iso => {
    return {
      ["hc-a2"]: iso,
      name: getCountryNames.of(iso),
      value: data.filter(d => d.iso === iso).length,
    };
  });
  return mapData;
}

function CountryDetails({ data, country }: { data: Visit[]; country: string }) {
  const numberOfVisits =
    data.length === 0
      ? "žádná návštěva"
      : `${data.length} ${decline(data.length)}`;
  return (
    <div>
      <h3 className="text-sm font-bold">{getCountryNames.of(country)}</h3>
      <h4 className="text-xs pb-3">{numberOfVisits}</h4>
      {data.length > 0 &&
        data.map((d, i) => {
          return (
            <div key={i} className="text-xs pb-1">
              <p>
                <strong>{d.start}</strong>
                {d.desc && `: ${d.desc}`}{" "}
              </p>
            </div>
          );
        })}
    </div>
  );
}

function getNumberOfVisits(data: Visit[]) {
  const startDates = data.map(d => d.start);
  const uniqueStartDates = [...new Set(startDates)];
  return uniqueStartDates.length;
}

function getNumberOfStates(data: Visit[]) {
  const stateCodes = data.map(d => d.iso);
  const uniqueStates = [...new Set(stateCodes)];
  return uniqueStates.length;
}

function filterData(data: Visit[], filter: string) {
  if (filter === "v") return data;
  return data.filter(d => d.pres === filter);
}

function getUniqueCountries(
  data: Visit[],
  filteredData: Visit[],
  filter: string
) {
  if (filter === "v") return [];
  const othersCountries = [
    ...new Set(data.filter(d => d.pres !== filter).map(d => d.iso)),
  ];
  const uniqueCountries = [...new Set(filteredData.map(d => d.iso))];

  return uniqueCountries
    .filter((c: string) => !othersCountries.includes(c))
    .sort((a: string, b: string) => new Intl.Collator("cs").compare(a, b))
    .map((c: string) => getCountryNames.of(c));
}

function findMaxValue(data: { value: number }[]) {
  const maxValue = Math.max(...data.map(d => d.value));
  return maxValue;
}

const PrezidentiVyjezdy = () => {
  const { containerRef, postHeightMessage } = usePostMessageWithHeight(
    "cro-prezidenti-vyjezdy"
  );
  const [selectedCountry, setSelectedCountry] = useState<string>("");
  const [selectedPresident, setSelectedPresident] = useState<string>("v");

  function handleButtonClick(e: React.MouseEvent<HTMLButtonElement>) {
    const filter = e.currentTarget.innerText.toLowerCase().slice(0, 1);
    setSelectedPresident(filter);
  }

  const filteredData = useMemo(() => {
    return filterData(data, selectedPresident);
  }, [selectedPresident]);

  const mapData = useMemo(() => {
    return calculateMapData(filteredData);
  }, [filteredData]);

  const topCountries = useMemo(() => {
    return mapData.sort((a, b) => b.value - a.value).slice(0, 10);
  }, [mapData]);

  const uniqueCountries = useMemo(() => {
    return getUniqueCountries(data, filteredData, selectedPresident);
  }, [filteredData, selectedPresident]);

  useEffect(() => {
    postHeightMessage();
  }, [postHeightMessage, selectedCountry]);

  return (
    <div className="bg-white max-w-[625px]" ref={containerRef}>
      <Head>
        <title>Zahraniční cesty českých prezidentů 1993 – 2023</title>
      </Head>
      <h1 className="text-2xl font-bold leading-6 pb-1">
        Zahraniční cesty českých prezidentů 1993 – 2023
      </h1>
      <div className="flex gap-3 py-1 my-2 items-center sm:justify-end">
        <p className="hidden sm:block text-sm">Vyberte prezidenta:</p>
        <button
          className={`rounded-md py-1.5 px-2.5 text-sm font-semibold ${
            selectedPresident === "h" || "bg-gray-100 text-gray-500"
          } shadow-sm hover:bg-gray-400 hover:text-black ${
            selectedPresident === "h" && "text-black ring-1 ring-gray-600"
          }`}
          value={selectedPresident}
          onClick={handleButtonClick}
        >
          Havel
        </button>
        <button
          className={`rounded-md  py-1.5 px-2.5 text-sm font-semibold ${
            selectedPresident === "k" || "bg-gray-100 text-gray-500"
          } shadow-sm hover:bg-gray-400 hover:text-black ${
            selectedPresident === "k" && "text-black ring-1 ring-gray-600"
          }`}
          value={selectedPresident}
          onClick={handleButtonClick}
        >
          Klaus
        </button>
        <button
          className={`rounded-md  py-1.5 px-2.5 text-sm font-semibold ${
            selectedPresident === "z" || "bg-gray-100 text-gray-500"
          } shadow-sm hover:bg-gray-400 hover:text-black ${
            selectedPresident === "z" && "text-black  ring-1 ring-gray-600"
          }`}
          value={selectedPresident}
          onClick={handleButtonClick}
        >
          Zeman
        </button>
        <button
          className={`rounded-md  py-1.5 px-2.5 text-sm font-semibold ${
            selectedPresident === "v" || "bg-gray-100 text-gray-500"
          } shadow-sm hover:bg-gray-400 ${
            selectedPresident === "v" &&
            "text-black hover:text-black ring-1 ring-gray-600"
          }`}
          value={selectedPresident}
          onClick={handleButtonClick}
        >
          všichni
        </button>
      </div>
      <div className="pt-2 h-60 sm:h-40">
        <div className="mb-2 text-sm sm:text-lg">
          <span className="font-bold">{getNumberOfVisits(filteredData)}</span>{" "}
          zahraničních cest |{" "}
          <span className="font-bold">{getNumberOfStates(filteredData)}</span>{" "}
          navštívených států
        </div>
        <div className="mb-2 text-sm leading-tight sm:leading-normal">
          <span className="font-bold">Nejvíc návštěv:</span>{" "}
          {topCountries
            .map(c => `${c.name}${"\u00A0"}(${c.value}×)`)
            .join(", ")}
        </div>
        {selectedPresident !== "v" && (
          <div className="mb-6 text-sm leading-tight sm:leading-normal">
            <span className="font-bold">Kam jel jako jediný:</span>{" "}
            {uniqueCountries.join(", ")}
          </div>
        )}
      </div>
      <div className="text-sm italic">
        Kliknutím na stát v mapě zobrazíte výpis návštěv
      </div>

      <WorldMap
        data={mapData}
        setSelectedCountry={setSelectedCountry}
        colorAxisMax={findMaxValue(mapData)}
      />
      {selectedCountry.length > 0 && (
        <CountryDetails
          data={filteredData.filter(d => d.iso === selectedCountry)}
          country={selectedCountry}
        />
      )}
      <p className="pt-4 text-xs text-end">
        Zdroj dat: Kancelář prezidenta republiky a rešeršní oddělení ČRo
      </p>
    </div>
  );
};

export default PrezidentiVyjezdy;
