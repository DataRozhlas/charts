import Link from "next/link";
import Head from "next/head";
import { Sankey } from "../components";
import data from "../data/sankey-prez.json";

const SankeyPrez = () => {
  return (
    <div>
      <Head>
        <title>Komu dali hlas voliči stran z parlamentních voleb 2021</title>
      </Head>
      <h1 className="text-2xl font-bold leading-6 pb-2">
        Komu dali hlas voliči stran z parlamentních voleb 2021{" "}
      </h1>
      <h2 className="leading-4 pb-0">
        Tloušťka spojnice odpovídá počtu voličů
      </h2>

      <Sankey data={data} height={830} />
      <p className="text-xs text-end">
        Zdroj dat:{" "}
        <Link href={"https://www.paqresearch.cz/"} target="_blank">
          PAQ Research
        </Link>
      </p>
    </div>
  );
};

export default SankeyPrez;