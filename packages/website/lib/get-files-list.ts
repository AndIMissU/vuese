import path from 'path'
import fs from 'fs'

function listMpxFiles(dir: string, fileName = '') {
  let results: Record<'fullPath' | 'fileName', string>[] = []
  fs.readdirSync(dir).forEach(subFileName => {
    const fullPath = path.join(dir, subFileName);
    if (fs.lstatSync(fullPath).isDirectory()) {
      results = results.concat(listMpxFiles(fullPath, subFileName));
    } else {
      if (subFileName.endsWith('.mpx')) {
        results.push({
          fullPath,
          fileName
        });
      }
    }
  })

  return results;
}


let _cacheList: Record<"fullPath" | "fileName", string>[] = []
export function getFiles(srcPath: string, examplePath: string) {
  if (_cacheList.length) return _cacheList

  const srcFiles = listMpxFiles(srcPath)
  const exapmpleFiles = fs.readdirSync(examplePath)

  _cacheList = srcFiles.filter(item => {
    return exapmpleFiles.includes(item.fileName)
  })

  return _cacheList
}
