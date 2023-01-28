import Link from "next/link";
import Head from "next/head";
import { Bar } from "../components";
import data from "../data/bar-prez-2kolo.json";
import categories from "../data/bar-prez-2kolo-cat.json";
import { usePostMessageWithHeight } from "../hooks";

const BarPrez = () => {
  const { containerRef, postHeightMessage } =
    usePostMessageWithHeight("cro-bar-prez-2kolo");

  return (
    <div className="bg-white" ref={containerRef}>
      <Head>
        <title>Komu dali hlas voliči kandidátů z prvního kola</title>
      </Head>
      <h1 className="text-2xl font-bold leading-6 pb-2">
        Komu dali hlas voliči kandidátů z prvního kola
      </h1>
      {/* <h2 className="leading-4 pb-0">Jiný pohled na stejná data</h2> */}

      <Bar
        categories={categories}
        data={data}
        height={400}
        stacking={"percent"}
        yAxisTitleEnabled={false}
        animation={false}
        labelFormat={"{text} %"}
        colors={[
          "#3f558c",
          "#5784d9",
          //   "#806cb3",
          //   "#f5ab4a",
          //   "#6cc3d9",
          //   "#f16084",
          //   "#34b2b2",
          "#34b2b2",
        ]}
        legendVerticalAlign={"top"}
        sharedTooltip={false}
        valueSuffix={" %"}
        valueDecimals={1}
        dataLabelsEnabled={true}
      />
      <p className="text-xs text-end">
        Zdroj dat:{" "}
        <Link href={"https://www.paqresearch.cz/"} target="_blank">
          PAQ Research{" "}
        </Link>
        - odhad z okrskových dat sčítání (ekologická inference)
      </p>
      <p className="text-xs text-end">
        Vizualizace:
        <Link href={"https://www.irozhlas.cz/"} target="_blank">
          iROZHLAS.cz
        </Link>
      </p>
    </div>
  );
};

export default BarPrez;