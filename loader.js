'use strict'

const register = require('babel/register')
const v8 = require('v8')

register() // uses babel config in package.json

// node --v8-options | grep harmony
v8.setFlagsFromString('--es_staging')
v8.setFlagsFromString('--harmony_destructuring')

const packageInfo = JSON.parse(require('fs').readFileSync('package.json', 'utf-8'))
process.versions.electroPub = packageInfo.version

require('./cli')