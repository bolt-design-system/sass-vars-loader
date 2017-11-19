import loaderUtils from 'loader-utils';
import getVarsFromJSONFiles from './utils/readVarsFromJSONFiles';
import getVarsFromJavascriptFiles from './utils/readVarsFromJavascriptFiles';
import watchFilesForChanges from './utils/watchFilesForChanges';
import convertJsToSass from './utils/convertJsToSass';

export default function(content) {
  this.cacheable();

  const options = loaderUtils.getOptions(this) || {};
  const files = options.files || [];

  watchFilesForChanges(this, files);

  const vars = {
    ...options.vars,
    ...getVarsFromJSONFiles(files),
    ...getVarsFromJavascriptFiles(files)
  };

  const sassVarsString = convertJsToSass(vars);

  return `${sassVarsString}${content}`;
}