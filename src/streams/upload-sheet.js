import { createReadStream } from "node:fs"
import { parse } from "csv-parse"
import fetch from "node-fetch"

function wait(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

async function importCSV() {
  const parser = createReadStream("src/streams/sheet.csv").pipe(parse({ columns: true, trim: true }))

  for await (const { title, description } of parser) {
    if (!title || !description) continue

    await fetch("http://localhost:3333/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, description })
    })

    await wait(100)
    console.log(`Task importada: ${title}`)
  }

  console.log("Importação concluída!")
}

importCSV()