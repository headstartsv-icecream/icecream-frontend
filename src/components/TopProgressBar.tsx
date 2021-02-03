import router from 'next/router'
import NProgress from 'nprogress'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let timer: any
let state: string
let activeRequests = 0
const delay = 250

function load() {
  if (state === 'loading') {
    return
  }

  state = 'loading'

  timer = setTimeout(function () {
    NProgress.start()
  }, delay) // only show progress bar if it takes longer than the delay
}

function stop() {
  if (activeRequests > 0) {
    return
  }

  state = 'stop'

  clearTimeout(timer)
  NProgress.done()
}

router.events.on('routeChangeStart', load)
router.events.on('routeChangeComplete', stop)
router.events.on('routeChangeError', stop)

const originalFetch = window.fetch
window.fetch = async function (...args) {
  if (activeRequests === 0) {
    load()
  }

  activeRequests++

  try {
    const response = await originalFetch(...args)
    return response
  } catch (error) {
    return Promise.reject(error)
  } finally {
    activeRequests -= 1
    if (activeRequests === 0) {
      stop()
    }
  }
}

function TopProgressBar() {
  return null
}

export default TopProgressBar
