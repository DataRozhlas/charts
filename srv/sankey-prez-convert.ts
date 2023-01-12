// @deno-types="https://cdn.sheetjs.com/xlsx-0.19.1/package/types/index.d.ts"
import * as XLSX from "https://cdn.sheetjs.com/xlsx-0.19.1/package/xlsx.mjs";

const source = XLSX.readFile("srv/data/EI_graf_vzor_v01.xlsx");

// deno-lint-ignore no-explicit-any
const json: any = XLSX.utils.sheet_to_json(source.Sheets.List1);

const result = [];

for (let j = 0; j < json.length; j++) {
  const to: string[] = Object.keys(json[j]).filter(key => key !== "from");
  for (let k = 0; k < to.length; k++) {
    if (json[j][to[k]] < 20000) continue;
    result.push({
      from: json[j].from,
      to: to[k],
      weight: json[j][to[k]],
    });
  }
}

await Deno.writeTextFile("data/sankey-prez.json", JSON.stringify(result));

console.log(result);
