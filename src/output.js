import { createWriteStream } from 'fs'

import { connection } from '../database/database.js'
import csv from 'fast-csv'

export const outputData = async () => {
  try {
    const filename = 'database/csv/output/saida.csv'
    const writableStream = createWriteStream(filename)

    await connection
      .query(`SELECT * FROM saida`)
      .then(([rows]) => {
        const data = JSON.parse(JSON.stringify(rows))
        csv.write(data, { headers: true }).pipe(writableStream)
      })
      .catch(err => {
        throw err
      })
  } catch (err) {
    throw err
  }
}
