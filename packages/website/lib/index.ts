import path from 'path'
import fs from 'fs'
import { spawn } from 'child_process'
import { genSrcMd } from './gen-src-md'
import { genExampleMd } from './gen-example-md'
import { watch } from './watch-change'
import { getFiles } from './get-files-list'
import { getCache } from './cache'

type WebsiteConfig = {
  srcPath: string
  examplePath: string
  outputPath: string
  doscPath: string
}

function validateParams(config: WebsiteConfig) {
  const keys: (keyof WebsiteConfig)[] = ['srcPath', 'examplePath', 'outputPath']
  const total: typeof keys = []
  keys.reduce((total, key) => {
    if (!config[key]) {
      total.push(key)
    }
    return total
  }, total)

  if (total.length) {
    console.error(`请输入${total.join(', ')}参数`)
    return false
  }

  return true
}


export default function website(config: WebsiteConfig): void {  
  if (!validateParams(config)) return
  const srcFiles = getFiles(config.srcPath, config.examplePath)
  
  const cache = getCache()
  srcFiles.map(file => {
    const fileName = file.fileName
    const srcMd = genSrcMd(fileName, file.fullPath)
    const exampleMd = genExampleMd(fileName, path.resolve(config.examplePath, fileName))
    srcMd.then(text => {
      cache[fileName] = {
        srcMd: text,
        exampleMd: exampleMd
      }
      fs.writeFileSync(`${config.outputPath}/${fileName}.md`, exampleMd + '\n' + text)
    })
  })

  watch(config)

  // 启动 VitePress 开发服务器
  spawn('npx', ['vitepress', 'dev', config.doscPath || 'docs'], { stdio: 'inherit' });
  // 构建 VitePress 静态文件
  // spawn('npx', ['vitepress', 'build', 'docs'], { stdio: 'inherit' });
}
