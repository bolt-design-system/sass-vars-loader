import loaderUtils from 'loader-utils'
import globby from 'globby'
import readVarsFromJSONFiles from './utils/readVarsFromJSONFiles'
import readVarsFromJavascriptFiles from './utils/readVarsFromJavascriptFiles'
import readSassFiles from './utils/readSassFiles'
import watchFilesForChanges from './utils/watchFilesForChanges'
import convertJsToSass from './utils/convertJsToSass'

export default function(content) {
  this.cacheable()

  const options = loaderUtils.getOptions(this) || {}
  const files = options.files || []
  const extraWatch = options.extraWatch || []
  const syntax = options.syntax || 'scss'

  let mergedFileArray = files

  const uniqueArrayItems = arrArg => arrArg.filter((elem, pos, arr) => arr.indexOf(elem) === pos)

  if (extraWatch.length > 0) {
    mergedFileArray = mergedFileArray.concat(globby.sync(extraWatch))
  }

  watchFilesForChanges(this, uniqueArrayItems(mergedFileArray))

  const vars = {
    ...readVarsFromJSONFiles(files),
    ...readVarsFromJavascriptFiles(files),
    ...options.vars,
  }

  const sassVarsString = convertJsToSass(vars, syntax)

  return [readSassFiles(files), sassVarsString, content].join('\n')
}
