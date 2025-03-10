/**
 * 同步路由到主窗口
 * @param iframe
 * @param to
 */
export const syncPathToParent = (iframe: HTMLIFrameElement, to: string) => {
  iframe?.contentWindow?.postMessage({
    value: to
  }, '*')
}

/**
 * 监听子路由的变化
 * @param callback 
 * @returns
 */
export const onPathchange = (callback?: (path: string) => void): () => void => {
  let prevPath = ''
  const handleMessage = (e: { data: { value: string } }) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const { value } = (typeof e.data === 'object' ? e.data || {} : {})
    if (value !== undefined && value !== prevPath) {
      callback?.(value)
      prevPath = value
    }
  }
  window.addEventListener('message', handleMessage)
  return () => {
    window.removeEventListener('message', handleMessage)
  }
}

/**
 * 同步路由到子窗口
 * @param to
 */
export const syncPathToChild = (to: string) => {
  window.parent.postMessage({
    value: to
  }, '*')
}
