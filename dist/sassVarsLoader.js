'use strict'

exports.__esModule = true

var _extends =
  Object.assign ||
  function(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i]
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key]
        }
      }
    }
    return target
  }

exports.default = function(content) {
  this.cacheable()

  var options = _loaderUtils2.default.getOptions(this) || {}
  var files = options.files || []
  var extraWatch = options.extraWatch || []
  var syntax = options.syntax || 'scss'

  var mergedFileArray = files

  var uniqueArrayItems = function uniqueArrayItems(arrArg) {
    return arrArg.filter(function(elem, pos, arr) {
      return arr.indexOf(elem) === pos
    })
  }

  if (extraWatch.length > 0) {
    mergedFileArray = mergedFileArray.concat(_globby2.default.sync(extraWatch))
  }

  ;(0, _watchFilesForChanges2.default)(this, uniqueArrayItems(mergedFileArray))

  var vars = _extends(
    {},
    (0, _readVarsFromJSONFiles2.default)(files),
    (0, _readVarsFromJavascriptFiles2.default)(files),
    options.vars
  )

  var sassVarsString = (0, _convertJsToSass2.default)(vars, syntax)

  return [(0, _readSassFiles2.default)(files), sassVarsString, content].join('\n')
}

var _loaderUtils = require('loader-utils')

var _loaderUtils2 = _interopRequireDefault(_loaderUtils)

var _globby = require('globby')

var _globby2 = _interopRequireDefault(_globby)

var _readVarsFromJSONFiles = require('./utils/readVarsFromJSONFiles')

var _readVarsFromJSONFiles2 = _interopRequireDefault(_readVarsFromJSONFiles)

var _readVarsFromJavascriptFiles = require('./utils/readVarsFromJavascriptFiles')

var _readVarsFromJavascriptFiles2 = _interopRequireDefault(_readVarsFromJavascriptFiles)

var _readSassFiles = require('./utils/readSassFiles')

var _readSassFiles2 = _interopRequireDefault(_readSassFiles)

var _watchFilesForChanges = require('./utils/watchFilesForChanges')

var _watchFilesForChanges2 = _interopRequireDefault(_watchFilesForChanges)

var _convertJsToSass = require('./utils/convertJsToSass')

var _convertJsToSass2 = _interopRequireDefault(_convertJsToSass)

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj }
}
