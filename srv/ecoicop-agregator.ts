// deno-lint-ignore-file no-explicit-any
import * as XLSX from "https://cdn.sheetjs.com/xlsx-0.19.1/package/xlsx.mjs";

const source = XLSX.readFile("srv/data/ČSÚ CPI bazické indexy leden 2023.xlsx");

const json: any = XLSX.utils.sheet_to_json(source.Sheets["rok 2015 = 100"]);

const filtered = json
  .filter((row: any) => row.POLO === "ECOI4")
  .filter((row: any) => row["REPRE"].includes("E01."));

const years = ["2018", "2019", "2020", "2021", "2022", "2023"];

const keys = Object.keys(filtered[0]).filter(key =>
  years.includes(key.slice(1, -2))
);

const result = filtered.map((row: any) => {
  const data = keys.map(key => {
    return row[key];
  });

  return {
    name: row.NAZEV,
    data,
  };
});

await Deno.writeTextFile("data/ecoicop-potraviny.json", JSON.stringify(result));

console.log(result);
