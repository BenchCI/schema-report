const { test } = require('tap')
const Ajv = require('ajv')
const json = require('./fixtures/report.json')
const schema = require('../spec/latest/schema.json')
const { get } = require('https')

// utility function to fetch remote schemas
function loadSchema (uri) {
  return new Promise((resolve, reject) => {
    const data = []

    const request = get(uri, res => {
      res.on('data', chunk => data.push(chunk))
      res.on('end', () => {
        const json = Buffer.concat(data).toString()
        resolve(JSON.parse(json))
      })
    })

    request.on('error', reject)
  })
}

const ajv = new Ajv({ loadSchema: loadSchema })

test('schema compiles successfully', assert => {
  assert.plan(1)

  return ajv
    .compileAsync(schema)
    .then(validate => assert.type(validate, 'function'))
})

test('valid json file', assert => {
  assert.plan(1)

  return ajv
    .compileAsync(schema)
    .then(validate => assert.ok(validate(json)))
})
