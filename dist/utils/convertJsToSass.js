'use strict'

exports.__esModule = true
function convertJsToSass(obj, syntax) {
  var suffix = syntax === 'sass' ? '' : ';'
  var keys = Object.keys(obj)
  var lines = keys.map(function(key) {
    return `$${key}: ${formatValue(obj[key], syntax)}${suffix}`
  })
  return lines.join('\n')
}

function formatNestedObject(obj, syntax) {
  var keys = Object.keys(obj)
  return keys
    .map(function(key) {
      return `${key}: ${formatValue(obj[key], syntax)}`
    })
    .join(', ')
}

function formatValue(value, syntax) {
  if (value instanceof Array) {
    return `(${value.map(formatValue).join(', ')})`
  }

  if (typeof value === 'object') {
    return `(${formatNestedObject(value, syntax)})`
  }

  if (typeof value === 'string') {
    return value
  }

  return JSON.stringify(value)
}

exports.default = convertJsToSass
