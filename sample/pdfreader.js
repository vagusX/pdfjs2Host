class PdfViewer {
  constructor (opts) {
    this.url = opts.url || ''
    this.host = opts.host || ''
    this.download = opts.download || ''
  }

  embed (container) {
    const iframe = document.createElement('iframe')
    iframe.height = '100%'
    iframe.width = '100%'
    iframe.frameBorder = 'none'
    iframe.src = `${this.host}?file=${this.url}`

    container.innerHTML = ''
    container.appendChild(iframe)
  }
}

const $containerEl = document.querySelector('#container')
const hostSrc = '/src/'
const hostBuild = '/pdfjs-v0.0.2/'

new PdfViewer({
  url: '/sample/dental.pdf',
  host: `${hostBuild}viewer.html`
}).embed($containerEl)
