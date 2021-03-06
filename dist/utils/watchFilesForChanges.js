'use strict'

exports.__esModule = true

exports.default = function(loader, files) {
  files.forEach(function(file) {
    return loader.addDependency(file)
  })
}
