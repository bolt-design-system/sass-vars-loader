'use strict'

exports.__esModule = true

exports.default = function(files) {
  return files.reduce(function(vars, filepath) {
    if (filepath.match(/\.s[ac]ss/)) {
      return [vars, _fs2.default.readFileSync(filepath, 'utf8')].join('\n')
    }
    return vars
  }, '')
}

var _fs = require('fs')

var _fs2 = _interopRequireDefault(_fs)

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj }
}
