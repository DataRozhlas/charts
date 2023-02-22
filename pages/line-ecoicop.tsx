import Link from "next/link";
import Head from "next/head";
import { Line } from "../components";
import { useState, useEffect, useMemo } from "react";
import { Calendar } from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { Asap } from "@next/font/google";
import data from "../data/ecoicop.json";
import { usePostMessageWithHeight } from "../hooks";

const asap = Asap({ weight: "400", subsets: ["latin"] });

const hideSeries = (data: any, showSeries: string[]) => {
  const newData = data.map((item: any) => {
    return {
      ...item,
      name: item.name === "Úhrn" ? "Celková inflace" : item.name,
      visible: showSeries.includes(item.name),
    };
  });
  return newData;
};

const monthDiff = (dateFrom: Date, dateTo: Date) => {
  return (
    dateTo.getMonth() -
    dateFrom.getMonth() +
    12 * (dateTo.getFullYear() - dateFrom.getFullYear())
  );
};

const filterData = (data: any, range: Date[]) => {
  const originalRange = [new Date(2018, 0, 1), new Date(2023, 0, 1)];
  const newData = data.map((item: any) => {
    return {
      ...item,
      data: item.data.slice(
        monthDiff(originalRange[0], range[0]),
        item.data.length - monthDiff(range[1], originalRange[1])
      ),
    };
  });
  return newData;
};

const LineEcoicop = () => {
  const { containerRef, postHeightMessage } =
    usePostMessageWithHeight("cro-line-ecoicop");

  const [selectedRange, setSelectedRange] = useState([
    new Date(2022, 0, 1),
    new Date(2023, 0, 1),
  ]);

  const [showCalendar, setShowCalendar] = useState(false);

  const processedData = useMemo(() => {
    const filteredData = filterData(data, selectedRange);
    const normalizedData = filteredData.map((item: any) => {
      return {
        ...item,
        data: item.data.map((point: any) => {
          return (point / item.data[0]) * 100 - 100;
        }),
      };
    });
    const result = hideSeries(normalizedData, [
      "Úhrn",
      "Potraviny a nealkoholické nápoje",
    ]);
    return result;
  }, [selectedRange]);

  const [options, setOptions] = useState({
    chart: {
      height: 550,
      animation: false,
      style: {
        fontFamily: asap.style.fontFamily,
      },
    },
    colors: [
      "#000000",
      "#de9062",
      "#6C2751",
      "#4F6DAB",
      "#267080",
      "#5B9BD5",
      "#3E9970",
      "#2C4F94",
      "#CC5A71",
      "#F19143",
      "#CE2D4F",
      "#564D82",
      "#3E8989",
    ],
    title: {
      text: undefined,
    },
    credits: {
      enabled: false,
    },
    plotOptions: {
      series: {
        animation: false,
        pointStart: Date.UTC(
          selectedRange[0].getFullYear(),
          selectedRange[0].getMonth(),
          1
        ),
        pointIntervalUnit: "month",
      },
    },
    xAxis: {
      type: "datetime",
    },
    yAxis: {
      title: {
        enabled: false,
      },
      labels: {
        format: "{text} %",
      },
    },
    legend: {},
    tooltip: {
      shared: true,
      valueDecimals: 1,
      valueSuffix: " %",
    },
    series: processedData,
  });

  const handleDateChange = (range: Date[]) => {
    setSelectedRange(range);
    setShowCalendar(false);
  };

  const toggleCalendar = () => {
    setShowCalendar(!showCalendar);
  };

  useEffect(() => {
    setOptions((prevState: any) => {
      return {
        ...prevState,
        series: processedData,
        plotOptions: {
          series: {
            animation: false,
            pointStart: Date.UTC(
              selectedRange[0].getFullYear(),
              selectedRange[0].getMonth(),
              1
            ),
            pointIntervalUnit: "month",
            dataLabels: {
              enabled: true,
              formatter: function (this: any) {
                if (this.point.index == this.series.data.length - 1) {
                  const result = this.y;
                  return `${result > 0 ? "+" : "-"} ${Math.abs(result).toFixed(
                    1
                  )} %`;
                }
                return "";
              },
            },
          },
        },
      };
    });
  }, [processedData, selectedRange]);

  return (
    <div className="bg-white" ref={containerRef}>
      <Head>
        <title>
          Potraviny od jara zdražují rychleji než jiné zboží a služby
        </title>
      </Head>
      <h1 className="text-2xl font-bold leading-6 pb-2">
        Potraviny od jara zdražují rychleji než jiné zboží a služby
      </h1>
      <h2 className="inline-flex mb-1 items-center justify-start gap-2 w-full wrap">
        Vybrané období:
        <button
          type="button"
          className="inline-flex items-center rounded border border-gray-300 bg-white px-2.5 py-1.5 text-xs font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 gap-2"
          onClick={toggleCalendar}
        >
          {selectedRange[0].toLocaleString("cs-CZ", {
            month: "long",
            year: "numeric",
          })}
          {"\u00A0"}–{"\u00A0"}
          {selectedRange[1].toLocaleString("cs-CZ", {
            month: "long",
            year: "numeric",
          })}{" "}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z"
            />
          </svg>
        </button>
      </h2>
      <Line options={options} />
      <p className="text-xs text-end">
        Zdroj dat:{" "}
        <Link
          href={
            "https://vdb.czso.cz/vdbvo2/faces/cs/index.jsf?page=vystup-objekt&z=T&f=TABULKA&ds=ds2329&skupId=2218&katalog=31779&pvo=CEN083A&evo=v2504_%21_CEN-SPO-BAZIC2015-EM_1&o=false&str=v514/"
          }
          target="_blank"
        >
          Český statistický úřad
        </Link>
      </p>
      {showCalendar && (
        <div className="w-full absolute top-28 sm:top-24">
          <Calendar
            onChange={handleDateChange}
            selectRange={true}
            value={selectedRange as [Date, Date]}
            returnValue="range"
            locale="cs-CZ"
            maxDetail="year"
            minDate={new Date(2018, 0, 1)}
            maxDate={new Date(2023, 0, 1)}
            next2Label={null}
            prev2Label={null}
            className="mx-auto"
          />
        </div>
      )}
    </div>
  );
};

export default LineEcoicop;
