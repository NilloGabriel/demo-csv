import { createReadStream } from 'fs'
import { createInterface } from 'readline'
import slug from 'slug'

import { getNomeUf } from './util/uf.js'
import { formatDate } from './util/date.js'
import { connection } from '../database/database.js'
import { outputData } from './output.js'

const paths = [
  'database/csv/input/uf.csv',
  'database/csv/input/cidade_populacao.csv',
  'database/csv/input/cidade_siafi.csv',
  'database/csv/input/empresas_bahia.csv'
]

const ufs = []
const cityPop = []
const citySiafi = []
const company = []

const readCsvFile = (path, start, destArray, mapping) => {
  return new Promise(async (resolve, reject) => {
    try {
      const stream = createReadStream(path, { start })
      const fileLines = createInterface({ input: stream })

      for await (let line of fileLines) {
        const lineSplit = line.split(',')
        destArray.push(mapping(lineSplit))
      }

      resolve()
    } catch (err) {
      reject(err)
    }
  })
}

const readUf = readCsvFile(paths[0], 16, ufs, lineSplit => ({
  codigo_uf: lineSplit[0],
  sigla: lineSplit[1]
}))

const readCityPop = readCsvFile(paths[1], 43, cityPop, lineSplit => ({
  cod_ibge: lineSplit[0],
  nome_cidade: lineSplit[1],
  nome_uf: lineSplit[2],
  populacao: lineSplit[3]
}))

const readCitySiafi = readCsvFile(paths[2], 55, citySiafi, lineSplit => ({
  codigo_ibge: lineSplit[0],
  nome: lineSplit[1],
  latitude: lineSplit[2],
  longitude: lineSplit[3],
  codigo_uf: lineSplit[4],
  siafi_id: lineSplit[5]
}))

const readCompany = readCsvFile(paths[3], 71, company, lineSplit => ({
  nome_fantasia: lineSplit[0],
  dt_inicio_atividades: lineSplit[1],
  cnae_fiscal: lineSplit[2],
  cep: lineSplit[3],
  municipio: lineSplit[4],
  porte: lineSplit[5]
}))

const arrayUf = []
const arrayCity = []
const arrayCompany = []

let idUf = 1
let idCity = 1

const processUfData = async () => {
  ufs.forEach(line => {
    arrayUf.push({
      id_uf: idUf,
      sigla: line.sigla,
      nome_uf: getNomeUf(line.codigo_uf),
      codigo_uf: line.codigo_uf
    })
    idUf++
  })

  await connection.query(
    `INSERT INTO uf (sigla, nome_uf) VALUES ?`,
    [
      arrayUf.map(data => [
        data.sigla,
        data.nome_uf
      ])
    ]
  ).catch(err => {
    throw err
  })
}

const processCityData = async () => {
  citySiafi.forEach(line => {
    const auxPopulacao = cityPop.find(city => city.cod_ibge === line.codigo_ibge).populacao
    const auxIdUf = arrayUf.find(uf => uf.codigo_uf === line.codigo_ibge.slice(0, 2)).id_uf

    arrayCity.push({
      id_city: idCity,
      nome: line.nome,
      populacao: auxPopulacao,
      latitude: line.latitude,
      longitude: line.longitude,
      codigo_ibge: line.codigo_ibge,
      siafi_id: line.siafi_id,
      uf_id: auxIdUf
    })
    idCity++
  })

  await connection.query(
    `INSERT INTO cidade (nome, populacao, latitude, longitude, cod_ibge, cod_siafi, uf_id) VALUES ?`,
    [
      arrayCity.map(data => [
        data.nome,
        data.populacao,
        data.latitude,
        data.longitude,
        data.codigo_ibge,
        data.siafi_id,
        data.uf_id
      ])
    ]
  ).catch(err => {
    throw err;
  });
}

const processCompanyData = async () => {
  company.forEach(line => {
    const auxIdCity = arrayCity.find(city => city.siafi_id === line.municipio).id_city

    arrayCompany.push({
      slug: slug(line.nome_fantasia),
      nome_fantasia: line.nome_fantasia,
      dt_inicio_atividades: formatDate(line.dt_inicio_atividades),
      cnae_fiscal: line.cnae_fiscal,
      cep: line.cep,
      porte: line.porte,
      cidade_id: auxIdCity
    })
  })

  await connection.query(
    `INSERT INTO empresa (slug, nome_fantasia, dt_inicio_atividade, cnae_fiscal, cep, porte, cidade_id) 
          VALUES ?`,
    [
      arrayCompany.map(data => [
        data.slug,
        data.nome_fantasia,
        data.dt_inicio_atividades,
        data.cnae_fiscal,
        data.cep,
        data.porte,
        data.cidade_id
      ])
    ]
  ).catch(err => {
    throw err
  })
}

export const allPromises = Promise.all([
  readUf,
  readCityPop,
  readCitySiafi,
  readCompany
]).then(async () => {
    try {
      await connection.connect()
      await processUfData()
      await processCityData()
      await processCompanyData()
      await outputData()
    } catch (err) {
      throw err
    } finally {
      connection.end()
    }
  }).catch(err => {
    throw err
  })
