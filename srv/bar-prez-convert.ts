// deno-lint-ignore-file no-explicit-any
// @deno-types="https://cdn.sheetjs.com/xlsx-0.19.1/package/types/index.d.ts"
import * as XLSX from "https://cdn.sheetjs.com/xlsx-0.19.1/package/xlsx.mjs";

const source = XLSX.readFile("srv/data/EI_bar.xlsx");

const json: any = XLSX.utils.sheet_to_json(source.Sheets.Sheet1);

const categories: string[] = json.map((row: any) => row.__EMPTY);

const names: string[] = Object.keys(json[0]).filter(key => key !== "__EMPTY");

const result = names.map(name => {
  return {
    name: name,
    data: json.map((row: any) => {
      return row[name] * 100;
    }),
  };
});

await Deno.writeTextFile(
  "data/bar-prez-2kolo-psp-cat.json",
  JSON.stringify(categories)
);

await Deno.writeTextFile(
  "data/bar-prez-2kolo-psp.json",
  JSON.stringify(result)
);

console.log(json);
