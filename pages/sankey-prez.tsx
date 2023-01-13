import Link from "next/link";
import Head from "next/head";
import { Sankey } from "../components";
import data from "../data/sankey-prez.json";
import { usePostMessageWithHeight } from "../hooks";

const SankeyPrez = () => {
  const { containerRef, postHeightMessage } =
    usePostMessageWithHeight("cro-sankey-prez");

  return (
    <div ref={containerRef}>
      <Head>
        <title>Komu dali hlas voliči stran z parlamentních voleb 2021</title>
      </Head>
      <h1 className="text-2xl font-bold leading-6 pb-2">
        Komu dali hlas voliči stran z parlamentních voleb 2021{" "}
      </h1>
      <h2 className="leading-4 pb-0">
        Tloušťka spojnice odpovídá počtu voličů. Zobrazujeme jen přelivy od 20
        tisíc hlasů výš
      </h2>

      <Sankey
        data={data}
        height={830}
        nodeWidth={30}
        nodes={[
          { id: "Voliči SPOLU", color: "#8a4a89" },
          { id: "Voliči ANO", color: "#4848b3" },
          { id: "Voliči PirStan", color: "#68808b" },
          { id: "Voliči SPD", color: "#f1a711" },
          { id: "Voliči ostatních stran", color: "#349db2" },
          { id: "Neúčastníci + prvovoliči", color: "#fb9179" },
          { id: "Petr Pavel", color: "#102157" },
          { id: "Andrej Babiš", color: "#4848b3" },
          { id: "Danuše Nerudová", color: "#614991" },
          { id: "Jaroslav Bašta", color: "#f1a711" },
          { id: "Pavel Fischer", color: "#02afd4" },
          { id: "Marek Hilšer", color: "#f15c80" },
          { id: "Ostatní", color: "#349db2" },
          { id: "Neúčast", color: "#808080" },
        ]}
        //  strany SPOLU "#8a4a89",  "#4848b3", "#68808b", "#f1a711", "#349db2", "#fb9179"
        //  kandidáti pavel "#102157", "#4848b3",  "#614991", "#f1a711", "#02afd4", "#f15c80", "#349db2", "#808080"
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

export default SankeyPrez;
