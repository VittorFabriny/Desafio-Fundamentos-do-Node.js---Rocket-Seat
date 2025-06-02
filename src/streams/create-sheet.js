import { generate } from "csv-generate"
import { parse } from "csv-parse"
import { stringify } from "csv-stringify/sync"
import { writeFile } from "node:fs/promises"

const CSV = generate({
  length: 100,
  columns: 2,
}).pipe(parse())

const records = []

for await (const [title, description] of CSV) {
  records.push({
    title,
    description,
  })
}

const csvData = stringify(records, { header: true })

await writeFile("src/streams/sheet.csv", csvData, "utf-8")

console.log("Dados salvos em sheet.csv")