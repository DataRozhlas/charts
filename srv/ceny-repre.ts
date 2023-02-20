// deno-lint-ignore-file no-explicit-any
import * as XLSX from "https://cdn.sheetjs.com/xlsx-0.19.1/package/xlsx.mjs";

const source = XLSX.readFile("srv/data/ceny-repre.xlsx");

const json: any = XLSX.utils.sheet_to_json(source.Sheets["Sheet1"]);

const result: any = json.map((item: any) => {
  const quantity = item.item.substring(
    item.item.search("\\[") + 1,
    item.item.search("\\]")
  );
  return {
    name: item.item.slice(0, item.item.search("\\[") - 1),
    y: item.pct,
    description: `<strong>${
      item.item
    }</strong><br>Cena v lednu 2022: ${item.price1.toLocaleString(
      "cs-CZ"
    )} Kč<br>Cena v lednu 2023: ${item.price2.toLocaleString("cs-CZ")} Kč`,
  };
});

await Deno.writeTextFile("data/ceny-repre.json", JSON.stringify(result));

console.log(result);
