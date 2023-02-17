import * as XLSX from "https://cdn.sheetjs.com/xlsx-0.19.1/package/xlsx.mjs";

const source = XLSX.readFile("srv/data/cpi-ecoicop.xlsx");

// deno-lint-ignore no-explicit-any
const json: any = XLSX.utils.sheet_to_json(source.Sheets.DATA);

const keys = Object.keys(json[3]).filter(key => key !== "__EMPTY");

const names = keys.map(key => {
  return json[3][key]
    .replace(/;\n/g, "; ")
    .replace(/,\n/g, ", ")
    .replace(/\n/g, "");
});

const rawData = json.slice(4, json.length - 2);

const data = keys.map((key, index) => {
  return {
    name: names[index],
    // deno-lint-ignore no-explicit-any
    data: rawData.map((row: any) => row[key]),
  };
});

await Deno.writeTextFile("data/ecoicop.json", JSON.stringify(data));

console.log(data);
