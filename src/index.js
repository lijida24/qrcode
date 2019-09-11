import QRcode from './lib/QRcode'
// import QRcode from './_QRcode'
import QRErrorCorrectLevel from './lib/QRErrorCorrectLevel'

class qrcode {
  constructor (element, options) {
    this.$element = element
    this.options = Object.assign({
      render: 'canvas',
      width: 256,
      height: 256,
      typeNumber: -1,
      correctLevel: QRErrorCorrectLevel.H,
      background: '#ffffff',
      foreground: '#000000'
    }, typeof options === 'string' ? { text: options } : options)
    let code = null
    if (this.options.render === 'canvas') {
      try {
        code = this.createCanvas()
      } catch (error) {
        code = this.createTable()
      }
    } else {
      code = this.createTable()
    }
    this.$element.appendChild(code)
  }

  createCanvas () {
    const _QRcode = new QRcode(this.options.typeNumber, this.options.correctLevel)
    _QRcode.addData(this.options.text)
    _QRcode.make()
    const canvas = document.createElement('canvas')
    canvas.width = this.options.width
    canvas.height = this.options.height
    const ctx = canvas.getContext('2d')
    const tileW = this.options.width / _QRcode.getModuleCount()
    const tileH = this.options.height / _QRcode.getModuleCount()
    for (let row = 0; row < _QRcode.getModuleCount(); row++) {
      for (let col = 0; col < _QRcode.getModuleCount(); col++) {
        ctx.fillStyle = _QRcode.isDark(row, col) ? this.options.foreground : this.options.background
        const w = (Math.ceil((col + 1) * tileW) - Math.floor(col * tileW))
        const h = (Math.ceil((row + 1) * tileH) - Math.floor(row * tileH))
        ctx.fillRect(Math.round(col * tileW), Math.round(row * tileH), w, h)
      }
    }
    return canvas
  }

  createTable () {
    const _QRcode = new QRcode(this.options.typeNumber, this.options.correctLevel)
    _QRcode.addData(this.options.text)
    _QRcode.make()
    const $table = document.createElement('table')
    const $tbody = document.createElement('tbody')
    $table.style.width = this.options.width + 'px'
    $table.style.height = this.options.height + 'px'
    $table.style.border = 0
    $table.style.borderCollapse = 'collapse'
    $table.style.backgroundColor = this.options.background
    $table.appendChild($tbody)
    const tileW = this.options.width / _QRcode.getModuleCount()
    const tileH = this.options.height / _QRcode.getModuleCount()
    for (let row = 0; row < _QRcode.getModuleCount(); row++) {
      const $tr = document.createElement('tr')
      $tr.style.height = tileH + 'px'
      for (let col = 0; col < _QRcode.getModuleCount(); col++) {
        const $td = document.createElement('td')
        $td.width = tileW + 'px'
        $td.style.backgroundColor = _QRcode.isDark(row, col) ? this.options.foreground : this.options.background
        $tr.appendChild($td)
      }
      $tbody.appendChild($tr)
    }
    return $table
  }
}

export default qrcode
