'use strict'

exports.__esModule = true

exports.default = function(files) {
  return files.reduce(function(vars, filepath) {
    if (!filepath.endsWith('.js')) {
      return vars
    }
    delete require.cache[filepath]
    return Object.assign(vars, require(filepath))
  }, {})
}
