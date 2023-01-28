import Link from "next/link";
import Head from "next/head";
import { Sankey } from "../components";
import data from "../data/sankey-prez2kolo.json";
import { usePostMessageWithHeight } from "../hooks";

const SankeyPrez = () => {
  const { containerRef, postHeightMessage } = usePostMessageWithHeight(
    "cro-sankey-prez-2kolo"
  );

  return (
    <div className="bg-white" ref={containerRef}>
      <Head>
        <title>Komu dali hlas voliči kandidátů z prvního kola</title>
      </Head>
      <h1 className="text-2xl font-bold leading-6 pb-2">
        Komu dali hlas voliči kandidátů z prvního kola
      </h1>
      <h2 className="leading-4 pb-0">
        Tloušťka spojnice odpovídá počtu voličů. Odhad je přibližný – pozornost
        je dobré věnovat zejména přelivům nad 50 tisíc voličů. Přelivy pod 20
        tisíc nejsou zobrazeny
      </h2>

      <Sankey
        data={data}
        height={830}
        nodeWidth={30}
        nodes={[
          { id: "Petr Pavel", color: "#102157" },
          { id: "Andrej Babiš", color: "#4848b3" },
          { id: "Danuše Nerudová", color: "#614991" },
          { id: "Jaroslav Bašta", color: "#f1a711" },
          { id: "Pavel Fischer", color: "#02afd4" },
          { id: "Ostatní", color: "#f15c80" },
          { id: "Neúčast", color: "#808080" },
          { id: "PETR PAVEL", color: "#102157" },
          { id: "ANDREJ BABIŠ", color: "#4848b3" },
          { id: "NEÚČAST", color: "#808080" },
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
